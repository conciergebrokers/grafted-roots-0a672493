import { useEffect, useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";

type Status =
  | "loading"
  | "ready"
  | "already"
  | "invalid"
  | "success"
  | "error";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const { token } = useSearch({ from: "/unsubscribe" });
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) return setStatus("invalid");
        if (data.valid) return setStatus("ready");
        if (data.reason === "already_unsubscribed")
          return setStatus("already");
        setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const confirm = async () => {
    setSubmitting(true);
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.success) setStatus("success");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-[70vh] bg-river-pale">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="font-eyebrow text-[11px] uppercase tracking-[0.2em] text-refined-gold">
          Email preferences
        </p>
        <h1 className="mt-3 font-serif text-3xl text-deep-waters">
          Unsubscribe from Grafted emails
        </h1>

        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          {status === "loading" && (
            <p className="text-deep-waters/75">Checking your link…</p>
          )}
          {status === "ready" && (
            <>
              <p className="text-deep-waters/85">
                Click confirm to stop receiving emails from Grafted.
              </p>
              <button
                onClick={confirm}
                disabled={submitting}
                className="mt-6 rounded-md bg-deep-waters px-6 py-3 font-eyebrow text-xs uppercase tracking-[0.2em] text-river-sand hover:bg-still-pool disabled:opacity-60"
              >
                {submitting ? "Unsubscribing…" : "Confirm unsubscribe"}
              </button>
            </>
          )}
          {status === "success" && (
            <p className="text-deep-waters/85">
              You've been unsubscribed. We won't email you again.
            </p>
          )}
          {status === "already" && (
            <p className="text-deep-waters/85">
              This email address is already unsubscribed.
            </p>
          )}
          {status === "invalid" && (
            <p className="text-deep-waters/85">
              This unsubscribe link is invalid or has expired.
            </p>
          )}
          {status === "error" && (
            <p className="text-destructive">
              Something went wrong. Please try again later.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}