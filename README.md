# Texas Sunny Rentals 🌞

Bounce house & party rental website built with Next.js, Prisma, and Tailwind CSS.

## Stack
- **Next.js 15** (App Router)
- **Tailwind CSS**
- **Prisma** ORM
- **PostgreSQL** (Railway)
- **NextAuth.js** (admin authentication)

## Setup

### 1. Configure environment variables

Copy `.env` and fill in your values:

```env
DATABASE_URL="postgresql://user:password@host:5432/texas_sunny_rentals"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="https://your-domain.com"
ADMIN_EMAIL="admin@texassunnyrentals.com"
ADMIN_PASSWORD="yourSecurePassword"
```

### 2. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 3. Seed the database (creates admin user + sample data)

```bash
npm run db:seed
```

### 4. Run locally

```bash
npm run dev
```

### 5. Deploy to Railway

- Connect this repo to a Railway project
- Set environment variables in Railway dashboard
- Railway will auto-run `prisma migrate deploy && npm start`

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero + featured items |
| `/rentals` | All items (filterable by category) |
| `/rentals/[slug]` | Item detail page |
| `/contact` | Contact form |
| `/admin` | Admin dashboard (login required) |
| `/admin/items` | Manage rental items |
| `/admin/categories` | Manage categories |
| `/admin/inquiries` | View contact submissions |

## Admin Login

Navigate to `/admin/login` and sign in with the credentials in your `.env`.

## Customization

- **Branding:** Edit `components/Navbar.tsx` and `components/Footer.tsx`
- **Phone/Email:** Search for `(555) 555-5555` and replace throughout
- **Colors:** Yellow/orange theme in Tailwind — easy to swap in `tailwind.config.ts`
- **Hero text:** Edit `app/(public)/page.tsx`
