import { useEffect } from "react";
import { ExternalLink, Ticket } from "lucide-react";

const EVENTBRITE_EVENT_ID = "1992099094016";
const EVENTBRITE_TRIGGER_ID = `eventbrite-widget-modal-trigger-${EVENTBRITE_EVENT_ID}`;
const EVENTBRITE_URL =
  "https://www.eventbrite.ca/e/grafted-faith-integrated-business-networking-tickets-1992099094016";
const EVENTBRITE_SCRIPT_ID = "eventbrite-checkout-widget-script";

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: {
        widgetType: "checkout";
        eventId: string;
        modal: boolean;
        modalTriggerElementId: string;
        onOrderComplete?: () => void;
      }) => void;
    };
  }
}

export function EventbriteCheckout() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    const initializeWidget = () => {
      if (!isMounted || !window.EBWidgets) return;

      window.EBWidgets.createWidget({
        widgetType: "checkout",
        eventId: EVENTBRITE_EVENT_ID,
        modal: true,
        modalTriggerElementId: EVENTBRITE_TRIGGER_ID,
        onOrderComplete: () => {
          console.log("Eventbrite order complete.");
        },
      });
    };

    const existingScript = document.getElementById(EVENTBRITE_SCRIPT_ID);

    if (window.EBWidgets) {
      initializeWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", initializeWidget);
    } else {
      const script = document.createElement("script");
      script.id = EVENTBRITE_SCRIPT_ID;
      script.src = "https://www.eventbrite.ca/static/widgets/eb_widgets.js";
      script.async = true;
      script.addEventListener("load", initializeWidget);
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
      const script = document.getElementById(EVENTBRITE_SCRIPT_ID);
      script?.removeEventListener("load", initializeWidget);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-refined-gold/35 bg-river-pale p-6 shadow-sm">
      <noscript>
        <a href={EVENTBRITE_URL} rel="noopener noreferrer" target="_blank">
          Reserve your spot on Eventbrite
        </a>
      </noscript>

      <div className="flex items-start gap-4">
        <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-deep-waters text-refined-gold">
          <Ticket className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
            Visit Grafted
          </div>
          <h3 className="mt-2 font-serif text-2xl text-deep-waters">
            Reserve your spot for an upcoming meeting.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-deep-waters/75">
            Use Eventbrite to register for the Grafted faith-integrated business networking meeting. Your first visits are free. Lunch is on your own.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          id={EVENTBRITE_TRIGGER_ID}
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-refined-gold px-5 py-3 font-eyebrow text-xs uppercase tracking-[0.2em] text-deepest transition-colors hover:bg-sunrise-copper"
        >
          Reserve on Eventbrite
        </button>
        <a
          href={EVENTBRITE_URL}
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-deep-waters/20 px-5 py-3 font-eyebrow text-xs uppercase tracking-[0.2em] text-deep-waters transition-colors hover:bg-deep-waters/5"
        >
          Open Eventbrite
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  );
}
