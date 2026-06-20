import { CartPageClient } from '@/components/commerce/cart-page-client';
import { fetchAllProducts } from '@/lib/utils/catalog';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const catalog = await fetchAllProducts();
  return <CartPageClient catalog={catalog} />;
}
