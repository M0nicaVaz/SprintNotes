import { Post } from '@/@types/Post';
import { User } from '@/@types/User';
import { CommentForm, PostComponent, CommentComponent } from '@/components';
import { api } from '@/lib/api';
import { prisma } from '@/lib/prisma';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: Props) {
  const fetchUser = await fetch(`${api}/content/${params.id}`);
  const post: Post = await fetchUser.json();

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <CommentForm />
      <hr className="border-gray-400 border-b-0" />
      <section className="flex flex-col gap-3">
        <PostComponent {...post} />

        {post.comments?.map((comment) => (
          <CommentComponent {...comment} key={comment.id} />
        ))}
      </section>
    </main>
  );
}
