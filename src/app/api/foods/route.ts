import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.toLowerCase().trim();
  const all = await prisma.food.findMany({ orderBy: { name: 'asc' } });
  const foods = q ? all.filter((f) => f.name.toLowerCase().includes(q)) : all;
  return NextResponse.json({ foods });
}
