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
        {comment.updatedAt && (
          <>
            <span className="text-xxs ">
              Editado em {formatDate(comment.updatedAt, 'short')}
            </span>

            <span className="font-extralight opacity-20">|</span>
          </>
        )}
        <span className="text-xxs ">
          Postado em {formatDate(comment.createdAt, 'short')}
        </span>

        <AuthCheck>
          <RemoveComment {...comment} />
        </AuthCheck>
      </div>
    </div>
  );
}
