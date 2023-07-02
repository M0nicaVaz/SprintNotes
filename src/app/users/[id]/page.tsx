import { User } from '@/@types/User';
import { PostComponent } from '@/components';
import { api } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Image from 'next/image';

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

export default async function UserProfile({ params }: Props) {
  const fetchUser = await fetch(`${api}/users/${params.id}`);
  const user: User = await fetchUser.json();

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <h1 className="text-2xl"> Recados de {user.name}</h1>

      <section className="flex flex-col gap-3">
        {user.posts?.map((post) => (
          <PostComponent key={post.id} {...post} />
        ))}
      </section>
    </main>
  );
}
