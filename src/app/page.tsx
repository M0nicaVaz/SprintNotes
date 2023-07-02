import { AuthCheck, PostForm, RemovePost, UserCard } from '@/components';
import { formatDate } from '@/utils';
import { api } from '@/lib/api';
import { Post } from '@/@types/Post';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts: Post[] = await fetch(`${api}/content`).then((res) => res.json());

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <PostForm />

      <hr className="border-gray-400 border-b-0" />

      <h1 className="text-2xl">Mural de recados</h1>

      {posts.map((post) => (
        <div className="flex flex-col gap-1">
          <div
            key={post.id}
            className="bg-gray-100 rounded items-center p-6 text-gray-500 font-semibold flex gap-10 justify-between"
          >
            <span>{post.description}</span>
            <UserCard {...post.author} />
          </div>

          <div className="flex self-end items-center">
            <span className="text-xxs ">
              {formatDate(post.createdAt, 'short')}
            </span>

            <AuthCheck>
              <RemovePost postId={post.id} />
            </AuthCheck>
          </div>
        </div>
      ))}
    </main>
  );
}
