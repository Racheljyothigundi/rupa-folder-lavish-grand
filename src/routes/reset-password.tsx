import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — Lavish Grand Traders" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  // Supabase puts the recovery token in the URL hash; the SDK picks it up
  // automatically and fires a PASSWORD_RECOVERY event.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated");
    nav({ to: "/account", search: { tab: "dashboard" as const } });
  };

  return (
    <SiteLayout>
      <section className="max-w-md mx-auto container-px py-20">
        <div className="bg-white border border-border rounded-2xl p-8 shadow-soft">
          <div className="w-12 h-12 rounded-full bg-gradient-hero text-white flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6" /></div>
          <h1 className="font-display text-3xl font-bold text-brand-deep">Set a new password</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose a strong password you haven't used before.</p>
          {ready ? (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="space-y-1.5"><Label>New password</Label><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Confirm password</Label><Input type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div>
              <Button type="submit" disabled={busy} className="w-full h-11 bg-gradient-hero text-white shadow-elegant">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />} Update Password
              </Button>
            </form>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">Waiting for recovery link… Open the link from your email on this device.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}