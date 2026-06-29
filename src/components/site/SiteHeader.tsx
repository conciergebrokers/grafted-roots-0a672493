import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/site/Wordmark";

const EVENTBRITE_URL =
  "https://www.eventbrite.ca/e/grafted-faith-integrated-business-networking-tickets-1992099094016";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const navLinkClass =
  "rounded-full px-3.5 py-2 font-eyebrow text-[11px] uppercase tracking-[0.18em] text-deep-waters/65 transition-colors hover:bg-river-pale hover:text-deep-waters data-[status=active]:bg-river-pale data-[status=active]:text-deep-waters";

const membershipLinkClass =
  "inline-flex h-10 items-center rounded-full px-3.5 font-eyebrow text-[11px] uppercase tracking-[0.16em] text-deep-waters/70 transition-colors hover:bg-refined-gold/10 hover:text-deep-waters";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <div className="flex min-w-0 items-center">
          <Wordmark />
        </div>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <nav className="flex items-center gap-1" aria-label="Primary">
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
            <Link to="/contact" className={membershipLinkClass}>
              Apply for Membership
            </Link>
          </nav>

          <span aria-hidden className="h-6 w-px bg-deep-waters/12" />

          <Button
            asChild
            className="h-10 rounded-md bg-deep-waters px-5 font-eyebrow text-[11px] uppercase tracking-[0.16em] text-river-sand shadow-none transition-colors hover:bg-still-pool"
          >
            <a href={EVENTBRITE_URL} target="_blank" rel="noopener noreferrer">
              Visit Grafted
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
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
              <div className="flex items-center justify-end pb-6">
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
                  variant="outline"
                  className="font-eyebrow text-xs uppercase tracking-[0.18em]"
                  onClick={() => setOpen(false)}
                >
                  <Link to="/contact">Apply for Membership</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
