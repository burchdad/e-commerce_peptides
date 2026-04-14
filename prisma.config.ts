import { config as loadEnv } from 'dotenv';

import { defineConfig } from 'prisma/config';

// Prisma CLI does not automatically mirror Next.js env resolution.
// Load .env.local first for local/dev workflows, then .env as fallback.
loadEnv({ path: '.env.local' });
loadEnv();

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is missing for Prisma CLI. Add it to .env.local or export it before running prisma commands.',
  );
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npm run db:seed',
  },
  datasource: {
    url: databaseUrl,
  },
});
