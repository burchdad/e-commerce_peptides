import Link from 'next/link';

import { siteConfig } from '@/lib/config/site-config';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl text-[var(--color-text)]">{siteConfig.brandName}</h3>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Premium peptide products presented exclusively for research-use environments.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li><Link href="/research-disclaimer">Research Disclaimer</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>{siteConfig.supportEmail}</li>
            <li>{siteConfig.supportPhone}</li>
            <li>{siteConfig.supportAddress}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
