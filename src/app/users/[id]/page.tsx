import { User } from '@/@types/User';
import { CommentComponent, PostComponent } from '@/components';
import { api } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `Recados de ${user?.name}` };
}

export default async function UserPage({ params }: Props) {
  const fetchUser = await fetch(`${api}/users/${params.id}`);
  const user: User = await fetchUser.json();

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:divide-x divide-opacity-50 divide-violet-light100 ">
        <div className="flex flex-col gap-6">
          <span className="text-xl "> Recados de {user.name}</span>
          <section className="flex flex-col gap-3">
            {user.posts?.map((post) => (
              <PostComponent key={post.id} {...post} />
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-6 ">
          <span className="text-xl ml-10"> Comentários de {user.name}</span>
          <section className="flex flex-col gap-3 lg:ml-10">
            {user.comments?.map((comment) => (
              <Link key={comment.id} href={`/post/${comment.postId}`}>
                <CommentComponent key={comment.id} {...comment} />
              </Link>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
