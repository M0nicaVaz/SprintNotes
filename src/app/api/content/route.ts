import { Post } from '@/@types/Post';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

const posts: Post[] = [
  {
    id: 1,
    author: 'John Doe',
    category: 'medclub',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
  {
    id: 2,
    author: 'John Doe',
    category: 'emr',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
  {
    id: 3,
    author: 'John Doe',
    category: 'medtest',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
];

export async function GET() {
  const session = await getServerSession();

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      categories: true,
    },
  });

  console.log(posts);

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { description, category } = body;

  const session = await getServerSession(authOptions);
  const currentUserId = await prisma.user
    .findUnique({ where: { email: session?.user?.email! } })
    .then((user) => user?.id!);

  const res = await prisma.post.create({
    data: {
      description,
      categories: {
        connectOrCreate: [
          {
            where: { name: category },
            create: { name: category },
          },
        ],
      },
      author: { connect: { id: currentUserId } },
    },
  });

  return NextResponse.json(res);
}
