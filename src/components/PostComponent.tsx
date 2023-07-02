import { Post } from '@/@types/Post';
import { Category } from './Category';
import { UserCard } from './UserCard';
import { formatDate } from '@/utils';
import { AuthCheck } from './AuthCheck';
import { RemovePost } from './RemovePost';

export function PostComponent(post: Post) {
  return (
    <div key={post.id} className="flex flex-col gap-1">
      <div className="bg-gray-300 rounded items-center p-6 text-gray-100 font-semibold flex gap-10 justify-between">
        <div className="min-h-[90px] max-h-auto flex-1 flex flex-col justify-between gap-2">
          <p className="w-full text-white-100 font-normal">
            {post.description}
          </p>

          <div className="flex gap-2">
            {post.categories?.map((category) => (
              <Category name={category.name} key={category.id} />
            ))}
          </div>
        </div>

        <UserCard {...post.author} />
      </div>

      <div className="flex self-end items-center">
        <span className="text-xxs ">{formatDate(post.createdAt, 'short')}</span>

        <AuthCheck>
          <RemovePost postId={post.id} />
        </AuthCheck>
      </div>
    </div>
  );
}
