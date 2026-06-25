-- Admins can see and update every order. Customers still only see their own orders.
GRANT SELECT, UPDATE ON public.orders TO authenticated;

CREATE POLICY "orders_select_admin" ON public.orders
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "orders_update_admin" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "order_items_read_admin" ON public.order_items
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Keep database-side totals aligned with the checkout delivery rule.
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
      COALESCE(p.mrp, gb.mrp) AS item_mrp,
      COALESCE(p.discount, CAST(gb.mrp - gb.price AS NUMERIC) / NULLIF(gb.mrp, 0) * 100) AS item_discount
    FROM cart_items ci
    LEFT JOIN products p ON ci.product_id = p.id
    LEFT JOIN gift_boxes gb ON ci.gift_box_id = gb.id
    WHERE ci.user_id = _user_id
  ),
  totals AS (
    SELECT
      COALESCE(SUM(quantity)::INT, 0) AS items_count,
      COALESCE(SUM(ROUND(item_mrp * (1 - item_discount / 100), 0) * quantity), 0) AS subtotal
    FROM cart_data
  )
  SELECT
    items_count,
    subtotal,
    CASE
      WHEN subtotal <= 0 THEN 0
      WHEN subtotal < 499 THEN 99
      WHEN subtotal <= 999 THEN 49
      ELSE 0
    END AS shipping,
    subtotal + CASE
      WHEN subtotal <= 0 THEN 0
      WHEN subtotal < 499 THEN 99
      WHEN subtotal <= 999 THEN 49
      ELSE 0
    END AS total
  FROM totals;
$$;

-- Fix the legacy cart-to-order function and apply the same delivery charges.
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
  _items_count INT;
  _subtotal NUMERIC;
  _shipping_cost NUMERIC;
  _total NUMERIC;
BEGIN
  SELECT items_count, subtotal, shipping, total
  INTO _items_count, _subtotal, _shipping_cost, _total
  FROM get_cart_total(_user_id);

  IF _items_count = 0 OR _subtotal = 0 THEN
    RAISE EXCEPTION 'Cart is empty';
  END IF;

  INSERT INTO orders (
    user_id,
    shipping_name, shipping_phone,
    shipping_address_line1, shipping_address_line2,
    shipping_city, shipping_state, shipping_pincode,
    subtotal, shipping_cost, total_amount,
    payment_method, payment_status, status, notes, confirmed_at
  ) VALUES (
    _user_id,
    _shipping_name, _shipping_phone,
    _shipping_address_line1, _shipping_address_line2,
    _shipping_city, _shipping_state, _shipping_pincode,
    _subtotal, _shipping_cost, _total,
    _payment_method,
    CASE WHEN _payment_method = 'cod' THEN 'pending'::public.payment_status ELSE 'processing'::public.payment_status END,
    CASE WHEN _payment_method = 'cod' THEN 'confirmed'::public.order_status ELSE 'pending'::public.order_status END,
    _notes,
    CASE WHEN _payment_method = 'cod' THEN now() ELSE NULL END
  )
  RETURNING id, order_number INTO _order_id, _order_number;

  INSERT INTO order_items (order_id, product_id, gift_box_id, item_name, item_type, quantity, unit_price, total_price)
  SELECT
    _order_id,
    ci.product_id,
    ci.gift_box_id,
    COALESCE(p.name, gb.name),
    CASE WHEN ci.product_id IS NOT NULL THEN 'product' ELSE 'gift_box' END,
    ci.quantity,
    ROUND(COALESCE(p.mrp, gb.mrp) * (1 - COALESCE(p.discount, CAST(gb.mrp - gb.price AS NUMERIC) / NULLIF(gb.mrp, 0) * 100) / 100), 0),
    ROUND(COALESCE(p.mrp, gb.mrp) * (1 - COALESCE(p.discount, CAST(gb.mrp - gb.price AS NUMERIC) / NULLIF(gb.mrp, 0) * 100) / 100), 0) * ci.quantity
  FROM cart_items ci
  LEFT JOIN products p ON ci.product_id = p.id
  LEFT JOIN gift_boxes gb ON ci.gift_box_id = gb.id
  WHERE ci.user_id = _user_id;

  DELETE FROM cart_items WHERE user_id = _user_id;

  UPDATE products p SET stock = stock - oi.quantity
  FROM order_items oi
  WHERE oi.product_id = p.id AND oi.order_id = _order_id;

  RETURN _order_id;
END;
$$;
