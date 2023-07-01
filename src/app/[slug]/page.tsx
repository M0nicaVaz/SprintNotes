import { Post } from '@/@types/Post';
import { api } from '../api/api';

export const dynamic = 'force-dynamic'; //always fetch latest data
// export const revalidate = 1200;

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const posts: Post[] = await fetch(`${api}/content`).then((res) => res.json());
  const post = posts.find((post) => post.slug === params.slug);

  return (
    <div className={``}>
      <h1>{post?.title} </h1>
      <p>{post?.description}</p>
    </div>
  );
}
