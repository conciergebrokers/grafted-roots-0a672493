import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Member Sign In | Grafted" },
      { name: "description", content: "Sign in to your Grafted member portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/profile" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/profile" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleGoogle() {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/profile` },
      });
      if (error) {
        toast.error("Sign-in failed. Please try again.");
        setGoogleLoading(false);
      }
    } catch {
      toast.error("Sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  }

  async function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      toast.error("Enter the email connected to your Grafted membership.");
      return;
    }

    setEmailLoading(true);
    setMagicLinkSent(false);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/profile`,
          shouldCreateUser: true,
        },
      });

      if (error) {
        toast.error("We could not send the sign-in link. Please try again.");
        return;
      }

      setMagicLinkSent(true);
      toast.success("Check your email for a secure sign-in link.");
    } catch {
      toast.error("We could not send the sign-in link. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-river-sand px-5 py-20">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center md:p-10">
        <h1 className="font-serif text-3xl text-deep-waters">Member Sign In</h1>
        <p className="mt-3 text-deep-waters/75">
          Access your Grafted profile and future billing receipts using Google or a secure email link.
        </p>

        <div className="mt-8">
          <Button
            onClick={handleGoogle}
            disabled={googleLoading || emailLoading}
            className="w-full bg-deep-waters text-river-sand hover:bg-still-pool"
          >
            <GoogleIcon />
            {googleLoading ? "Opening Google..." : "Continue with Google"}
          </Button>
        </div>

        <div className="my-7 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-deep-waters/45">
          <span className="h-px flex-1 bg-deep-waters/10" />
          or
          <span className="h-px flex-1 bg-deep-waters/10" />
        </div>

        <form onSubmit={handleEmail} className="text-left">
          <label className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-deep-waters/65">
            Email address
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-md border border-deep-waters/15 bg-background px-4 py-3 text-sm text-deep-waters outline-none focus:border-refined-gold focus:ring-2 focus:ring-refined-gold/20"
          />
          <Button
            disabled={emailLoading || googleLoading}
            className="mt-4 w-full bg-refined-gold text-deep-waters hover:bg-sunrise-copper font-eyebrow text-xs uppercase tracking-[0.18em]"
          >
            {emailLoading ? "Sending link..." : "Email me a sign-in link"}
          </Button>
        </form>

        {magicLinkSent && (
          <p className="mt-5 rounded-lg bg-river-pale px-4 py-3 text-sm text-deep-waters/75">
            Check your inbox. Use the secure link to access your member portal.
          </p>
        )}

        <p className="mt-6 text-xs text-deep-waters/60">
          Use the same email connected to your Grafted membership.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.2 5.2C41 34.9 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
