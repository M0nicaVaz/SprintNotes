import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const user = await prisma.user.findFirst({
    where: {
      id: context.params.id,
    },
    include: {
      posts: {
        include: {
          author: true,
          categories: true,
        },
      },
    },
  });

  return NextResponse.json(user);
}
