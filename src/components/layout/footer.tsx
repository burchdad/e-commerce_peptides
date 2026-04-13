import Link from 'next/link';

import { brand } from '@/lib/data/site';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[var(--color-gold-soft)] bg-[var(--color-ink)]">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl text-[var(--color-ivory)]">{brand.name}</h3>
          <p className="mt-3 text-sm text-[var(--color-sand)]">Premium peptide products presented exclusively for research-use environments.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-sand)]">
            <li><Link href="/research-disclaimer">Research Disclaimer</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-sand)]">
            <li>{brand.email}</li>
            <li>{brand.phone}</li>
            <li>{brand.address}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
