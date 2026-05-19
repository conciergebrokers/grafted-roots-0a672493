import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(node);
    // Safety: if observer never fires (e.g. already past viewport), reveal soon.
    const t = window.setTimeout(() => setVisible(true), 600);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        reduce
          ? { opacity: 1, y: 0 }
          : { opacity: visible ? 1 : 0, y: visible ? 0 : 18 }
      }
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}