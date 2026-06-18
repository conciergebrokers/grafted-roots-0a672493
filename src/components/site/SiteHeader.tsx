import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "font-eyebrow text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground",
                "data-[status=active]:text-foreground",
              )}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-3">
          <Button asChild variant="ghost" className="font-eyebrow text-xs uppercase tracking-[0.18em]">
            <Link to="/contact">Apply for Membership</Link>
          </Button>
          <Button
            asChild
            className="bg-deep-waters font-eyebrow text-xs uppercase tracking-[0.18em] text-river-sand hover:bg-still-pool"
          >
            <a
              href="https://www.eventbrite.ca/e/grafted-faith-integrated-business-networking-tickets-1992099094016"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Grafted
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary"
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-secondary"
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
                    className="font-serif text-xl text-foreground py-2 border-b border-border/50"
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
                  <a
                    href="https://www.eventbrite.ca/e/grafted-faith-integrated-business-networking-tickets-1992099094016"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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