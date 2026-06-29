import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { EVENTBRITE_URL } from "@/data/membership";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const navLinkClass =
  "rounded-md px-3 py-2 font-eyebrow text-[11px] uppercase tracking-[0.18em] text-deep-waters/65 transition-colors hover:bg-river-pale hover:text-deep-waters data-[status=active]:bg-river-pale data-[status=active]:text-deep-waters";

const actionButtonClass =
  "h-10 rounded-md px-4 font-eyebrow text-[11px] uppercase tracking-[0.16em] whitespace-nowrap transition-colors";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-5 px-5 md:px-8">
        <div className="flex min-w-0 items-center">
          <Wordmark className="shrink-0" />
        </div>

        <nav className="hidden items-center justify-center gap-1 xl:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(navLinkClass)}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-2.5 xl:flex">
          <Button
            asChild
            className={cn(
              actionButtonClass,
              "bg-refined-gold text-deepest shadow-none hover:bg-sunrise-copper",
            )}
          >
            <Link to="/join">Apply for Membership</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={cn(
              actionButtonClass,
              "text-deep-waters/70 hover:bg-river-pale hover:text-deep-waters",
            )}
          >
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button
            asChild
            className={cn(
              actionButtonClass,
              "bg-deep-waters text-river-sand shadow-none hover:bg-still-pool",
            )}
          >
            <a href={EVENTBRITE_URL} target="_blank" rel="noopener noreferrer">
              Visit Grafted
            </a>
          </Button>
        </div>

        <div className="justify-self-end xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-deep-waters transition-colors hover:bg-river-pale"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[380px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between pb-6">
                <Wordmark />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-river-pale"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-2" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md border-b border-border/50 px-1 py-3 font-serif text-xl text-foreground transition-colors hover:bg-river-pale"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Button
                  asChild
                  className="bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.18em]"
                  onClick={() => setOpen(false)}
                >
                  <a href={EVENTBRITE_URL} target="_blank" rel="noopener noreferrer">
                    Visit Grafted
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-refined-gold text-deepest hover:bg-sunrise-copper font-eyebrow text-xs uppercase tracking-[0.18em]"
                  onClick={() => setOpen(false)}
                >
                  <Link to="/join">Apply for Membership</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="font-eyebrow text-xs uppercase tracking-[0.18em]"
                  onClick={() => setOpen(false)}
                >
                  <Link to="/auth">Sign in</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
