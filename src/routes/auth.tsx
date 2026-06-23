import { createFileRoute, Navigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth, useAuthModal } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Lavish Grand Traders" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const modal = useAuthModal();
  useEffect(() => {
    if (!loading && !user) modal.setOpen(true);
  }, [loading, user, modal]);
  if (user) return <Navigate to="/account" search={{ tab: "dashboard" as const }} />;
  if (loading) {
    return (
      <SiteLayout>
        <section className="max-w-md mx-auto py-24 text-center container-px">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand" />
          <p className="mt-4 text-muted-foreground">Checking your session…</p>
        </section>
      </SiteLayout>
    );
  }
  return (
    <SiteLayout>
      <section className="max-w-md mx-auto py-24 text-center container-px">
        <h1 className="font-display text-3xl font-bold text-brand-deep">Sign in to continue</h1>
        <Button onClick={() => modal.trigger()} className="mt-6 bg-gradient-hero text-white">
          Open Sign-In
        </Button>
      </section>
    </SiteLayout>
  );
}
