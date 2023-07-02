import { api } from '@/lib/api';
import { Post } from '@/@types/Post';
import { PostComponent, PostForm } from '@/components';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const fetchPosts = await fetch(`${api}/content`);
  const posts: Post[] = await fetchPosts.json();

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <PostForm />

      <h1 className="text-2xl">Mural de recados</h1>

      <section className="flex flex-col gap-3">
        {posts.map((post) => (
          <PostComponent key={post.id} {...post} />
        ))}
      </section>
    </main>
  );
}
