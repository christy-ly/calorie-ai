import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const existing = await prisma.foodEntry.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  await prisma.foodEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
