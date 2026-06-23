-- ============ Seed Categories ============
INSERT INTO public.categories (slug, name, blurb, image, tint, sort_order) VALUES
('dry-fruits', 'Dry Fruits', 'Hand-sorted premium nuts & fruits', '/cat-almonds.jpg', 'oklch(0.95 0.04 60)', 1),
('seeds', 'Seeds', 'Pumpkin, sunflower & more', '/cat-seeds.jpg', 'oklch(0.95 0.05 130)', 2),
('spices', 'Whole Spices', 'Cardamom, clove, pepper, cinnamon', '/cat-spices.jpg', 'oklch(0.95 0.06 50)', 3),
('powders', 'Masala Powders', 'Chilli, turmeric, ginger garlic', '/cat-spices.jpg', 'oklch(0.94 0.06 40)', 4),
('millets', 'Millets', 'Wholesome ancient grains', '/cat-millets.jpg', 'oklch(0.95 0.03 90)', 5),
('dals', 'Dals & Grains', 'All pulses, lentils & legumes', '/cat-dals.jpg', 'oklch(0.95 0.05 70)', 6),
('flours', 'Flours', 'Stone-ground, traceable flours', '/cat-millets.jpg', 'oklch(0.95 0.02 80)', 7),
('gift-boxes', 'Gift Boxes', 'Premium gifting for every occasion', '/cat-mix.jpg', 'oklch(0.94 0.04 260)', 8);

-- ============ Seed Products ============
INSERT INTO public.products (id, slug, name, category_slug, qty, mrp, discount, image, stock, bestseller, description, highlights) VALUES
-- Dry Fruits
('p1', 'almond-jumbo-500g', 'Almond Jumbo', 'dry-fruits', '500 gm', 756, 15, '/cat-almonds.jpg', 124, true, 
 'California jumbo almonds, hand-sorted for size and crunch. Rich in vitamin E, magnesium and plant protein — perfect for daily snacking, baking, or gifting.',
 ARRAY['Hygienically packed', '100% natural', 'No preservatives', 'Rich in vitamin E']),
('p2', 'cashew-premium-180-500g', 'Cashew Premium W180', 'dry-fruits', '500 gm', 787, 15, '/cat-cashews.jpg', 86, true,
 'Grade W180 whole cashew kernels — large, creamy and milky-white. Ethically sourced and steam-pasteurised.',
 ARRAY['W180 grade', 'Whole kernels', 'Naturally creamy', 'Vacuum sealed']),
('p3', 'pistachio-roasted-500g', 'Pistachio Roasted Salted', 'dry-fruits', '500 gm', 1007, 20, '/cat-pistachios.jpg', 72, true,
 'Premium pistachios, lightly roasted with a touch of pink salt. Bright green kernels with a satisfying crunch.',
 ARRAY['Lightly salted', 'In-shell', 'Antioxidant rich', 'Slow-roasted']),
('p4', 'walnut-kernels-500g', 'Walnut Kernels', 'dry-fruits', '500 gm', 1170, 20, '/cat-walnuts.jpg', 54, false,
 'Light-amber Kashmiri walnut halves — buttery, mild and packed with Omega-3.',
 ARRAY['Light-amber halves', 'Omega-3 rich', 'No bitterness', 'Cold stored']),
('p5', 'anjeer-premium-500g', 'Anjeer (Dried Figs)', 'dry-fruits', '500 gm', 890, 18, '/cat-anjeer.jpg', 48, false,
 'Sun-dried Afghan anjeer — naturally sweet, soft centred figs.',
 ARRAY['Sun-dried', 'Naturally sweet', 'Fibre rich', 'No added sugar']),
('p6', 'kissmiss-golden-500g', 'Kissmiss (Golden Raisins)', 'dry-fruits', '500 gm', 420, 15, '/cat-raisins.jpg', 160, false,
 'Plump golden raisins, washed and slow-dried. Perfect for kheer, granola and snacking.',
 ARRAY['Slow-dried', 'No added oil', 'Plump & juicy', 'Resealable pack']),
('p7', 'dates-medjool-500g', 'Medjool Dates', 'dry-fruits', '500 gm', 780, 18, '/cat-dates.jpg', 90, true,
 'Soft, caramel-sweet Medjool dates — the king of dates.',
 ARRAY['Soft & moist', 'Naturally caramel', 'Iron rich', 'Hand-packed']),

-- Seeds
('p8', 'pumpkin-seeds-250g', 'Pumpkin Seeds', 'seeds', '250 gm', 320, 15, '/cat-seeds.jpg', 110, false,
 'Roasted unsalted pumpkin seeds — bright green and crunchy.',
 ARRAY['Zinc rich', 'Lightly roasted', 'Unsalted', 'No oil']),
('p9', 'sunflower-seeds-250g', 'Sunflower Seeds', 'seeds', '250 gm', 240, 15, '/cat-seeds.jpg', 130, false,
 'Hulled sunflower kernels for smoothies, salads and trail mixes.',
 ARRAY['Hulled kernels', 'Vitamin E', 'Crunchy', 'Resealable']),

-- Spices
('p10', 'cardamom-green-50g', 'Green Cardamom', 'spices', '50 gm', 305, 10, '/cat-spices.jpg', 64, false,
 'Plump green cardamom pods, aromatic and oil-rich.',
 ARRAY['Hand-picked', 'Bold aroma', 'Whole pods', 'Single origin']),
('p11', 'pepper-tellicherry-100g', 'Tellicherry Pepper', 'spices', '100 gm', 220, 25, '/cat-spices.jpg', 88, false,
 'Tellicherry whole black pepper — bold, citrusy, complex.',
 ARRAY['Tellicherry grade', 'Whole peppercorns', 'Sun-dried', 'Aromatic']),
('p12', 'clove-whole-100g', 'Whole Clove', 'spices', '100 gm', 265, 25, '/cat-spices.jpg', 76, false,
 'Premium whole cloves — oil-rich and intensely fragrant.',
 ARRAY['Oil rich', 'Whole buds', 'Strong aroma', 'Hand-sorted']),
('p13', 'cinnamon-50g', 'Ceylon Cinnamon', 'spices', '50 gm', 358, 25, '/cat-spices.jpg', 52, false,
 'True Ceylon cinnamon quills — delicate, sweet and floral.',
 ARRAY['Ceylon (true)', 'Soft quills', 'Sweet aroma', 'Single origin']),

-- Powders
('p14', 'chilli-powder-500g', 'Chilli Powder', 'powders', '500 gm', 360, 20, '/cat-spices.jpg', 95, false,
 'Sun-dried Guntur red chilli, stone-ground to a fine vibrant powder.',
 ARRAY['Guntur red', 'Stone ground', 'No colour added', 'Vibrant heat']),
('p15', 'turmeric-powder-500g', 'Turmeric Powder', 'powders', '500 gm', 192, 20, '/cat-spices.jpg', 140, true,
 'High curcumin turmeric — bright golden colour, earthy aroma.',
 ARRAY['High curcumin', 'No starch', 'Stone ground', 'Bright colour']),
('p16', 'ginger-garlic-paste-500g', 'Ginger Garlic Paste', 'powders', '500 gm', 220, 30, '/cat-spices.jpg', 60, false,
 'Freshly ground ginger garlic paste with cold-pressed oil for shelf life.',
 ARRAY['Fresh ground', 'Cold-pressed oil', 'No preservatives', 'Ready to cook']),

-- Millets & Dals
('p17', 'foxtail-millet-1kg', 'Foxtail Millet', 'millets', '1 kg', 240, 15, '/cat-millets.jpg', 70, false,
 'Whole foxtail millet — low GI, high fibre, perfect for daily meals.',
 ARRAY['Whole grain', 'Low GI', 'Gluten free', 'High fibre']),
('p18', 'toor-dal-1kg', 'Toor Dal (Arhar)', 'dals', '1 kg', 180, 12, '/cat-dals.jpg', 200, false,
 'Premium unpolished toor dal — fast-cooking and richly flavoured.',
 ARRAY['Unpolished', 'Premium grade', 'Quick cooking', 'High protein']),
('p19', 'moong-dal-1kg', 'Moong Dal Yellow', 'dals', '1 kg', 170, 12, '/cat-dals.jpg', 180, false,
 'Split yellow moong dal — light, easy to digest, fast cooking.',
 ARRAY['Split yellow', 'Easy digest', 'High protein', 'Quick cook']),
('p20', 'wheat-flour-5kg', 'Chakki Atta', 'flours', '5 kg', 360, 10, '/cat-millets.jpg', 110, false,
 'Stone-ground whole wheat flour — soft rotis every time.',
 ARRAY['Stone ground', 'Whole wheat', 'No additives', 'Soft rotis']);

-- ============ Seed Gift Boxes ============
INSERT INTO public.gift_boxes (id, number, name, tagline, price, mrp, badges) VALUES
('g1', 1, 'Signature Collection', 'A perfect blend of health & happiness', 1499, 1899, ARRAY['Premium Quality', '100% Natural', 'Hygienically Packed']),
('g2', 2, 'Celebrate with Goodness', 'Elegance in every bite', 1299, 1599, ARRAY['Finest Nuts', 'No Artificial Preservatives', 'Rich in Nutrients']),
('g3', 3, 'Royal Delight', 'Regal taste, just for you', 2199, 2699, ARRAY['100% Natural', 'Hygienically Packed', 'Premium Quality']),
('g4', 4, 'Blush Collection', 'Thoughtful gifting, beautifully wrapped', 1799, 2199, ARRAY['Finest Quality', 'No Artificial Colors', 'Healthy & Delicious']),
('g5', 5, 'Elite Collection', 'Premium gifts for premium people', 2599, 3199, ARRAY['100% Natural', 'Hygienically Packed', 'Rich in Protein']),
('g6', 6, 'Nature''s Basket', 'From nature to your doorstep', 999, 1299, ARRAY['Natural & Fresh', 'No Preservatives', 'Sustainably Sourced']),
('g7', 7, 'Hexa Harmony', 'Six delights, one perfect gift', 1899, 2299, ARRAY['Premium Quality', 'Hygienically Packed', 'Wholesome & Nutritious']),
('g8', 8, 'Happiness Box', 'Small box, big smiles', 699, 899, ARRAY['Finest Nuts', '100% Natural', 'Perfect for Every Occasion']),
('g9', 9, 'Treasure Trove', 'Discover the richness of every bite', 2399, 2999, ARRAY['No Artificial Additives', 'Hygienically Packed', 'Rich in Nutrients']),
('g10', 10, 'Eco Collection', 'Good for you, good for nature', 1199, 1499, ARRAY['Eco Friendly Packaging', '100% Natural', 'Sustainably Sourced']);

-- ============ Seed Subscription Plans ============
INSERT INTO public.subscription_plans (id, name, blurb, monthly, includes, badge) VALUES
('s1', 'Family Pack', 'Daily nutrition for the whole family', 1499, ARRAY['500g Almonds', '500g Cashews', '250g Raisins', '250g Walnuts'], 'Popular'),
('s2', 'Fitness Pack', 'High-protein fuel for active lifestyles', 1799, ARRAY['500g Almonds', '500g Pistachios', '250g Pumpkin Seeds', '250g Sunflower Seeds'], NULL),
('s3', 'Kids Nutrition Pack', 'Brain-boosting snacks for little ones', 1199, ARRAY['500g Cashews', '250g Walnuts', '250g Raisins', '250g Dates'], NULL),
('s4', 'Executive Health', 'Premium curation for busy professionals', 2499, ARRAY['500g Premium Cashews', '500g Pistachios', '500g Walnuts', '250g Anjeer'], 'Premium');

-- ============ Seed Mix Ingredients ============
INSERT INTO public.mix_ingredients (id, name, price_per_100g, image) VALUES
('m1', 'Almonds', 130, '/cat-almonds.jpg'),
('m2', 'Cashews', 140, '/cat-cashews.jpg'),
('m3', 'Pistachios', 200, '/cat-pistachios.jpg'),
('m4', 'Walnuts', 220, '/cat-walnuts.jpg'),
('m5', 'Raisins', 70, '/cat-raisins.jpg'),
('m6', 'Anjeer', 180, '/cat-anjeer.jpg'),
('m7', 'Dates', 150, '/cat-dates.jpg'),
('m8', 'Pumpkin Seeds', 110, '/cat-seeds.jpg');