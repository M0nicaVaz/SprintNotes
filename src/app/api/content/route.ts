import { Post } from '@/@types/Post';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const posts: Post[] = [
  {
    id: 1,
    title: 'Medclub',
    slug: 'medclub',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
  {
    id: 2,
    title: 'EMR',
    slug: 'emr',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
  {
    id: 3,
    title: 'MedTest',
    slug: 'medtest',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
];

export async function GET() {
  const session = await getServerSession();
  if (session) return NextResponse.json(posts);

  return NextResponse.redirect('/api/auth/signin');
}
