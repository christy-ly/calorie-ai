import { NextRequest, NextResponse } from "next/server";
import { estimateFromImage } from "@/lib/gemini";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("image") as File | null;
  if (!file) {
    return NextResponse.json({ error: "image file is required" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "unsupported image type" }, { status: 400 });
  }
  try {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const estimate = await estimateFromImage(base64, file.type);
    return NextResponse.json(estimate);
  } catch {
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}
