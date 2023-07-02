'use client';
import { api } from '@/lib/api';
import { Icon } from 'design-system-medclub';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function RemoveComment({ commentId }: { commentId: number }) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const isMutating = isLoading || isPending;
  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);

    try {
      await fetch(`${api}/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
    startTransition(() => router.refresh());
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isMutating}
      className="self-end group transition-colors p-2"
    >
      {isMutating ? (
        '...'
      ) : (
        <Icon
          name={'trash'}
          className="w-4 h-4 path:fill-gray-100 group-hover:path:fill-red-200"
        />
      )}
    </button>
  );
}
