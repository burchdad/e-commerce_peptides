'use client';

import { useState } from 'react';

import type { FaqItem } from '@/lib/types';

export const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="rounded-xl border border-[var(--color-gold-soft)] bg-[var(--color-ink-2)]">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="font-medium text-[var(--color-ivory)]">{item.question}</span>
              <span className="text-[var(--color-gold)]">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? <p className="border-t border-[var(--color-gold-soft)] px-5 py-4 text-sm text-[var(--color-sand)]">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
};
