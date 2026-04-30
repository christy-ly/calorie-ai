import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, calories, protein, carbs, fat, servingSize, quantity = 1 } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }

  const { data: food, error: upsertError } = await supabase
    .from('Food')
    .upsert(
      {
        name,
        calories: Math.round(Number(calories)),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        servingSize: servingSize || '1 serving',
      },
      { onConflict: 'name' }
    )
    .select()
    .single();

  if (upsertError || !food) {
    return NextResponse.json({ error: upsertError?.message ?? 'Upsert failed' }, { status: 500 });
  }

  const { data: entry, error: entryError } = await supabase
    .from('FoodEntry')
    .insert({ foodId: food.id, quantity })
    .select('*, food:Food(*)')
    .single();

  if (entryError) return NextResponse.json({ error: entryError.message }, { status: 500 });

  return NextResponse.json({ entry }, { status: 201 });
}
