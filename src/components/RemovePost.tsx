'use client';
import { api } from '@/lib/api';
import { Icon } from 'design-system-medclub';

export function RemovePost({ postId }: { postId: number }) {
  async function handleDelete() {
    await fetch(`${api}/content/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <button
      onClick={handleDelete}
      className="self-end group transition-colors p-2"
    >
      <Icon
        name={'trash'}
        className="w-5 h-5 path:fill-gray-100 group-hover:path:fill-red-200"
      />
    </button>
  );
}
