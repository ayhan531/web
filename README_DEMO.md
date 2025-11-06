# Demo Finans Site (MVP)

This workspace contains a small scaffold to reproduce the structure and key functionality of the referenced Turkish finance sites (homepage banners, news, market mock data, and a minimal admin panel).

Important: This project intentionally uses original, placeholder assets and content. Do not copy trademarked logos or copyrighted content from the target sites without permission.

## What I added

- Prisma schema (SQLite) at `prisma/schema.prisma`
- Prisma client helper at `prisma/prisma.ts`
- Seed script `prisma/seed.js` (creates admin user and sample data)
- API routes:
  - `POST /api/auth/login` — login, returns JWT
  - `GET /api/banners`, `POST /api/banners` — list and create banners (POST protected by JWT)
  - `GET /api/news` — list news
  - `GET /api/markets` — list market entries
- Pages:
  - `/` — server-rendered homepage reading from Prisma
  - `/admin/login` — admin login page
  - `/admin` — simple admin UI to list and create banners

## Quick start (macOS / zsh)

1. Install dependencies:

```bash
cd /Users/shift/Desktop/web/web-app
npm install @prisma/client prisma bcryptjs jsonwebtoken
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Seed the database (creates `prisma/dev.db`):

```bash
npm run seed
```

Admin credentials created by seed: `admin@local` / `Admin123!`

4. Run development server:

```bash
npm run dev
```

5. Open http://localhost:3000/ and http://localhost:3000/admin/login to log in.

## Notes & next steps

- The scaffold uses SQLite for fast local development. For production use switch the datasource in `prisma/schema.prisma` to PostgreSQL and update the `DATABASE_URL`.
- Currently auth is JWT-based using `ADMIN_JWT_SECRET` (env). For production use a more complete auth (NextAuth, sessions, RBAC).
- Market data is seeded mock data. Replace with a real provider/websocket feed as needed.
- I kept styles minimal and used existing `globals.css`. I can integrate Tailwind quickly if you prefer.

If you want, I can now:
- Install the missing dependencies and run `prisma generate` and `npm run seed` for you locally (I can run terminal commands),
- Or switch DB to PostgreSQL and wire up a deployment-ready config.

Which would you like me to do next? (I recommend: run `npm install` + `npx prisma generate` + `npm run seed` then start dev server.)
