import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { Category } from '@/@types/Post';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        categories: true,
        _count: {
          select: { comments: true },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { description, categories } = body;

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });
    const currentUserId = user?.id;

    const res = await prisma.post.create({
      data: {
        description,
        categories: {
          connectOrCreate: categories.map((category: Category) => {
            return {
              where: { name: category },
              create: { name: category },
            };
          }),
        },
        author: {
          connect: { id: currentUserId },
        },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
  }
}
