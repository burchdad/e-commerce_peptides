import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { siteConfig } from '@/lib/config/site-config';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Shop | ${siteConfig.brandName}`,
  };
}

export default function CategoryPage() {
  redirect('/shop');
}
