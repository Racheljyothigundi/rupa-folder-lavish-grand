-- ============ Categories ============
CREATE TABLE public.categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  blurb TEXT NOT NULL,
  image TEXT NOT NULL,
  tint TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT USING (true);

-- ============ Products ============
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category_slug TEXT NOT NULL REFERENCES public.categories(slug) ON DELETE RESTRICT,
  qty TEXT NOT NULL,
  mrp NUMERIC(10,2) NOT NULL,
  discount NUMERIC(5,2) NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  bestseller BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON public.products FOR SELECT USING (is_active = true);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Gift Boxes ============
CREATE TABLE public.gift_boxes (
  id TEXT PRIMARY KEY,
  number INT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  mrp NUMERIC(10,2) NOT NULL,
  badges TEXT[] NOT NULL DEFAULT '{}',
  image TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gift_boxes TO authenticated;
GRANT ALL ON public.gift_boxes TO service_role;
ALTER TABLE public.gift_boxes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gift_boxes_public_read" ON public.gift_boxes FOR SELECT USING (is_active = true);

CREATE TRIGGER trg_gift_boxes_updated_at
  BEFORE UPDATE ON public.gift_boxes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Subscription Plans ============
CREATE TABLE public.subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  blurb TEXT NOT NULL,
  monthly NUMERIC(10,2) NOT NULL,
  includes TEXT[] NOT NULL DEFAULT '{}',
  badge TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.subscription_plans TO authenticated;
GRANT ALL ON public.subscription_plans TO service_role;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subscription_plans_public_read" ON public.subscription_plans FOR SELECT USING (is_active = true);

CREATE TRIGGER trg_subscription_plans_updated_at
  BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Mix Ingredients (for build-your-mix) ============
CREATE TABLE public.mix_ingredients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_per_100g NUMERIC(10,2) NOT NULL,
  image TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.mix_ingredients TO authenticated;
GRANT ALL ON public.mix_ingredients TO service_role;
ALTER TABLE public.mix_ingredients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mix_ingredients_public_read" ON public.mix_ingredients FOR SELECT USING (is_active = true);