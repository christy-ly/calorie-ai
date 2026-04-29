import { NextRequest, NextResponse } from "next/server";
import { estimateFromText } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { description } = body;
  if (!description || typeof description !== "string") {
    return NextResponse.json({ error: "description is required" }, { status: 400 });
  }
  try {
    const estimate = await estimateFromText(description.trim());
    return NextResponse.json(estimate);
  } catch {
    return NextResponse.json({ error: "Failed to estimate nutrition" }, { status: 500 });
  }
}
