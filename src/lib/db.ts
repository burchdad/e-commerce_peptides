import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

declare global {
  var __prismaClient: PrismaClient | null | undefined;
}

const globalForPrisma = globalThis as unknown as { __prismaClient?: PrismaClient | null };

const createPrismaClient = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
};

export const prisma = globalForPrisma.__prismaClient ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prismaClient = prisma;
}

export const hasDatabaseUrl = Boolean(process.env.DATABASE_URL) && Boolean(prisma);
