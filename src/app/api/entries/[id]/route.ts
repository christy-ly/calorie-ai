import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const { data: existing, error: findError } = await supabase
    .from('FoodEntry')
    .select('id')
    .eq('id', id)
    .single();

  if (findError || !existing) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  const { error } = await supabase.from('FoodEntry').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
