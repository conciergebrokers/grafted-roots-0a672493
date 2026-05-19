import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_protected")({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-river-sand px-5 py-20">
        <div className="max-w-md rounded-2xl border border-border bg-card p-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-deep-waters text-refined-gold">
            <Lock className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <h1 className="mt-5 font-serif text-2xl text-deep-waters">
            Protected area
          </h1>
          <p className="mt-3 text-deep-waters/75">
            This space is reserved for members and leadership. Authentication
            is not yet wired. When the portal launches, sign in will live
            here.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild className="bg-deep-waters text-river-sand hover:bg-still-pool">
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Ask a question</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return <Outlet />;
}