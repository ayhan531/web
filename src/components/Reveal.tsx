'use client';

import { useEffect, useRef } from 'react';
import type { JSX } from 'react';

type RevealProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delayMs?: number;
};

export default function Reveal({ children, as = 'div', className = '', delayMs = 0 }: RevealProps) {
  const Comp: any = as;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('reveal');
    if (delayMs) el.style.transitionDelay = `${delayMs}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
