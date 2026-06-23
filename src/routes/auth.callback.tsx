import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_NEXT = "/account?tab=dashboard";

function getSafeNext(next?: string) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return DEFAULT_NEXT;
  }

  return next;
}

function readAuthError(url: URL) {
  const hashParams = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : url.hash);
  const message =
    url.searchParams.get("error_description") ||
    hashParams.get("error_description") ||
    url.searchParams.get("error") ||
    hashParams.get("error");

  return message ? decodeURIComponent(message.replace(/\+/g, " ")) : null;
}

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search): { next?: string } => ({
    next: typeof search.next === "string" ? search.next : undefined,
  }),
  head: () => ({ meta: [{ title: "Signing you in — Lavish Grand Traders" }] }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const { next } = Route.useSearch();
  const safeNext = useMemo(() => getSafeNext(next), [next]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const waitForSession = async () => {
      const { data: existing } = await supabase.auth.getSession();
      if (existing.session) return;

      await new Promise<void>((resolve, reject) => {
        let settled = false;

        const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
          if (!session || settled) return;

          if (
            event === "SIGNED_IN" ||
            event === "INITIAL_SESSION" ||
            event === "TOKEN_REFRESHED" ||
            event === "USER_UPDATED"
          ) {
            settled = true;
            window.clearTimeout(timeoutId);
            subscription.subscription.unsubscribe();
            resolve();
          }
        });

        const timeoutId = window.setTimeout(() => {
          if (settled) return;
          settled = true;
          subscription.subscription.unsubscribe();
          reject(new Error("We couldn't confirm your sign-in. Please try again."));
        }, 5000);
      });
    };

    const finishSignIn = async () => {
      const url = new URL(window.location.href);
      const authError = readAuthError(url);
      if (authError) {
        throw new Error(authError);
      }

      if (url.searchParams.get("code")) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
          window.location.href,
        );
        if (exchangeError) throw exchangeError;
      } else {
        await waitForSession();
      }

      if (!active) return;

      toast.success("Signed in successfully.");
      window.location.replace(safeNext);
    };

    void finishSignIn().catch((caughtError) => {
      if (!active) return;
      console.error("[Auth] OAuth callback failed", caughtError);
      setError(caughtError instanceof Error ? caughtError.message : "Unable to complete sign-in.");
    });

    return () => {
      active = false;
    };
  }, [safeNext]);

  return (
    <SiteLayout>
      <section className="max-w-md mx-auto container-px py-24">
        <div className="bg-white border border-border rounded-2xl p-8 shadow-soft text-center">
          {error ? (
            <>
              <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h1 className="font-display text-3xl font-bold text-brand-deep mt-4">
                Google sign-in failed
              </h1>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-gradient-hero text-white">
                  <Link to="/auth">Try again</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand" />
              <h1 className="font-display text-3xl font-bold text-brand-deep mt-4">
                Finishing sign-in
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                We&apos;re securely connecting your Google account and preparing your dashboard.
              </p>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
