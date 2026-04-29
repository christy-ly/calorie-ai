# Calorie AI

A single-page calorie and macro tracking app built with Next.js 14, TypeScript, Tailwind CSS, and SQLite via Prisma.

## What It Does

- Search 25 pre-loaded foods and add them to today's log with one click
- Quick-add grid shows the 12 most common foods for fast logging
- Daily calorie total and macro progress bars (protein, carbs, fat) always visible in the sticky header
- Food log persists across page refreshes via SQLite

## Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite via Prisma v7 |
| DB Adapter | `@prisma/adapter-better-sqlite3` |
| AI | Google Gemini via `@google/genai` |
| Runtime | Node.js 24 |

## Folder Structure

```
calorie-ai/
├── prisma/
│   ├── schema.prisma        # Food and FoodEntry models
│   ├── seed.ts              # Upserts 25 foods into DB
│   └── dev.db               # SQLite file (gitignored)
├── src/
│   ├── app/
│   │   ├── page.tsx         # Main SPA page (client component)
│   │   ├── layout.tsx       # Root layout
│   │   └── api/
│   │       ├── foods/       # GET ?q= — search foods
│   │       ├── entries/     # GET today's log, POST add, DELETE remove
│   │       └── ai/
│   │           ├── nutrition/ # POST — text-based AI nutrition estimate
│   │           ├── image/     # POST — image-based AI nutrition estimate
│   │           └── log/       # POST — upsert AI food + create FoodEntry
│   ├── components/
│   │   ├── CalorieSummary   # Sticky header with calorie total + macro bars
│   │   ├── SearchBar        # Debounced search with keyboard nav
│   │   ├── QuickAddGrid     # One-click 12-food grid
│   │   ├── FoodCard         # Reusable food tile (grid + compact)
│   │   ├── DailyLog         # Today's entries list
│   │   ├── LogEntry         # Single log row with delete
│   │   └── MacroBadge       # Colored P/C/F pill
│   ├── hooks/
│   │   └── useCalorieLog    # All state + API calls
│   ├── components/
│   │   ├── ...              # existing components unchanged
│   │   ├── AiTextSearch     # Text input → AI nutrition → add to log
│   │   └── AiImageSearch    # Image upload → preview → confirm items → add to log
│   ├── lib/
│   │   ├── prisma.ts        # Singleton PrismaClient with SQLite adapter
│   │   ├── gemini.ts        # Gemini client + estimateFromText/estimateFromImage helpers
│   │   ├── foods.ts         # 25-food FOODS constant (seed source of truth)
│   │   └── types.ts         # Shared interfaces (incl. NutritionEstimate)
│   └── generated/prisma/    # Prisma v7 generated client (gitignore-able)
├── docs/
│   └── 2026-04-28-initial-build.md
├── CLAUDE.md
└── prisma.config.ts         # Prisma v7 config (datasource URL, seed command)
```

## Database Commands

```bash
# Re-seed foods (safe — uses upsert)
npx prisma db seed

# Open database GUI
npx prisma studio

# Reset everything and reseed
rm prisma/dev.db
sqlite3 prisma/dev.db < prisma/migrations/20260428161333_init/migration.sql
npx prisma db seed
```

## Adding a New Food

Edit `src/lib/foods.ts` — add an entry to the `FOODS` array:

```ts
{ name: 'Your Food', calories: 100, protein: 5, carbs: 10, fat: 3, servingSize: '1 serving (100g)' }
```

Then reseed: `npx prisma db seed`

## Adding an API Route

New routes go in `src/app/api/`. Import `prisma` from `@/lib/prisma`. Use `NextRequest`/`NextResponse` from `next/server`.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite file path — set to `file:./dev.db` by Prisma init |
| `GEMINI_API_KEY` | Google Gemini API key — used by `/api/ai/nutrition` and `/api/ai/image` |

## What's Next

- Custom calorie goal setting
- Weekly summary view
- Custom food entry (user-defined foods)
- Serving size multiplier (0.5x, 2x, etc.) via the `quantity` field already in schema
