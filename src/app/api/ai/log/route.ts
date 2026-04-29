import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, calories, protein, carbs, fat, servingSize, quantity = 1 } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }

  const food = await prisma.food.upsert({
    where: { name },
    create: {
      name,
      calories: Math.round(Number(calories)),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      servingSize: servingSize || '1 serving',
    },
    update: {
      calories: Math.round(Number(calories)),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      servingSize: servingSize || '1 serving',
    },
  });

  const entry = await prisma.foodEntry.create({
    data: { foodId: food.id, quantity },
    include: { food: true },
  });

  return NextResponse.json({ entry }, { status: 201 });
}
