'use client';

import { useEffect, useState } from 'react';

interface PackageIndexProps {
  items: { id: string; name: string }[];
}

export default function PackageIndex({ items }: PackageIndexProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(item.id);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [items]);

  return (
    <div className="sticky top-14 z-30 border-b border-border/40 bg-surface-secondary/95 backdrop-blur-md">
      <div className="mx-auto max-w-[90rem] overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-6 px-6 py-2 sm:px-10 lg:px-16">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`whitespace-nowrap font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeId === item.id
                  ? 'text-charcoal/50'
                  : 'text-charcoal/18 hover:text-charcoal/35'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
