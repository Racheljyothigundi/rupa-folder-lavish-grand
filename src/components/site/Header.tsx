import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  Truck,
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Package,
} from "lucide-react";
import { Logo } from "./Logo";
import { useAuth, useAuthModal, useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/catalog";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string; mega?: boolean };
const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products", mega: true },
  { label: "Gift Boxes", to: "/gift-boxes" },
  { label: "Build Your Mix", to: "/build-your-mix" },
  { label: "Subscriptions", to: "/subscriptions" },
  { label: "Corporate", to: "/corporate" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { user, logout } = useAuth();
  const modal = useAuthModal();
  const cart = useCart();
  const wish = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/60">
      {/* Top bar */}
      <div className="bg-gradient-deep text-white text-[12px]">
        <div className="max-w-7xl mx-auto container-px py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 overflow-hidden">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Phone className="w-3 h-3 text-brand-cyan" /> +91 98489 56829
            </span>
            <span className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
              <Mail className="w-3 h-3 text-brand-cyan" /> lavishgrandtraderspvtltd@gmail.com
            </span>
            <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> GST: 36AAGCL8507N1ZZ
            </span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap text-gold-soft">
            <Truck className="w-3.5 h-3.5" /> Free delivery on orders above ₹999
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto container-px py-4 flex items-center gap-6">
        <Logo />
        <div className="hidden md:flex flex-1 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search dry fruits, spices, gift boxes…"
              className="pl-11 h-11 bg-secondary/60 border-secondary focus-visible:ring-brand-cyan"
            />
            <Button
              size="sm"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 bg-gradient-hero text-white"
            >
              Search
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-3 ml-auto">
          <Link
            to="/wishlist"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary relative group"
          >
            <Heart className="w-5 h-5 text-brand group-hover:fill-brand/10" />
            {wish.ids.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold">
                {wish.ids.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary relative"
          >
            <ShoppingBag className="w-5 h-5 text-brand" />
            {cart.itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] rounded-full bg-brand-cyan text-brand-deep flex items-center justify-center font-bold">
                {cart.itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 h-10">
                  <div className="w-7 h-7 rounded-full bg-gradient-hero text-white flex items-center justify-center font-bold text-xs">
                    {user.name[0]?.toUpperCase()}
                  </div>
                  <span className="hidden md:inline text-sm">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" search={{ tab: "dashboard" }}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    My Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" search={{ tab: "orders" }}>
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" search={{ tab: "overview" }}>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Admin Console
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === "corporate" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/corporate">
                        <Package className="w-4 h-4 mr-2" />
                        Corporate Portal
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" onClick={() => modal.trigger()} className="gap-2">
              <UserIcon className="w-4 h-4" />
              <span className="hidden md:inline">Login</span>
            </Button>
          )}
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-2">
            <Menu />
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block border-t border-border/60">
        <div className="max-w-7xl mx-auto container-px flex items-center gap-1 h-12">
          {navItems.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            if (n.mega) {
              return (
                <div key={n.to} className="relative group">
                  <Link
                    to={n.to}
                    className={cn(
                      "flex items-center gap-1 px-4 h-12 text-sm font-medium hover:text-brand transition-colors",
                      active && "text-brand",
                    )}
                  >
                    {n.label} <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <div className="absolute left-0 top-full hidden group-hover:block pt-1 w-[680px]">
                    <div className="bg-card border border-border rounded-xl shadow-elegant p-5 grid grid-cols-3 gap-3">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          to="/products"
                          search={{ category: c.slug }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary"
                        >
                          <img src={c.image} alt="" className="w-11 h-11 rounded-lg object-cover" />
                          <div>
                            <div className="text-sm font-semibold text-foreground">{c.name}</div>
                            <div className="text-[11px] text-muted-foreground">{c.blurb}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "px-4 h-12 flex items-center text-sm font-medium hover:text-brand transition-colors relative",
                  active && "text-brand",
                )}
              >
                {n.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 bg-gradient-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-72 bg-background p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <Logo compact />
              <button onClick={() => setMobileOpen(false)}>
                <X />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg hover:bg-secondary text-sm font-medium"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
