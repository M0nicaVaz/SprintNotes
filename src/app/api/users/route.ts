import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: { posts: true, comments: true },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
  }
}
