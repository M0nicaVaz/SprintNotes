import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const post = await prisma.post.findFirst({
    where: { id: Number(id) },
    include: {
      author: true,
      categories: true,
      comments: {
        include: {
          author: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  await prisma.post.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ id });
}
