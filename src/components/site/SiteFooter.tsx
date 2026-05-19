import { Link } from "@tanstack/react-router";
import { MEETING_INFO } from "@/data/grafted";

export function SiteFooter() {
  return (
    <footer className="bg-deep-waters text-river-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-3xl">Grafted</div>
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
            <li><Link to="/members" className="hover:text-refined-gold">Member Showcase</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-river-sand/10">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-river-sand/50 md:px-8">
          &copy; {new Date().getFullYear()} Grafted. {MEETING_INFO.domain}
        </div>
      </div>
    </footer>
  );
}