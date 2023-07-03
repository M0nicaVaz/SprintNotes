'use client';

import { Comment } from '@/@types/Post';
import { UserCard } from './UserCard';
import { useRef, useState } from 'react';
import { api } from '@/lib/api';

export interface TextareaProps {
  comment?: Comment;
}

export function Textarea({ comment }: TextareaProps) {
  if (!comment) return null;

  const [isReadonly, setIsReadonly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);

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
  }

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
      <button
        disabled={isLoading}
        onClick={() => (isReadonly ? handleEdit() : handleSave())}
        className="flex items-center absolute top-4 left-6 text-xxs transition-colors hover:text-violet-light200"
      >
        {isReadonly ? 'Editar' : 'Salvar'}
      </button>

      <UserCard {...comment.author} />
    </div>
  );
}
