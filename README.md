# Noir Axis Research MVP

Production-ready MVP storefront for a premium, research-positioned peptide business.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Prisma ORM 7 + PostgreSQL adapter
- Zod validation for server-side form/API validation
- Component-driven architecture
- Config-based payment method abstraction
- Secure admin auth session flow (cookie-based)
- Admin CRUD API layer for products, FAQs, legal pages, order statuses

## Implemented Features

- Luxury storefront UI system with art deco-inspired visual language
- Age gate modal with localStorage persistence
- Research-use disclaimer presentation across key buying surfaces
- Catalog architecture with categories, products, attributes, badges, featured products
- Seed data for GLP products and accessories
- Product detail pages with legal context near purchase action
- Complimentary kit spotlight with dedicated page and reusable contents component
- Accessories section for standalone kit item sales
- Peptide reconstitution calculator (math framing only)
- New customer registration flow with legal acknowledgement capture
- Cart state management with localStorage persistence
- Checkout/order request flow with modular payment method selector
- Legal pages (Research Disclaimer, Terms, Privacy)
- Contact form and FAQ experience
- Account/order lookup MVP placeholder route
- Admin login and protected dashboard
- Prisma schema for categories, products, FAQs, legal pages, payment config, orders
- DB-backed order request persistence (with safe fallback when DB is not configured)

## Route Map

- `/`
- `/shop`
- `/shop/[category]`
- `/product/[slug]`
- `/complimentary-kit`
- `/accessories`
- `/calculator`
- `/register`
- `/faq`
- `/research-disclaimer`
- `/terms`
- `/privacy`
- `/contact`
- `/cart`
- `/checkout`
- `/order-confirmation`
- `/account`
- `/admin`
- `/admin/login`
- `/api/admin/login`
- `/api/admin/logout`
- `/api/admin/products`
- `/api/admin/products/[id]`
- `/api/admin/faqs`
- `/api/admin/faqs/[id]`
- `/api/admin/legal-pages`
- `/api/admin/legal-pages/[id]`
- `/api/admin/orders/[id]`
- `/api/order-request`
- `/api/register`
- `/api/contact`

## Project Structure

```text
src/
	app/
		(routes and api handlers)
	components/
		admin/
		commerce/
		forms/
		home/
		layout/
		ui/
	context/
		cart-context.tsx
	lib/
		data/site.ts
		types.ts
		utils/
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Run quality checks:

```bash
npm run lint
npm run build
npm run prisma:generate
```

## Environment Variables

Create `.env.local` (current MVP works without required runtime secrets, but these keys are prepared for next integrations):

```bash
NEXT_PUBLIC_SITE_NAME="Noir Axis Research"
NEXT_PUBLIC_SUPPORT_EMAIL="support@noiraxisresearch.com"
NEXT_PUBLIC_SUPPORT_PHONE="+1 (800) 555-0199"

# Future persistence and auth
DATABASE_URL="postgresql://user:password@localhost:5432/noir_axis"
ADMIN_AUTH_SECRET="replace_me"
ADMIN_PASSWORD="replace_me"

# Future email integrations
EMAIL_FROM="orders@noiraxisresearch.com"
EMAIL_ADMIN_TO="ops@noiraxisresearch.com"
RESEND_API_KEY=""

# Future payment integrations
PAYMENT_PROVIDER_MODE="manual"
PAYMENT_WEBHOOK_SECRET=""
```

## Prisma Commands

```bash
npm run prisma:generate
npm run prisma:push
npm run db:seed
```

## Payment Integration TODOs

- Add DB-backed payment method config table and admin controls.
- Replace checkout placeholders with provider adapters (`invoice`, `zelle`, `cashapp`, `paypal`, future processor SDKs).
- Persist payment and invoice statuses per order request.
- Add webhook handlers for future real-time processor events.
- Implement per-method instruction templates and automated emails.

## Operational TODOs

- Add role-based admin users (currently single shared admin password).
- Add migration history and deployment migration workflow for production environments.
- Wire transactional email service for:
	- order request received
	- admin new order alert
	- registration received
	- contact message received
- Add image assets and media management strategy (S3/Supabase Storage).
- Add SEO schema markup per product and category.
