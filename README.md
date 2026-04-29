<h3 align="center">🥗 Calorie AI – An AI Powered Applicaiton</h3>


## 💬 Overview
This project is a modern frontend web application built using Claude Code and the Gemini API. The app allows users to track daily calorie intake through a clean, responsive interface, combining AI workflows + frontend engineering best practices.

## 🛠 Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js API routes
- **AI-assisted development:** Claude Code 
- **AI-powered data & features:** Gemini API

## ✨ Features
This project demonstrates how developers can combine:
- AI-assisted coding using Claude Code
- Structured workflows and frontend best practices through clear prompts and step-by-step execution
- AI-powered APIs such as the Gemini API for intelligent data processing
to build scalable, maintainable applications more efficiently.
  
## 🛠 Development Pharse
### Phase 1 — Build Core Application
- Set up project structure with Next.js, TypeScript, and Tailwind CSS
- Implement basic UI for logging meals and viewing calorie data
- Create local database schema and connect data flow
- Add hardcoded food list for initial functionality

### Phase 2 — API Integration
- Implement text-based search route 
- Implement image upload route for AI-based food recognition
- Connect frontend to backend API routes
- Handle loading states and error feedback for AI responses

### Phase 3 — Improve & Iterate

### Phase 4 — Frondend Design

## 📁 Folder Structure
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

## 📽️View Demo
Check out the live demo of this project here: [View Demo](https://christy-demo-calorie-ai.netlify.app/)


## 📚 References
- **Claude Code** – [Official Website](https://claude.ai/)
- **Gemini API** – [Official Website](https://ai.google.dev/)






