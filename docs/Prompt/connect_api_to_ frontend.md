Context:
- My calorie tracker now includes two fully functional backend API routes powered by the Gemini API: one for text-based food queries and one for image uploads. 
- The frontend, however, still relies on hardcoded food data.

Instruction:
- Integrate the Gemini-powered API routes into the frontend so users can add food using three different methods. 
- Do not ask any questions, just implement the full functionality.

Input:
- Quick-add: Continue supporting the existing list of common foods (no changes needed)
- Text input: Provide a text field where users can describe their meal in plain English, and use AI to retrieve nutrition data
- Photo upload: Add an upload option that allows users to take or upload a photo of their meal, which AI will analyze to identify food items and estimate nutrition
- For photo uploads: Display a preview of the uploaded image. If multiple food items are detected, present all identified items for user confirmation before adding them to the log.
- Ensure all added food entries are saved to the database
- Display a loading spinner while waiting for AI responses
- Show a clear and user-friendly error message if any request fails

Output:
- The application supports three methods for adding food: quick-add, text-based AI search, and photo-based AI search
- All food entries are persisted in the database
- Loading states and error handling are properly implemented
- CLAUDE.md is updated
- A new dated entry is added in /docs documenting what was implemented, key decisions made, and the reasoning behind them