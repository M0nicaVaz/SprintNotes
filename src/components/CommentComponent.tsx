import { UserCard } from './UserCard';
import { formatDate } from '@/utils';
import { Comment } from '@/@types/Post';
import { RemoveComment } from './RemoveComment';
import { AuthCheck } from './AuthCheck';
import { Textarea } from './Textarea';

export function CommentComponent(comment: Comment) {
  return (
    <div key={comment.id} className="flex relative flex-col gap-1">
      <Textarea comment={comment} />

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
