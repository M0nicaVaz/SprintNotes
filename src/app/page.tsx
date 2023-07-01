import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import { PostForm, UserCard } from '@/components';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // if (!session) redirect('/api/auth/signin');

  const posts = await fetch(`${api}/content`).then((res) => res.json());

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <PostForm />

      <hr className="border-gray-400 border-b-0" />

      <h1 className="text-2xl">Mural de recados</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          className=" bg-violet-light100 rounded items-center p-6 text-gray-500 font-semibold flex gap-10 justify-between"
        >
          <span>{post.description}</span>
          <UserCard {...post.author} />
        </div>
      ))}
    </main>
  );
}
