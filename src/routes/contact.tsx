import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Lavish Grand Traders" }, { name: "description", content: "Get in touch with our team for orders, support or corporate enquiries." }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="bg-gradient-deep text-white py-14">
        <div className="max-w-7xl mx-auto container-px text-center">
          <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">We're here</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Get in touch</h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">Questions about orders, products or corporate gifting? Our team responds within 24 hours.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto container-px grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            {[
              { i: Phone, t: "Call us", s: "+91 98489 56829", href: "tel:+919848956829" },
              { i: Mail, t: "Email us", s: "lavishgrandtraderspvtltd@gmail.com", href: "mailto:lavishgrandtraderspvtltd@gmail.com" },
              { i: MapPin, t: "Visit us", s: "Plot No 7/A, Phase-V, IDA Cherlapally, EC Nagar, Navodaya Colony, Hyderabad — 500051" },
              { i: MessageSquare, t: "WhatsApp", s: "Chat with us 9 AM – 9 PM IST" },
            ].map((c) => (
              <a key={c.t} href={c.href} className="block bg-white border border-border rounded-2xl p-5 hover:border-brand/30 hover:shadow-soft transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-hero text-white flex items-center justify-center"><c.i className="w-5 h-5" /></div>
                  <div><div className="font-display font-bold text-brand-deep">{c.t}</div><div className="text-sm text-muted-foreground">{c.s}</div></div>
                </div>
              </a>
            ))}
          </div>
          {sent ? (
            <div className="bg-white border border-border rounded-2xl p-10 text-center self-start">
              <div className="font-display text-2xl font-bold text-brand-deep">Thanks for reaching out</div>
              <div className="text-muted-foreground mt-2">We'll get back to you within 24 hours.</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent"); }} className="bg-white border border-border rounded-2xl p-8 shadow-soft space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Name *</Label><Input required /></div>
                <div className="space-y-1.5"><Label>Email *</Label><Input type="email" required /></div>
              </div>
              <div className="space-y-1.5"><Label>Phone</Label><Input /></div>
              <div className="space-y-1.5"><Label>Message *</Label><Textarea rows={5} required /></div>
              <Button type="submit" className="w-full bg-gradient-hero text-white h-12 shadow-elegant">Send Message</Button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}