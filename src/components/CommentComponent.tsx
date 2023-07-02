import { UserCard } from './UserCard';
import { formatDate } from '@/utils';
import { Comment } from '@/@types/Post';
import { RemoveComment } from './RemoveComment';
import { AuthCheck } from './AuthCheck';

export function CommentComponent(comment: Comment) {
  return (
    <div key={comment.id} className="flex flex-col gap-1">
      <div className="bg-gray-400 rounded items-center p-6 text-gray-100 font-semibold flex gap-10 justify-between">
        <div className="max-h-auto flex-1 flex flex-col justify-between gap-2">
          <p className="w-full text-white-100 font-normal">
            {comment.description}
          </p>
        </div>

        <UserCard {...comment.author} />
      </div>

      <div className="flex self-end items-center">
        <span className="text-xxs ">
          {formatDate(comment.createdAt, 'short')}
        </span>

        <AuthCheck>
          <RemoveComment commentId={comment.id} />
        </AuthCheck>
      </div>
    </div>
  );
}
