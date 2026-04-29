# 2026-04-29 — Gemini API Frontend Integration

## What Was Implemented

The frontend now supports three methods for adding food to the daily log:

| Method | How it works |
|--------|-------------|
| **Search** | Existing database search — unchanged |
| **AI Text** | User describes a meal; Gemini returns estimated items; user adds individually |
| **AI Photo** | User uploads a photo; Gemini identifies food items; user confirms which to log |

All three methods are accessible via a tab switcher at the top of the left column. The Quick Add grid remains always visible below the tabs.

## New Files

- `src/app/api/ai/log/route.ts` — `POST /api/ai/log` — upserts a `Food` record by name and creates a `FoodEntry`
- `src/components/AiTextSearch.tsx` — text input form, loading spinner, per-item add buttons, error banner
- `src/components/AiImageSearch.tsx` — drag-to-upload zone, image preview with remove button, loading spinner, checkbox confirmation list, bulk "Add N items" button

## Modified Files

- `src/hooks/useCalorieLog.ts` — added `addAiEntry(item: NutritionItem)` which calls `POST /api/ai/log` then refreshes the entry list
- `src/app/page.tsx` — added tab state, renders `AiTextSearch` / `AiImageSearch` based on active tab
- `CLAUDE.md` — updated folder structure and roadmap

## Key Decisions

### Dedicated `/api/ai/log` endpoint
Rather than extending `POST /api/entries` to accept raw nutrition data, a separate route keeps the existing entries API unchanged and makes the AI persistence path explicit. The route upserts `Food` by name (the `@unique` constraint on `Food.name` is the key) then creates a `FoodEntry`. AI-generated foods become first-class `Food` records in the DB, so they appear in future searches.

### Upsert by name, update nutrition on re-log
If the user logs "Smoked Beef" twice (once via text, once via photo), the second call updates the food's nutrition to the latest Gemini estimate and creates a new entry. This keeps the DB consistent without duplicating food records.

### Tab switcher, not separate sections
Putting the three input modes behind a tab keeps the left column compact. The Quick Add grid always shows beneath the active tab since it's the fastest path for common foods.

### Image preview before analysis
The photo tab shows the image before calling Gemini so the user can confirm they selected the right file and remove/replace it without burning an API call.

### Checkbox confirmation for image results
When multiple items are detected in a photo, all are pre-selected. The user can deselect any items before committing. Clicking "Add N items" logs them sequentially so each triggers a DB write and the daily log updates correctly.

### `Array.from(selected)` for Set iteration
TypeScript without an explicit `target` defaults to ES5, which doesn't support `for...of` over `Set`. Using `Array.from(selected)` avoids the need to add `downlevelIteration` to tsconfig.

### `capture="environment"` on the file input
On mobile, this opens the rear-facing camera directly — the natural choice for photographing food on a table.
