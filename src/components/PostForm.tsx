'use client';

import { api } from '@/lib/api';
import { Icon } from 'design-system-medclub';
import { AuthCheck } from './AuthCheck';

export function PostForm() {
  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      description: formData.get('description'),
      category: formData.get('category'),
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
  };

  return (
    <AuthCheck>
      <form
        onSubmit={createPost}
        className="flex mx-auto w-full max-w-2xl justify-center gap-4 items-center"
      >
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="description" className="sr-only">
            Novo recado
          </label>
          <textarea
            name="description"
            placeholder="Deixe aqui o seu recado..."
            className=" p-6 bg-gray-400 rounded resize-none min-h-[84px] placeholder:text-gray-200"
          />

          <div className="flex items-center gap-4">
            <span className="text-lg">Projeto:</span>
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

        <button className="hover:brightness-110 -mt-9 group h-16 w-16 bg-violet-light200 rounded-full text-gray-500 font-semibold">
          <Icon
            name="send"
            className=" mx-auto path:fill-gray-400 group-hover:w-4 transition-all"
          />
          <small className="hidden group-hover:block text-xs transition-all">
            Enviar
          </small>
        </button>
      </form>
    </AuthCheck>
  );
}
