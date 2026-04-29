# 2026-04-28 — Gemini API Integration

## What Was Implemented

Two new backend API routes that use Google Gemini (`gemini-2.5-flash-lite`) to estimate nutrition data:

| Route | Method | Input | Output |
|-------|--------|-------|--------|
| `/api/ai/nutrition` | POST | `{ "description": "smoked beef with salad" }` | `NutritionEstimate` JSON |
| `/api/ai/image` | POST | `multipart/form-data` with `image` field (JPEG/PNG/WEBP/GIF) | `NutritionEstimate` JSON |

Both routes return the same `NutritionEstimate` shape:

```json
{
  "description": "Smoked beef brisket with mixed green salad",
  "items": [
    { "name": "Smoked Beef Brisket", "calories": 320, "protein": 35, "carbs": 0, "fat": 18, "servingSize": "150g" },
    { "name": "Mixed Green Salad", "calories": 25, "protein": 2, "carbs": 4, "fat": 0, "servingSize": "1 cup (85g)" }
  ],
  "totals": { "calories": 345, "protein": 37, "carbs": 4, "fat": 18 }
}
```

## New Files

- `src/lib/gemini.ts` — Singleton `GoogleGenAI` client, `estimateFromText`, `estimateFromImage`, shared JSON parser
- `src/app/api/ai/nutrition/route.ts` — Text-based lookup route
- `src/app/api/ai/image/route.ts` — Image-based lookup route

## Modified Files

- `src/lib/types.ts` — Added `NutritionItem` and `NutritionEstimate` interfaces
- `CLAUDE.md` — Updated tech stack, folder structure, env vars, and roadmap
- `package.json` — Added `@google/genai` dependency

## Key Decisions

### `@google/genai` over `@google/generative-ai`
The `@google/genai` package (released 2025) is the current unified Google GenAI JS SDK, replacing the older `@google/generative-ai`. It has a cleaner API and is the recommended path for new integrations.

### JSON schema embedded in the prompt
Rather than using Gemini's structured output / function-calling features, the JSON schema is embedded directly in the system prompt. This approach is simpler, requires no SDK-specific schema wiring, and still produces reliably parseable output from `gemini-2.5-flash-lite`. The parser strips any accidental markdown fences before calling `JSON.parse`.

### Inline base64 for images
Images are converted to base64 and sent as `inlineData` to Gemini. This avoids any cloud storage dependency and works entirely within the local dev environment. For production with large images, a Files API upload would be preferable.

### Single shared `gemini.ts` module
Both route handlers import from `src/lib/gemini.ts`. This keeps the Gemini client instantiation and prompt logic in one place, making it easy to swap models or tweak the prompt without touching the route files.

### No frontend changes
The routes are fully functional and testable via `curl` or any HTTP client. Frontend integration (e.g., a search mode toggle or image upload UI) is a separate task.
