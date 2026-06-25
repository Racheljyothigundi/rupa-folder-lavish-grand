INSERT INTO public.subscription_plans (id, name, blurb, monthly, includes, badge)
VALUES
  ('s1', 'Family Pack', 'Daily nutrition for the whole family', 1499, ARRAY['500g Almonds', '500g Cashews', '250g Raisins', '250g Walnuts'], 'Popular'),
  ('s2', 'Fitness Pack', 'High-protein fuel for active lifestyles', 1799, ARRAY['500g Almonds', '500g Pistachios', '250g Pumpkin Seeds', '250g Sunflower Seeds'], NULL),
  ('s3', 'Kids Nutrition Pack', 'Brain-boosting snacks for little ones', 1199, ARRAY['500g Cashews', '250g Walnuts', '250g Raisins', '250g Dates'], NULL),
  ('s4', 'Executive Health', 'Premium curation for busy professionals', 2499, ARRAY['500g Premium Cashews', '500g Pistachios', '500g Walnuts', '250g Anjeer'], 'Premium')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  blurb = EXCLUDED.blurb,
  monthly = EXCLUDED.monthly,
  includes = EXCLUDED.includes,
  badge = EXCLUDED.badge,
  is_active = true;
