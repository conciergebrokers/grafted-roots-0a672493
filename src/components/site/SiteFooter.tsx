import { Link } from "@tanstack/react-router";
import { MEETING_INFO } from "@/data/grafted";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-deepest text-river-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 82% at 20% 38%, rgba(27,110,105,0.36) 0%, rgba(21,85,82,0.16) 34%, transparent 70%), radial-gradient(ellipse 42% 70% at 90% 50%, rgba(34,136,128,0.18) 0%, transparent 68%), linear-gradient(135deg, #081E1C 0%, #0D3D3A 48%, #081E1C 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-3xl text-white">Grafted</div>
          <p className="mt-3 max-w-sm text-river-sand/80">
            A community of faith-first, business-forward people.
          </p>
          <p className="mt-6 font-eyebrow text-xs uppercase tracking-[0.22em] text-refined-gold">
            Known. Rooted. Sent.
          </p>
          <p className="mt-8 max-w-sm text-sm text-river-sand/70">
            A faith-integrated business networking community in Edmonton.
          </p>
        </div>

        <div>
          <div className="font-eyebrow text-xs uppercase tracking-[0.22em] text-river-sand/60">
            Where to find us
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{MEETING_INFO.city}, {MEETING_INFO.province}</li>
            <li>Weekly {MEETING_INFO.day} at {MEETING_INFO.time}</li>
            <li>Founder: {MEETING_INFO.founder}</li>
            <li>
              <a
                href={`mailto:${MEETING_INFO.email}`}
                className="underline-offset-4 hover:underline"
              >
                {MEETING_INFO.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-eyebrow text-xs uppercase tracking-[0.22em] text-river-sand/60">
            Site
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-refined-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-refined-gold">About</Link></li>
            <li><Link to="/faq" className="hover:text-refined-gold">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-refined-gold">Contact</Link></li>
          </ul>
          <div className="mt-6 font-eyebrow text-xs uppercase tracking-[0.22em] text-river-sand/40">
            Coming soon
          </div>
          <ul className="mt-3 space-y-2 text-sm text-river-sand/60">
            <li><Link to="/portal" className="hover:text-refined-gold">Member Portal</Link></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-river-sand/10">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-river-sand/50 md:px-8">
          &copy; {new Date().getFullYear()} Grafted. {MEETING_INFO.domain}
        </div>
      </div>
    </footer>
  );
}
