import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function todayBounds() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export async function GET() {
  const { start, end } = todayBounds();

  const { data: entries, error } = await supabase
    .from('FoodEntry')
    .select('*, food:Food(*)')
    .gte('loggedAt', start.toISOString())
    .lte('loggedAt', end.toISOString())
    .order('loggedAt', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const totals = (entries ?? []).reduce(
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

  const { data: food, error: foodError } = await supabase
    .from('Food')
    .select('id')
    .eq('id', foodId)
    .single();

  if (foodError || !food) {
    return NextResponse.json({ error: 'Food not found' }, { status: 404 });
  }

  const { data: entry, error } = await supabase
    .from('FoodEntry')
    .insert({ foodId, quantity })
    .select('*, food:Food(*)')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ entry }, { status: 201 });
}
