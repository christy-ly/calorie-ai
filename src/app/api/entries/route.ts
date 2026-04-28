import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function todayBounds() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export async function GET() {
  const { start, end } = todayBounds();
  const entries = await prisma.foodEntry.findMany({
    where: { loggedAt: { gte: start, lte: end } },
    include: { food: true },
    orderBy: { loggedAt: 'desc' },
  });

  const totals = entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.food.calories * e.quantity,
      protein: acc.protein + e.food.protein * e.quantity,
      carbs: acc.carbs + e.food.carbs * e.quantity,
      fat: acc.fat + e.food.fat * e.quantity,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return NextResponse.json({ entries, totals });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { foodId, quantity = 1 } = body;

  if (!foodId || typeof foodId !== 'number') {
    return NextResponse.json({ error: 'foodId is required' }, { status: 400 });
  }

  const food = await prisma.food.findUnique({ where: { id: foodId } });
  if (!food) {
    return NextResponse.json({ error: 'Food not found' }, { status: 404 });
  }

  const entry = await prisma.foodEntry.create({
    data: { foodId, quantity },
    include: { food: true },
  });

  return NextResponse.json({ entry }, { status: 201 });
}
