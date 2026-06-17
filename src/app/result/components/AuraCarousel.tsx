'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Language } from '@/store/useQuizStore';

interface AuraCarouselProps {
  children: ReactNode;
  language: Language;
}

/**
 * Horizontal swipeable carousel built on native CSS scroll-snap.
 *
 * Why scroll-snap over a JS/drag carousel:
 *  - The browser handles flick momentum and snap thresholds natively, so the
 *    gesture feels identical to every other horizontal list on the device.
 *  - Zero JS animation cost — we only track the active index to drive the dots.
 *  - No new dependency (framer-motion drag would need manual snap/threshold code).
 *
 * Layout: each slide is w-full and snap-start, so the container snaps one slide
 * per swipe. Height is not fixed — the track grows to fit the tallest slide, and
 * shorter slides sit at the top (the consumer fills trailing space as it likes).
 */
export default function AuraCarousel({ children, language }: AuraCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  const slideCount = Array.isArray(children) ? children.length : 1;

  // Track active slide on scroll, throttled to one rAF per frame.
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = trackRef.current;
      if (!el) return;
      const next = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex((prev) => (prev !== next ? next : prev));
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <div className="mx-auto mb-5 w-full max-w-md px-5">
      {/* Horizontal scroll track. overflow-x-auto enables horizontal panning;
          snap-x snap-mandatory snaps one slide per gesture; the scrollbar is
          hidden because dots are the canonical indicator. */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {Array.isArray(children) ? (
          children.map((child, i) => (
            <div key={i} className="w-full shrink-0 snap-start first:pl-0">
              {child}
            </div>
          ))
        ) : (
          <div className="w-full shrink-0 snap-start">{children}</div>
        )}
      </div>

      {/* Dot indicator — one per slide. Clicking a dot smooth-scrolls to it. */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={
              language === 'en' ? `Go to slide ${i + 1}` : `去第 ${i + 1} 張`
            }
            aria-current={i === activeIndex}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-5 bg-stone-800'
                : 'w-1.5 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
