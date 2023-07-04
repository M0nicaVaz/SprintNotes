'use client';

import { Comment } from '@/@types/Post';
import { UserCard } from './UserCard';
import { useRef, useState, useTransition } from 'react';
import { api } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export interface TextareaProps {
  comment?: Comment;
}

export function Textarea({ comment }: TextareaProps) {
  const [isReadonly, setIsReadonly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();
  const isMutating = isLoading || isPending;
  const isAuthorAndCurrentUser = comment?.author.email === session?.user?.email;
  const editOrSaveText = isReadonly ? 'Editar' : 'Salvar';

  function handleEdit() {
    setIsReadonly((prev) => !prev);
    if (isReadonly) ref.current?.focus();
  }

  async function handleSave() {
    setIsLoading(true);

    const body = {
      description: ref.current?.value,
    };

    try {
      await fetch(`${api}/comment/${comment?.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
    }

    setIsReadonly((prev) => !prev);
    setIsLoading(false);
    startTransition(() => router.refresh());
  }

  if (!comment) return null;

  return (
    <div className="bg-gray-400 rounded items-center p-6 text-gray-100 font-semibold flex gap-10 justify-between">
      <div className="max-h-auto flex-1 flex flex-col justify-between gap-2">
        <textarea
          ref={ref}
          readOnly={isReadonly}
          defaultValue={comment.description}
          className="w-full bg-gray-400 read-only:pointer-events-none resize-none text-white-100 font-normal"
        />
      </div>

      {isAuthorAndCurrentUser && (
        <button
          disabled={isMutating}
          onClick={() => (isReadonly ? handleEdit() : handleSave())}
          className="flex items-center absolute top-4 left-6 text-xxs transition-colors hover:text-violet-light200"
        >
          {isMutating ? '...' : editOrSaveText}
        </button>
      )}

      <UserCard {...comment.author} />
    </div>
  );
}
