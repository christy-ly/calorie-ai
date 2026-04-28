Context: 
- I’m starting with an empty project directory that only contains a .env and .gitignore. 
- I want to build a calorie tracking web application called “Calorie AI” from the ground up.

Instruction: 
- Begin by designing the system architecture: define components, data structures, and overall UI flow.
- After planning, implement the entire application. 
- Use Next.js with TypeScript and Tailwind CSS. 
- Store the food log in a local database to ensure data persists after page refresh.
- Once the application is complete and working, create documentation. 
- Don't ask any questions — just plan it, build it, and document it.

Input:
- A simple single-page application (no authentication or user accounts)
- A search bar for food items, with a list of 20+ common foods (e.g., chicken, rice, apple) for quick selection
- Each food item must include: calories, protein, carbohydrates, fat, and serving size
- A daily food log displaying consumed items, with a total calorie count shown at the top
- The app should run using npm run dev

Output:
- A written plan of the architecture
- A fully working application available at localhost:3000
- A CLAUDE.md file under 200 lines describing the project such as project overview, how to run the app, tech stack, folder structure and future improvements
- A docs/ folder with a decision log file named with today's date (e.g., docs/2026-04-28-initial-build.md) recording what was built, what technical choices were made and why.
- Run the app for user preview at the end.