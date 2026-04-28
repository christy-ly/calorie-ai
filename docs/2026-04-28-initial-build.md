# Initial Build — 2026-04-28

## What Was Built

A full-stack calorie tracking SPA starting from an empty directory. Covers:
- Next.js 14 project scaffold
- Prisma v7 with SQLite for data persistence
- REST API: food search, log entry CRUD
- 7 React components composing a complete UI
- 25 pre-seeded common foods with accurate macros

## Technical Choices and Why

### Next.js 14 App Router
Chosen for its colocation of API routes (`route.ts`) alongside page components, making it simple to build a full-stack app with a single `npm run dev`. The App Router also enables future React Server Components for SSR.

### SQLite via Prisma (over localStorage)
localStorage was the simplest option but has three issues: (1) data doesn't survive clearing browser storage, (2) it's inaccessible across browsers/devices, (3) can't be inspected easily during development. SQLite gives us a real relational database, inspectable with `npx prisma studio`, and trivially upgradeable to Postgres by changing `provider` in `schema.prisma`.

### Prisma v7 with `prisma-client` generator
Prisma v7 ships a new `prisma-client` generator (replaces `prisma-client-js`) that uses WebAssembly instead of a native query engine binary. Requires a driver adapter for the database connection. We used `@prisma/adapter-better-sqlite3` to bridge Prisma v7's adapter interface with the `better-sqlite3` Node.js SQLite driver.

**Non-obvious issue encountered:** `prisma migrate dev` in Prisma v7 creates migration SQL files correctly but doesn't auto-apply them to the SQLite file when using the new generator + adapter combination. Migration was applied directly via `sqlite3 dev.db < migration.sql` as a workaround.

### `@prisma/adapter-better-sqlite3`
The new `prisma-client` generator requires an explicit driver adapter; it no longer reads a `DATABASE_URL` env variable automatically. The adapter connects to an absolute file path resolved from `process.cwd()` to ensure consistency between the Next.js dev server and direct script execution.

### In-memory FOODS + DB-fetched IDs for search
Food search (`/api/foods`) could have been a pure in-memory filter (25 items — microseconds to scan). However, the add-entry flow requires the DB primary key (`foodId`) to create a `FoodEntry`. Fetching from the DB ensures foods always have their correct auto-incremented IDs. The overhead is negligible at 25 rows.

### `useCalorieLog` Client Hook (not Server Actions)
One-click add/delete needs instant UI response. A single React hook owning all state — entries, totals, allFoods — is simpler than splitting between RSC and Server Actions for a single-user page. The hook fetches entries and foods in parallel on mount via `Promise.all`.

### Calorie Goal: 2000 kcal hardcoded
Hardcoded as a prop default in `CalorieSummary`. A future "settings" feature can replace this with a user preference stored in the DB without touching the component contract.

### `FoodEntry.loggedAt` as DateTime (not date string)
Storing a full timestamp (not just `YYYY-MM-DD`) allows filtering by day range (`>= today 00:00`, `<= today 23:59`). This keeps future week/meal-timing views possible without a schema migration.

### `quantity` field on FoodEntry (default 1.0)
Added to the schema now even though the UI only adds whole servings. The `quantity` multiplier already flows through the totals calculation (`food.calories * entry.quantity`). A serving-size selector can be added to the UI without any backend changes.

## File Creation Order

1. Next.js scaffold (`create-next-app`) → merged into existing directory
2. Prisma schema + migration + seed
3. `src/lib/types.ts`, `src/lib/foods.ts`, `src/lib/prisma.ts`
4. API routes: `/api/foods`, `/api/entries`, `/api/entries/[id]`
5. `useCalorieLog` hook
6. Leaf components: `MacroBadge` → `FoodCard` → `LogEntry` → `CalorieSummary`
7. Container components: `DailyLog` → `QuickAddGrid` → `SearchBar`
8. `src/app/page.tsx` wired everything together
9. `CLAUDE.md` + this file

## Known Limitations / Future Work

- No serving size selection — always adds 1 serving (DB schema supports it via `quantity`)
- No day navigation — only shows today's log
- No user-defined foods — only the pre-seeded 25
- Gemini API key in `.env` is unused — planned for AI-powered food search
- `prisma migrate dev` doesn't auto-apply to SQLite with driver adapter — must apply migration SQL manually after schema changes (or automate in a script)
