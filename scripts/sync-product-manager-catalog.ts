import { config as loadEnv } from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

loadEnv({ path: '.env.local' });
loadEnv();

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl || !databaseUrl.startsWith('postgresql://')) {
  throw new Error('DATABASE_URL is missing or invalid.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const parentProductSlugs = [
  'pav-sem',
  'pav-ret',
  'pav-tir',
  'cagri-5mg',
  'semax-5mg',
  'selank-5mg',
  '5am',
  'motsc',
  'bacteriostatic-water-10ml',
] as const;

const legacyStandaloneSlugs = [
  'reta-5',
  'reta-10',
  'reta-20',
  'tirz-10',
  'tirz-20',
] as const;

async function main() {
  const [deactivated, activated] = await prisma.$transaction([
    prisma.product.updateMany({
      where: {
        slug: { in: [...legacyStandaloneSlugs] },
      },
      data: { isActive: false },
    }),
    prisma.product.updateMany({
      where: {
        slug: { in: [...parentProductSlugs] },
      },
      data: { isActive: true },
    }),
  ]);

  const glpProducts = await prisma.product.findMany({
    where: { isActive: true, category: { slug: 'glp-products' } },
    select: {
      name: true,
      slug: true,
      isActive: true,
      variants: {
        where: { active: true },
        select: { name: true, price: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      },
    },
    orderBy: { name: 'asc' },
  });

  console.log(
    JSON.stringify(
      {
        deactivatedLegacyStandaloneProducts: deactivated.count,
        activatedParentProducts: activated.count,
        activeGlpProductsAfterSync: glpProducts,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
