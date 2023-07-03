import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ id });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { description } = body;

    await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
      },
    });

    return NextResponse.json({ id });
  } catch (error) {
    console.log(error);
  }
}
