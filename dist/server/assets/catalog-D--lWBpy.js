import { t as supabase } from "./client-K-6dw9l-.js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/lib/store.tsx
var AuthContext = createContext(null);
var CartContext = createContext(null);
var WishContext = createContext(null);
var AuthModalContext = createContext(null);
var POST_AUTH_REDIRECT = "/account?tab=dashboard";
function getAuthCallbackUrl(next = POST_AUTH_REDIRECT) {
	if (typeof window === "undefined") return void 0;
	const url = new URL("/auth/callback", window.location.origin);
	url.searchParams.set("next", next);
	return url.toString();
}
function useLocal(key, initial) {
	const [v, setV] = useState(initial);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		try {
			const raw = localStorage.getItem(key);
			if (raw) setV(JSON.parse(raw));
			setHydrated(true);
		} catch {
			setHydrated(true);
		}
	}, [key]);
	useEffect(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(key, JSON.stringify(v));
		} catch {}
	}, [
		key,
		v,
		hydrated
	]);
	return [v, setV];
}
function StoreProviders({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lines, setLines] = useLocal("lg.cart", []);
	const [wish, setWish] = useLocal("lg.wish", []);
	const [authOpen, setAuthOpen] = useState(false);
	useEffect(() => {
		let cancelled = false;
		async function loadUser(sessionUser) {
			if (!sessionUser) {
				if (!cancelled) {
					setUser(null);
					setLoading(false);
				}
				return;
			}
			const [{ data: profile, error: profileError }, { data: roles, error: rolesError }] = await Promise.all([supabase.from("profiles").select("full_name, email, phone").eq("id", sessionUser.id).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", sessionUser.id)]);
			if (cancelled) return;
			if (profileError) console.error("[Auth] Failed to load profile", profileError);
			if (rolesError) console.error("[Auth] Failed to load roles", rolesError);
			const meta = sessionUser.user_metadata;
			const roleList = (roles ?? []).map((r) => r.role);
			const role = roleList.includes("admin") ? "admin" : roleList.includes("corporate") ? "corporate" : "customer";
			const email = profile?.email ?? sessionUser.email ?? "";
			const name = profile?.full_name || meta?.full_name || meta?.name || email.split("@")[0] || "Account";
			const phone = profile?.phone ?? meta?.phone ?? meta?.phone_number ?? void 0;
			setUser({
				id: sessionUser.id,
				name,
				email,
				phone,
				role
			});
			setLoading(false);
		}
		supabase.auth.getSession().then(({ data }) => loadUser(data.session?.user ?? null));
		const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") loadUser(session?.user ?? null);
		});
		return () => {
			cancelled = true;
			sub.subscription.unsubscribe();
		};
	}, []);
	const auth = useMemo(() => ({
		user,
		loading,
		login: async (email, password) => {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) return { error: error.message };
			toast.success("Welcome back!");
			return {};
		},
		signup: async ({ name, email, phone, password }) => {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: getAuthCallbackUrl(),
					data: {
						full_name: name,
						phone
					}
				}
			});
			if (error) return { error: error.message };
			toast.success("Account created — check your email to confirm.");
			return {};
		},
		signInWithGoogle: async () => {
			const redirectTo = getAuthCallbackUrl();
			if (!redirectTo || typeof window === "undefined") return { error: "Google sign-in is only available in the browser." };
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo,
					queryParams: { prompt: "select_account" },
					skipBrowserRedirect: true
				}
			});
			if (error) return { error: error.message };
			if (!data?.url) return { error: "Unable to start Google sign-in. Please try again." };
			window.location.assign(data.url);
			return {};
		},
		resetPassword: async (email) => {
			const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: typeof window !== "undefined" ? `${window.location.origin}/reset-password` : void 0 });
			if (error) return { error: error.message };
			toast.success("Password reset link sent");
			return {};
		},
		logout: async () => {
			const { error } = await supabase.auth.signOut();
			if (error) {
				toast.error(error.message);
				return;
			}
			toast.success("Signed out");
			if (typeof window !== "undefined" && window.location.pathname.startsWith("/account")) window.location.assign("/");
		},
		requireAuth: () => {
			if (user) return true;
			setAuthOpen(true);
			toast("Please sign in to continue");
			return false;
		}
	}), [user, loading]);
	const cart = useMemo(() => {
		return {
			lines,
			subtotal: lines.reduce((s, l) => s + l.price * l.count, 0),
			itemCount: lines.reduce((s, l) => s + l.count, 0),
			add: (line, count = 1) => {
				setLines((curr) => {
					const idx = curr.findIndex((l) => l.id === line.id);
					if (idx >= 0) {
						const next = [...curr];
						next[idx] = {
							...next[idx],
							count: next[idx].count + count
						};
						return next;
					}
					return [...curr, {
						...line,
						count
					}];
				});
				toast.success(`${line.name} added to cart`);
			},
			remove: (id) => setLines((c) => c.filter((l) => l.id !== id)),
			setCount: (id, count) => setLines((c) => c.map((l) => l.id === id ? {
				...l,
				count: Math.max(1, count)
			} : l)),
			clear: () => setLines([])
		};
	}, [lines, setLines]);
	const wishlist = useMemo(() => ({
		ids: wish,
		has: (id) => wish.includes(id),
		toggle: (id) => {
			setWish((curr) => curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]);
		}
	}), [wish, setWish]);
	const modal = useMemo(() => ({
		open: authOpen,
		setOpen: setAuthOpen,
		trigger: () => setAuthOpen(true)
	}), [authOpen]);
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: auth,
		children: /* @__PURE__ */ jsx(CartContext.Provider, {
			value: cart,
			children: /* @__PURE__ */ jsx(WishContext.Provider, {
				value: wishlist,
				children: /* @__PURE__ */ jsx(AuthModalContext.Provider, {
					value: modal,
					children
				})
			})
		})
	});
}
var useAuth = () => {
	const v = useContext(AuthContext);
	if (!v) throw new Error("AuthContext missing");
	return v;
};
var useCart = () => {
	const v = useContext(CartContext);
	if (!v) throw new Error("CartContext missing");
	return v;
};
var useWishlist = () => {
	const v = useContext(WishContext);
	if (!v) throw new Error("WishContext missing");
	return v;
};
var useAuthModal = () => {
	const v = useContext(AuthModalContext);
	if (!v) throw new Error("AuthModalContext missing");
	return v;
};
function inr(n) {
	return "₹" + n.toLocaleString("en-IN");
}
//#endregion
//#region src/assets/cat-almonds.jpg
var cat_almonds_default = "/assets/cat-almonds-B09nh-sp.jpg";
//#endregion
//#region src/assets/cat-cashews.jpg
var cat_cashews_default = "/assets/cat-cashews-BI3pwysm.jpg";
//#endregion
//#region src/assets/cat-pistachios.jpg
var cat_pistachios_default = "/assets/cat-pistachios-C1kxzseC.jpg";
//#endregion
//#region src/assets/cat-walnuts.jpg
var cat_walnuts_default = "/assets/cat-walnuts-H8AXJWWu.jpg";
//#endregion
//#region src/assets/cat-raisins.jpg
var cat_raisins_default = "/assets/cat-raisins-JRHF0pkD.jpg";
//#endregion
//#region src/assets/cat-anjeer.jpg
var cat_anjeer_default = "/assets/cat-anjeer-HUz-t4WH.jpg";
//#endregion
//#region src/assets/cat-dates.jpg
var cat_dates_default = "/assets/cat-dates-CiXloM7z.jpg";
//#endregion
//#region src/assets/cat-spices.jpg
var cat_spices_default = "/assets/cat-spices-oLZ4cmPh.jpg";
//#endregion
//#region src/assets/cat-seeds.jpg
var cat_seeds_default = "/assets/cat-seeds-BzHzZr2g.jpg";
//#endregion
//#region src/assets/cat-dals.jpg
var cat_dals_default = "/assets/cat-dals-CYYWc8wP.jpg";
//#endregion
//#region src/assets/cat-millets.jpg
var cat_millets_default = "/assets/cat-millets-E3pffazg.jpg";
//#endregion
//#region src/data/catalog.ts
var categories = [
	{
		slug: "dry-fruits",
		name: "Dry Fruits",
		blurb: "Hand-sorted premium nuts & fruits",
		image: cat_almonds_default,
		tint: "oklch(0.95 0.04 60)"
	},
	{
		slug: "seeds",
		name: "Seeds",
		blurb: "Pumpkin, sunflower & more",
		image: cat_seeds_default,
		tint: "oklch(0.95 0.05 130)"
	},
	{
		slug: "spices",
		name: "Whole Spices",
		blurb: "Cardamom, clove, pepper, cinnamon",
		image: cat_spices_default,
		tint: "oklch(0.95 0.06 50)"
	},
	{
		slug: "powders",
		name: "Masala Powders",
		blurb: "Chilli, turmeric, ginger garlic",
		image: cat_spices_default,
		tint: "oklch(0.94 0.06 40)"
	},
	{
		slug: "millets",
		name: "Millets",
		blurb: "Wholesome ancient grains",
		image: cat_millets_default,
		tint: "oklch(0.95 0.03 90)"
	},
	{
		slug: "dals",
		name: "Dals & Grains",
		blurb: "All pulses, lentils & legumes",
		image: cat_dals_default,
		tint: "oklch(0.95 0.05 70)"
	},
	{
		slug: "flours",
		name: "Flours",
		blurb: "Stone-ground, traceable flours",
		image: cat_millets_default,
		tint: "oklch(0.95 0.02 80)"
	},
	{
		slug: "gift-boxes",
		name: "Gift Boxes",
		blurb: "Premium gifting for every occasion",
		image: "/assets/cat-mix-BeIzHkHw.jpg",
		tint: "oklch(0.94 0.04 260)"
	}
];
function price(mrp, discount) {
	return Math.round(mrp * (1 - discount / 100));
}
var offerPrice = price;
var products = [
	{
		id: "p1",
		slug: "almond-jumbo-500g",
		name: "Almond Jumbo",
		category: "dry-fruits",
		qty: "500 gm",
		mrp: 756,
		discount: 15,
		image: cat_almonds_default,
		stock: 124,
		bestseller: true,
		description: "California jumbo almonds, hand-sorted for size and crunch. Rich in vitamin E, magnesium and plant protein — perfect for daily snacking, baking, or gifting.",
		highlights: [
			"Hygienically packed",
			"100% natural",
			"No preservatives",
			"Rich in vitamin E"
		]
	},
	{
		id: "p2",
		slug: "cashew-premium-180-500g",
		name: "Cashew Premium W180",
		category: "dry-fruits",
		qty: "500 gm",
		mrp: 787,
		discount: 15,
		image: cat_cashews_default,
		stock: 86,
		bestseller: true,
		description: "Grade W180 whole cashew kernels — large, creamy and milky-white. Ethically sourced and steam-pasteurised.",
		highlights: [
			"W180 grade",
			"Whole kernels",
			"Naturally creamy",
			"Vacuum sealed"
		]
	},
	{
		id: "p3",
		slug: "pistachio-roasted-500g",
		name: "Pistachio Roasted Salted",
		category: "dry-fruits",
		qty: "500 gm",
		mrp: 1007,
		discount: 20,
		image: cat_pistachios_default,
		stock: 72,
		bestseller: true,
		description: "Premium pistachios, lightly roasted with a touch of pink salt. Bright green kernels with a satisfying crunch.",
		highlights: [
			"Lightly salted",
			"In-shell",
			"Antioxidant rich",
			"Slow-roasted"
		]
	},
	{
		id: "p4",
		slug: "walnut-kernels-500g",
		name: "Walnut Kernels",
		category: "dry-fruits",
		qty: "500 gm",
		mrp: 1170,
		discount: 20,
		image: cat_walnuts_default,
		stock: 54,
		description: "Light-amber Kashmiri walnut halves — buttery, mild and packed with Omega-3.",
		highlights: [
			"Light-amber halves",
			"Omega-3 rich",
			"No bitterness",
			"Cold stored"
		]
	},
	{
		id: "p5",
		slug: "anjeer-premium-500g",
		name: "Anjeer (Dried Figs)",
		category: "dry-fruits",
		qty: "500 gm",
		mrp: 890,
		discount: 18,
		image: cat_anjeer_default,
		stock: 48,
		description: "Sun-dried Afghan anjeer — naturally sweet, soft centred figs.",
		highlights: [
			"Sun-dried",
			"Naturally sweet",
			"Fibre rich",
			"No added sugar"
		]
	},
	{
		id: "p6",
		slug: "kissmiss-golden-500g",
		name: "Kissmiss (Golden Raisins)",
		category: "dry-fruits",
		qty: "500 gm",
		mrp: 420,
		discount: 15,
		image: cat_raisins_default,
		stock: 160,
		description: "Plump golden raisins, washed and slow-dried. Perfect for kheer, granola and snacking.",
		highlights: [
			"Slow-dried",
			"No added oil",
			"Plump & juicy",
			"Resealable pack"
		]
	},
	{
		id: "p7",
		slug: "dates-medjool-500g",
		name: "Medjool Dates",
		category: "dry-fruits",
		qty: "500 gm",
		mrp: 780,
		discount: 18,
		image: cat_dates_default,
		stock: 90,
		bestseller: true,
		description: "Soft, caramel-sweet Medjool dates — the king of dates.",
		highlights: [
			"Soft & moist",
			"Naturally caramel",
			"Iron rich",
			"Hand-packed"
		]
	},
	{
		id: "p8",
		slug: "pumpkin-seeds-250g",
		name: "Pumpkin Seeds",
		category: "seeds",
		qty: "250 gm",
		mrp: 320,
		discount: 15,
		image: cat_seeds_default,
		stock: 110,
		description: "Roasted unsalted pumpkin seeds — bright green and crunchy.",
		highlights: [
			"Zinc rich",
			"Lightly roasted",
			"Unsalted",
			"No oil"
		]
	},
	{
		id: "p9",
		slug: "sunflower-seeds-250g",
		name: "Sunflower Seeds",
		category: "seeds",
		qty: "250 gm",
		mrp: 240,
		discount: 15,
		image: cat_seeds_default,
		stock: 130,
		description: "Hulled sunflower kernels for smoothies, salads and trail mixes.",
		highlights: [
			"Hulled kernels",
			"Vitamin E",
			"Crunchy",
			"Resealable"
		]
	},
	{
		id: "p10",
		slug: "cardamom-green-50g",
		name: "Green Cardamom",
		category: "spices",
		qty: "50 gm",
		mrp: 305,
		discount: 10,
		image: cat_spices_default,
		stock: 64,
		description: "Plump green cardamom pods, aromatic and oil-rich.",
		highlights: [
			"Hand-picked",
			"Bold aroma",
			"Whole pods",
			"Single origin"
		]
	},
	{
		id: "p11",
		slug: "pepper-tellicherry-100g",
		name: "Tellicherry Pepper",
		category: "spices",
		qty: "100 gm",
		mrp: 220,
		discount: 25,
		image: cat_spices_default,
		stock: 88,
		description: "Tellicherry whole black pepper — bold, citrusy, complex.",
		highlights: [
			"Tellicherry grade",
			"Whole peppercorns",
			"Sun-dried",
			"Aromatic"
		]
	},
	{
		id: "p12",
		slug: "clove-whole-100g",
		name: "Whole Clove",
		category: "spices",
		qty: "100 gm",
		mrp: 265,
		discount: 25,
		image: cat_spices_default,
		stock: 76,
		description: "Premium whole cloves — oil-rich and intensely fragrant.",
		highlights: [
			"Oil rich",
			"Whole buds",
			"Strong aroma",
			"Hand-sorted"
		]
	},
	{
		id: "p13",
		slug: "cinnamon-50g",
		name: "Ceylon Cinnamon",
		category: "spices",
		qty: "50 gm",
		mrp: 358,
		discount: 25,
		image: cat_spices_default,
		stock: 52,
		description: "True Ceylon cinnamon quills — delicate, sweet and floral.",
		highlights: [
			"Ceylon (true)",
			"Soft quills",
			"Sweet aroma",
			"Single origin"
		]
	},
	{
		id: "p14",
		slug: "chilli-powder-500g",
		name: "Chilli Powder",
		category: "powders",
		qty: "500 gm",
		mrp: 360,
		discount: 20,
		image: cat_spices_default,
		stock: 95,
		description: "Sun-dried Guntur red chilli, stone-ground to a fine vibrant powder.",
		highlights: [
			"Guntur red",
			"Stone ground",
			"No colour added",
			"Vibrant heat"
		]
	},
	{
		id: "p15",
		slug: "turmeric-powder-500g",
		name: "Turmeric Powder",
		category: "powders",
		qty: "500 gm",
		mrp: 192,
		discount: 20,
		image: cat_spices_default,
		stock: 140,
		bestseller: true,
		description: "High curcumin turmeric — bright golden colour, earthy aroma.",
		highlights: [
			"High curcumin",
			"No starch",
			"Stone ground",
			"Bright colour"
		]
	},
	{
		id: "p16",
		slug: "ginger-garlic-paste-500g",
		name: "Ginger Garlic Paste",
		category: "powders",
		qty: "500 gm",
		mrp: 220,
		discount: 30,
		image: cat_spices_default,
		stock: 60,
		description: "Freshly ground ginger garlic paste with cold-pressed oil for shelf life.",
		highlights: [
			"Fresh ground",
			"Cold-pressed oil",
			"No preservatives",
			"Ready to cook"
		]
	},
	{
		id: "p17",
		slug: "foxtail-millet-1kg",
		name: "Foxtail Millet",
		category: "millets",
		qty: "1 kg",
		mrp: 240,
		discount: 15,
		image: cat_millets_default,
		stock: 70,
		description: "Whole foxtail millet — low GI, high fibre, perfect for daily meals.",
		highlights: [
			"Whole grain",
			"Low GI",
			"Gluten free",
			"High fibre"
		]
	},
	{
		id: "p18",
		slug: "toor-dal-1kg",
		name: "Toor Dal (Arhar)",
		category: "dals",
		qty: "1 kg",
		mrp: 180,
		discount: 12,
		image: cat_dals_default,
		stock: 200,
		description: "Premium unpolished toor dal — fast-cooking and richly flavoured.",
		highlights: [
			"Unpolished",
			"Premium grade",
			"Quick cooking",
			"High protein"
		]
	},
	{
		id: "p19",
		slug: "moong-dal-1kg",
		name: "Moong Dal Yellow",
		category: "dals",
		qty: "1 kg",
		mrp: 170,
		discount: 12,
		image: cat_dals_default,
		stock: 180,
		description: "Split yellow moong dal — light, easy to digest, fast cooking.",
		highlights: [
			"Split yellow",
			"Easy digest",
			"High protein",
			"Quick cook"
		]
	},
	{
		id: "p20",
		slug: "wheat-flour-5kg",
		name: "Chakki Atta",
		category: "flours",
		qty: "5 kg",
		mrp: 360,
		discount: 10,
		image: cat_millets_default,
		stock: 110,
		description: "Stone-ground whole wheat flour — soft rotis every time.",
		highlights: [
			"Stone ground",
			"Whole wheat",
			"No additives",
			"Soft rotis"
		]
	}
];
var giftBoxes = [
	{
		id: "g1",
		number: 1,
		name: "Signature Collection",
		tagline: "A perfect blend of health & happiness",
		price: 1499,
		mrp: 1899,
		badges: [
			"Premium Quality",
			"100% Natural",
			"Hygienically Packed"
		]
	},
	{
		id: "g2",
		number: 2,
		name: "Celebrate with Goodness",
		tagline: "Elegance in every bite",
		price: 1299,
		mrp: 1599,
		badges: [
			"Finest Nuts",
			"No Artificial Preservatives",
			"Rich in Nutrients"
		]
	},
	{
		id: "g3",
		number: 3,
		name: "Royal Delight",
		tagline: "Regal taste, just for you",
		price: 2199,
		mrp: 2699,
		badges: [
			"100% Natural",
			"Hygienically Packed",
			"Premium Quality"
		]
	},
	{
		id: "g4",
		number: 4,
		name: "Blush Collection",
		tagline: "Thoughtful gifting, beautifully wrapped",
		price: 1799,
		mrp: 2199,
		badges: [
			"Finest Quality",
			"No Artificial Colors",
			"Healthy & Delicious"
		]
	},
	{
		id: "g5",
		number: 5,
		name: "Elite Collection",
		tagline: "Premium gifts for premium people",
		price: 2599,
		mrp: 3199,
		badges: [
			"100% Natural",
			"Hygienically Packed",
			"Rich in Protein"
		]
	},
	{
		id: "g6",
		number: 6,
		name: "Nature's Basket",
		tagline: "From nature to your doorstep",
		price: 999,
		mrp: 1299,
		badges: [
			"Natural & Fresh",
			"No Preservatives",
			"Sustainably Sourced"
		]
	},
	{
		id: "g7",
		number: 7,
		name: "Hexa Harmony",
		tagline: "Six delights, one perfect gift",
		price: 1899,
		mrp: 2299,
		badges: [
			"Premium Quality",
			"Hygienically Packed",
			"Wholesome & Nutritious"
		]
	},
	{
		id: "g8",
		number: 8,
		name: "Happiness Box",
		tagline: "Small box, big smiles",
		price: 699,
		mrp: 899,
		badges: [
			"Finest Nuts",
			"100% Natural",
			"Perfect for Every Occasion"
		]
	},
	{
		id: "g9",
		number: 9,
		name: "Treasure Trove",
		tagline: "Discover the richness of every bite",
		price: 2399,
		mrp: 2999,
		badges: [
			"No Artificial Additives",
			"Hygienically Packed",
			"Rich in Nutrients"
		]
	},
	{
		id: "g10",
		number: 10,
		name: "Eco Collection",
		tagline: "Good for you, good for nature",
		price: 1199,
		mrp: 1499,
		badges: [
			"Eco Friendly Packaging",
			"100% Natural",
			"Sustainably Sourced"
		]
	}
];
var subscriptionPlans = [
	{
		id: "s1",
		name: "Family Pack",
		blurb: "Daily nutrition for the whole family",
		monthly: 1499,
		includes: [
			"500g Almonds",
			"500g Cashews",
			"250g Raisins",
			"250g Walnuts"
		],
		badge: "Popular"
	},
	{
		id: "s2",
		name: "Fitness Pack",
		blurb: "High-protein fuel for active lifestyles",
		monthly: 1799,
		includes: [
			"500g Almonds",
			"500g Pistachios",
			"250g Pumpkin Seeds",
			"250g Sunflower Seeds"
		]
	},
	{
		id: "s3",
		name: "Kids Nutrition Pack",
		blurb: "Brain-boosting snacks for little ones",
		monthly: 1199,
		includes: [
			"500g Cashews",
			"250g Walnuts",
			"250g Raisins",
			"250g Dates"
		]
	},
	{
		id: "s4",
		name: "Executive Health",
		blurb: "Premium curation for busy professionals",
		monthly: 2499,
		includes: [
			"500g Premium Cashews",
			"500g Pistachios",
			"500g Walnuts",
			"250g Anjeer"
		],
		badge: "Premium"
	}
];
var festivalCollections = [
	{
		id: "f1",
		name: "Diwali Edition",
		tagline: "Light up celebrations",
		accent: "linear-gradient(135deg, oklch(0.55 0.22 30), oklch(0.78 0.13 80))"
	},
	{
		id: "f2",
		name: "Christmas Edition",
		tagline: "Joy in every box",
		accent: "linear-gradient(135deg, oklch(0.4 0.18 150), oklch(0.55 0.22 25))"
	},
	{
		id: "f3",
		name: "Corporate Events",
		tagline: "Branded gifting at scale",
		accent: "linear-gradient(135deg, oklch(0.32 0.21 268), oklch(0.78 0.14 210))"
	},
	{
		id: "f4",
		name: "Wedding Gifts",
		tagline: "Memorable hampers for the day",
		accent: "linear-gradient(135deg, oklch(0.55 0.18 350), oklch(0.78 0.13 80))"
	}
];
var mixIngredients = [
	{
		id: "m1",
		name: "Almonds",
		pricePer100g: 130,
		image: cat_almonds_default
	},
	{
		id: "m2",
		name: "Cashews",
		pricePer100g: 140,
		image: cat_cashews_default
	},
	{
		id: "m3",
		name: "Pistachios",
		pricePer100g: 200,
		image: cat_pistachios_default
	},
	{
		id: "m4",
		name: "Walnuts",
		pricePer100g: 220,
		image: cat_walnuts_default
	},
	{
		id: "m5",
		name: "Raisins",
		pricePer100g: 70,
		image: cat_raisins_default
	},
	{
		id: "m6",
		name: "Anjeer",
		pricePer100g: 180,
		image: cat_anjeer_default
	},
	{
		id: "m7",
		name: "Dates",
		pricePer100g: 150,
		image: cat_dates_default
	},
	{
		id: "m8",
		name: "Pumpkin Seeds",
		pricePer100g: 110,
		image: cat_seeds_default
	}
];
var testimonials = [
	{
		id: "t1",
		name: "Anitha R.",
		city: "Hyderabad",
		text: "Best quality almonds I've had in years — the packaging feels truly premium, and the freshness is unmatched.",
		rating: 5
	},
	{
		id: "t2",
		name: "Rohit M.",
		city: "Bengaluru",
		text: "Ordered the Royal Delight gift box for Diwali. My clients were impressed — beautifully presented and high quality nuts.",
		rating: 5
	},
	{
		id: "t3",
		name: "Priya S.",
		city: "Mumbai",
		text: "The monthly Family Pack subscription keeps my pantry stocked. Always fresh, always on time.",
		rating: 5
	},
	{
		id: "t4",
		name: "Karthik V.",
		city: "Chennai",
		text: "Ordered 200 corporate gift boxes — branding was clean and delivery was on schedule. Highly recommend.",
		rating: 5
	}
];
//#endregion
export { offerPrice as a, testimonials as c, useAuth as d, useAuthModal as f, mixIngredients as i, StoreProviders as l, useWishlist as m, festivalCollections as n, products as o, useCart as p, giftBoxes as r, subscriptionPlans as s, categories as t, inr as u };
