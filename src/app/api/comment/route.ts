import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { description, postId } = body;

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });
    const currentUserId = user?.id;

    const res = await prisma.comment.create({
      data: {
        description,
        Post: { connect: { id: Number(postId) } },
        author: { connect: { id: currentUserId } },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
