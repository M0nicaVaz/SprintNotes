import { Post } from '@/@types/Post';
import { api } from '../api/api';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; //always fetch latest data
// export const revalidate = 1200;

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const posts: Post[] = await fetch(`${api}/content`).then((res) => res.json());
  const post = posts.find((post) => post.slug === params.slug);
  const session = await getServerSession();

  if (!session) redirect('/api/auth/signin');

  return (
    <div className={``}>
      <h1>{post?.title} </h1>
      <p>{post?.description}</p>
    </div>
  );
}
