import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: context.params.id,
      },
      include: {
        comments: {
          include: {
            Post: true,
            author: true,
          },
        },
        posts: {
          include: {
            author: true,
            categories: true,
            _count: {
              select: { comments: true },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
  }
}
