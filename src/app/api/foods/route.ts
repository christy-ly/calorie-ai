import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.toLowerCase().trim();

  const { data, error } = await supabase
    .from('Food')
    .select('*')
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const foods = q ? data.filter((f) => f.name.toLowerCase().includes(q)) : data;
  return NextResponse.json({ foods });
}
