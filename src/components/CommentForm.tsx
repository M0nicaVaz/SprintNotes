'use client';

import { api } from '@/lib/api';
import { Icon } from 'design-system-medclub';
import { AuthCheck } from './AuthCheck';
import { useRef, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';

export function CommentForm() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const isMutating = isLoading || isPending;
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams();

  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const body = {
      description: formData.get('description'),
      postId: id,
    };

    try {
      await fetch(`${api}/comment`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error(err);
    }

    if (ref.current) ref.current.value = '';
    setIsLoading(false);
    startTransition(() => router.refresh());
  }

  return (
    <AuthCheck>
      <form
        onSubmit={createPost}
        className="flex mx-auto w-full max-w-4xl justify-center gap-4 items-center"
      >
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="description" className="sr-only">
            Novo recado
          </label>
          <textarea
            ref={ref}
            name="description"
            required
            placeholder="Deixe aqui seu comentário..."
            className="p-6 bg-gray-400 rounded resize-none min-h-[84px] placeholder:text-gray-200"
          />
        </div>

        <button
          disabled={isMutating}
          className="disabled:cursor-not-allowed enabled:hover:brightness-110 group h-16 w-16 bg-violet-light200 rounded-full text-gray-500 font-semibold"
        >
          <Icon
            name="send"
            className=" mx-auto path:fill-gray-400 group-enabled:group-hover:w-4 transition-all"
          />
          <small className="hidden group-enabled:group-hover:block text-xs transition-all">
            Enviar
          </small>
        </button>
      </form>
    </AuthCheck>
  );
}
