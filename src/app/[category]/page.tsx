import { Post } from '@/@types/Post';
import { api } from '../../lib/api';
import { Metadata } from 'next';
import { PostComponent } from '@/components';

export const dynamic = 'force-dynamic';

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Mural de recados - ${params.category}` };
}

export default async function PostPage({ params }: Props) {
  const fetchPosts = await fetch(`${api}/category/${params.category}`);
  const posts: Post[] = await fetchPosts.json();

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <h1 className="text-2xl">Mural de recados - {params.category} </h1>

      <section className="flex flex-col gap-3">
        {posts.map((post) => (
          <PostComponent key={post.id} {...post} />
        ))}
      </section>
    </main>
  );
}
