'use client';

import { api } from '@/lib/api';
import { Icon } from 'design-system-medclub';
import { AuthCheck } from './AuthCheck';
import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function PostForm() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const isMutating = isLoading || isPending;
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const body = {
      description: formData.get('description'),
      category: formData.getAll('category'),
    };

    try {
      await fetch(`${api}/content`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
    }

    if (ref.current) ref.current.value = '';
    setIsLoading(false);
    startTransition(() => router.refresh());
  };

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
            placeholder="Deixe aqui o seu recado..."
            className="p-6 bg-gray-400 rounded resize-none min-h-[84px] placeholder:text-gray-200"
          />

          <div className="flex items-center gap-4">
            <span className="text-lg block relative">
              Projeto:
              <span className="text-xxs text-red-300 absolute top-1 -right-2">
                *
              </span>{' '}
            </span>
            <div className="flex gap-1">
              <input
                id="medclub"
                type="checkbox"
                name="category"
                value="medclub"
              />
              <label htmlFor="medclub">Medclub</label>
            </div>

            <div className="flex gap-1">
              <input id="emr" type="checkbox" name="category" value="emr" />
              <label htmlFor="emr">EMR</label>
            </div>

            <div className="flex gap-1 group">
              <input
                id="medtest"
                type="checkbox"
                name="category"
                value="medtest"
              />
              <label htmlFor="medtest">Medtest</label>
            </div>
          </div>
        </div>

        <button
          disabled={isMutating}
          className="disabled:cursor-not-allowed enabled:hover:brightness-110 -mt-9 group h-16 w-16 bg-violet-light200 rounded-full text-gray-500 font-semibold"
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
