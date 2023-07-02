import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { name: string } }
) {
  const { name } = context.params;

  const posts = await prisma.post.findMany({
    where: {
      categories: {
        some: {
          name,
        },
      },
    },
    include: {
      author: true,
      categories: true,
      _count: {
        select: { comments: true },
      },
    },
  });

  return NextResponse.json(posts);
}
