import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-deep text-white/80 mt-20">
      <div className="max-w-7xl mx-auto container-px py-14 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
          <div className="[&_*]:!text-white"><Logo /></div>
          <p className="text-sm text-white/70 max-w-sm">Lavish Grand Traders Pvt. Ltd. — premium dry fruits, seeds, spices and corporate gifting. Sourced with care, packed with pride.</p>
          <div className="text-xs text-white/60 space-y-1">
            <div>CIN: U46909TS2026PTC214908</div>
            <div>GST: 36AAGCL8507N1ZZ</div>
            <div className="flex items-start gap-1.5"><MapPin className="w-3 h-3 mt-0.5 shrink-0" /> Plot No 7/A, Phase-V, IDA Cherlapally, EC Nagar, Navodaya Colony, Hyderabad — 500051</div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h4 className="font-display text-white text-base mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-brand-cyan">All Products</Link></li>
            <li><Link to="/gift-boxes" className="hover:text-brand-cyan">Gift Boxes</Link></li>
            <li><Link to="/build-your-mix" className="hover:text-brand-cyan">Build Your Mix</Link></li>
            <li><Link to="/subscriptions" className="hover:text-brand-cyan">Subscriptions</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h4 className="font-display text-white text-base mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brand-cyan">About Us</Link></li>
            <li><Link to="/corporate" className="hover:text-brand-cyan">Corporate Orders</Link></li>
            <li><Link to="/contact" className="hover:text-brand-cyan">Contact</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-4">
          <h4 className="font-display text-white text-base mb-3">Get in touch</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-cyan" /> +91 98489 56829</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-cyan" /> lavishgrandtraderspvtltd@gmail.com</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.instagram.com/p/DZ9vpQjkah7/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Lavish Grand Traders on Instagram"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-cyan hover:text-brand-deep flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/stories/122095400739379391/UzpfSVNDOjIwMTk3MjA5NjE5NzA0NzE=/?view_single=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Lavish Grand Traders on Facebook"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-cyan hover:text-brand-deep flex items-center justify-center transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto container-px py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Lavish Grand Traders Pvt. Ltd. All rights reserved.</span>
          <span>Made with care in Hyderabad, India</span>
        </div>
      </div>
    </footer>
  );
}
