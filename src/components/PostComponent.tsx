import { Post } from '@/@types/Post';
import { Category } from './Category';
import { UserCard } from './UserCard';
import { formatDate } from '@/utils';
import { AuthCheck } from './AuthCheck';
import { RemovePost } from './RemovePost';
import Link from 'next/link';

export function PostComponent(post: Post) {
  return (
    <div key={post.id} className="flex flex-col gap-1">
      <div className="bg-gray-300 rounded items-center p-6 text-gray-100 font-semibold flex gap-10 justify-between">
        <div className="max-h-auto flex-1 flex flex-col justify-between gap-2">
          <div className="flex gap-2 flex-wrap">
            {post.categories?.map((category) => (
              <Category name={category.name} key={category.id} />
            ))}
          </div>

          <p className="w-full text-white-100 font-normal">
            {post.description}
          </p>

          <Link href={`/post/${post.id}`}>
            <span className="font-light text-xs hover:text-violet-light100">
              Ver {post['_count']?.comments} comentário(s)
            </span>
          </Link>
        </div>

        <UserCard {...post.author} />
      </div>

      <div className="flex self-end items-center">
        <span className="text-xxs ">{formatDate(post.createdAt, 'short')}</span>

        <AuthCheck>
          <RemovePost {...post} />
        </AuthCheck>
      </div>
    </div>
  );
}
