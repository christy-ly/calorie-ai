import { GoogleGenAI } from "@google/genai";
import type { NutritionEstimate } from "./types";

const genai = new GoogleGenAI({ apiKey: process.env["GEMINI_API_KEY"]! });

const MODEL = "gemini-2.5-flash-lite";

const SYSTEM_PROMPT = `You are a nutrition expert. Given a food description or image, identify all food items and estimate their nutritional content.
Return ONLY valid JSON (no markdown fences) matching this exact schema:
{
  "description": "<brief summary of what was identified>",
  "items": [
    { "name": "...", "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "servingSize": "..." }
  ],
  "totals": { "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }
}
All numeric values are numbers (not strings). Macros are in grams.`;

export async function estimateFromText(description: string): Promise<NutritionEstimate> {
  const response = await genai.models.generateContent({
    model: MODEL,
    contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\nFood: ${description}` }] }],
  });
  return parseGeminiResponse(response.text ?? "");
}

export async function estimateFromImage(imageData: string, mimeType: string): Promise<NutritionEstimate> {
  const response = await genai.models.generateContent({
    model: MODEL,
    contents: [{
      role: "user",
      parts: [
        { text: `${SYSTEM_PROMPT}\n\nAnalyze the food in this image:` },
        { inlineData: { data: imageData, mimeType } },
      ],
    }],
  });
  return parseGeminiResponse(response.text ?? "");
}

function parseGeminiResponse(text: string): NutritionEstimate {
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned) as NutritionEstimate;
}
