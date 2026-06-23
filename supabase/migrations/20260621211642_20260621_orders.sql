-- ============ Order Status Enum ============
CREATE TYPE public.order_status AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
);

-- ============ Payment Status Enum ============
CREATE TYPE public.payment_status AS ENUM (
  'pending', 'processing', 'completed', 'failed', 'refunded'
);

-- ============ Payment Method Enum ============
CREATE TYPE public.payment_method AS ENUM (
  'razorpay', 'upi', 'cod', 'bank_transfer'
);

-- ============ Custom Mixes ============
CREATE TABLE public.custom_mixes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Custom Mix',
  total_weight_g INT NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.custom_mixes TO authenticated;
GRANT ALL ON public.custom_mixes TO service_role;
ALTER TABLE public.custom_mixes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "custom_mixes_select_own" ON public.custom_mixes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "custom_mixes_insert_own" ON public.custom_mixes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "custom_mixes_delete_own" ON public.custom_mixes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ Custom Mix Items ============
CREATE TABLE public.custom_mix_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  custom_mix_id UUID NOT NULL REFERENCES public.custom_mixes(id) ON DELETE CASCADE,
  ingredient_id TEXT NOT NULL REFERENCES public.mix_ingredients(id) ON DELETE RESTRICT,
  weight_g INT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

GRANT SELECT ON public.custom_mix_items TO authenticated;
GRANT ALL ON public.custom_mix_items TO service_role;
ALTER TABLE public.custom_mix_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "custom_mix_items_read" ON public.custom_mix_items
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.custom_mixes WHERE custom_mixes.id = custom_mix_items.custom_mix_id AND custom_mixes.user_id = auth.uid())
  );

-- ============ Orders ============
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL DEFAULT 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0'),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  status public.order_status NOT NULL DEFAULT 'pending',
  
  -- Shipping address snapshot
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address_line1 TEXT NOT NULL,
  shipping_address_line2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_pincode TEXT NOT NULL,
  
  -- Pricing
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(10,2) NOT NULL,
  
  -- Payment
  payment_method public.payment_method NOT NULL,
  payment_status public.payment_status NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  
  -- Notes
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_select_own" ON public.orders
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "orders_insert_own" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Order Items ============
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  gift_box_id TEXT REFERENCES public.gift_boxes(id) ON DELETE SET NULL,
  custom_mix_id UUID REFERENCES public.custom_mixes(id) ON DELETE SET NULL,
  
  -- Item details snapshot
  item_name TEXT NOT NULL,
  item_type TEXT NOT NULL, -- 'product', 'gift_box', 'custom_mix'
  quantity INT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "order_items_read" ON public.order_items
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- ============ User Subscriptions ============
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL DEFAULT current_date,
  next_billing_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_subscriptions TO authenticated;
GRANT ALL ON public.user_subscriptions TO service_role;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_subscriptions_select_own" ON public.user_subscriptions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "user_subscriptions_insert_own" ON public.user_subscriptions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_subscriptions_update_own" ON public.user_subscriptions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER trg_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Coupons ============
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL, -- 'percentage' or 'fixed'
  discount_value NUMERIC(10,2) NOT NULL,
  min_order_amount NUMERIC(10,2) DEFAULT 0,
  max_uses INT,
  used_count INT NOT NULL DEFAULT 0,
  valid_from TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.coupons TO authenticated;
GRANT ALL ON public.coupons TO service_role;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coupons_public_read" ON public.coupons FOR SELECT USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

-- ============ Contact Submissions ============
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- ============ Corporate Inquiries ============
CREATE TABLE public.corporate_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  quantity_range TEXT NOT NULL,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.corporate_inquiries TO service_role;
ALTER TABLE public.corporate_inquiries ENABLE ROW LEVEL SECURITY;