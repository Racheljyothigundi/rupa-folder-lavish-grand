-- ============ Indexes for performance ============
CREATE INDEX idx_products_category ON public.products(category_slug);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_bestseller ON public.products(bestseller) WHERE bestseller = true AND is_active = true;

CREATE INDEX idx_cart_items_user ON public.cart_items(user_id);
CREATE INDEX idx_wishlist_items_user ON public.wishlist_items(user_id);
CREATE INDEX idx_addresses_user ON public.addresses(user_id);

CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);

CREATE INDEX idx_user_subscriptions_user ON public.user_subscriptions(user_id);

-- ============ Helper function to calculate product offer price ============
CREATE OR REPLACE FUNCTION public.offer_price(mrp NUMERIC, discount_pct NUMERIC)
RETURNS NUMERIC
LANGUAGE SQL IMMUTABLE
AS $$
  SELECT ROUND(mrp * (1 - discount_pct / 100), 0);
$$;

-- ============ Function to get cart total for user ============
CREATE OR REPLACE FUNCTION public.get_cart_total(_user_id UUID)
RETURNS TABLE (
  items_count INT,
  subtotal NUMERIC,
  shipping NUMERIC,
  total NUMERIC
)
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH cart_data AS (
    SELECT 
      ci.quantity,
      COALESCE(p.mrp, gb.mrp) as item_mrp,
      COALESCE(p.discount, CAST(gb.mrp - gb.price AS NUMERIC) / NULLIF(gb.mrp, 0) * 100) as item_discount
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    LEFT JOIN gift_boxes gb ON ci.gift_box_id = gb.id
    WHERE ci.user_id = _user_id
  )
  SELECT 
    COALESCE(SUM(quantity)::INT, 0),
    COALESCE(SUM(ROUND(item_mrp * (1 - item_discount / 100), 0) * quantity), 0),
    CASE WHEN COALESCE(SUM(ROUND(item_mrp * (1 - item_discount / 100), 0) * quantity), 0) >= 999 THEN 0 ELSE 50 END,
    COALESCE(SUM(ROUND(item_mrp * (1 - item_discount / 100), 0) * quantity), 0) + 
      CASE WHEN COALESCE(SUM(ROUND(item_mrp * (1 - item_discount / 100), 0) * quantity), 0) >= 999 THEN 0 ELSE 50 END
  FROM cart_data;
$$;

-- ============ Function to process order from cart ============
CREATE OR REPLACE FUNCTION public.create_order_from_cart(
  _user_id UUID,
  _shipping_name TEXT,
  _shipping_phone TEXT,
  _shipping_address_line1 TEXT,
  _shipping_address_line2 TEXT,
  _shipping_city TEXT,
  _shipping_state TEXT,
  _shipping_pincode TEXT,
  _payment_method public.payment_method,
  _notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _order_id UUID;
  _order_number TEXT;
  _subtotal NUMERIC;
  _shipping_cost NUMERIC;
  _total NUMERIC;
BEGIN
  -- Get cart totals
  SELECT items_count, subtotal, shipping, total INTO _subtotal, _shipping_cost, _total
  FROM get_cart_total(_user_id);
  
  IF _subtotal = 0 THEN
    RAISE EXCEPTION 'Cart is empty';
  END IF;

  -- Create order
  INSERT INTO orders (
    user_id, 
    shipping_name, shipping_phone, 
    shipping_address_line1, shipping_address_line2, 
    shipping_city, shipping_state, shipping_pincode,
    subtotal, shipping_cost, total_amount,
    payment_method
  ) VALUES (
    _user_id,
    _shipping_name, _shipping_phone,
    _shipping_address_line1, _shipping_address_line2,
    _shipping_city, _shipping_state, _shipping_pincode,
    _subtotal, _shipping_cost, _total,
    _payment_method
  )
  RETURNING id, order_number INTO _order_id, _order_number;
  
  -- Insert order items from cart
  INSERT INTO order_items (order_id, product_id, gift_box_id, item_name, item_type, quantity, unit_price, total_price)
  SELECT 
    _order_id,
    ci.product_id,
    ci.gift_box_id,
    NULL,
    CASE WHEN ci.product_id IS NOT NULL THEN 'product' ELSE 'gift_box' END,
    ci.quantity,
    ROUND(COALESCE(p.mrp, gb.mrp) * (1 - COALESCE(p.discount, CAST(gb.mrp - gb.price AS NUMERIC) / NULLIF(gb.mrp, 0) * 100) / 100), 0),
    ROUND(COALESCE(p.mrp, gb.mrp) * (1 - COALESCE(p.discount, CAST(gb.mrp - gb.price AS NUMERIC) / NULLIF(gb.mrp, 0) * 100) / 100), 0) * ci.quantity
  FROM cart_items ci
  LEFT JOIN products p ON ci.product_id = p.id
  LEFT JOIN gift_boxes gb ON ci.gift_box_id = gb.id
  WHERE ci.user_id = _user_id;

  -- Update item names
  UPDATE order_items oi SET item_name = p.name FROM products p WHERE oi.product_id = p.id AND oi.order_id = _order_id;
  UPDATE order_items oi SET item_name = gb.name FROM gift_boxes gb WHERE oi.gift_box_id = gb.id AND oi.order_id = _order_id;

  -- Clear cart
  DELETE FROM cart_items WHERE user_id = _user_id;
  
  -- Update stock (optional - can be done via trigger or after payment confirmation)
  -- For now, we'll update immediately for simplicity
  UPDATE products p SET stock = stock - oi.quantity
  FROM order_items oi
  WHERE oi.product_id = p.id AND oi.order_id = _order_id;
  
  RETURN _order_id;
END;
$$;

-- ============ Trigger to validate stock before insert ============
CREATE OR REPLACE FUNCTION public.check_stock_availability()
RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public
AS $$
DECLARE
  available_stock INT;
BEGIN
  IF NEW.product_id IS NOT NULL THEN
    SELECT stock INTO available_stock FROM products WHERE id = NEW.product_id;
    IF available_stock < NEW.quantity THEN
      RAISE EXCEPTION 'Insufficient stock for product %', NEW.product_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_check_cart_stock
  BEFORE INSERT OR UPDATE ON public.cart_items
  FOR EACH ROW EXECUTE FUNCTION public.check_stock_availability();