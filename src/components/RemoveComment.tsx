'use client';
import { Comment } from '@/@types/Post';
import { api } from '@/lib/api';
import { Icon } from 'design-system-medclub';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function RemoveComment({ id, author }: Comment) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const isMutating = isLoading || isPending;
  const router = useRouter();
  const { data: session } = useSession();
  const isAuthorAndCurrentUser = author.email === session?.user?.email;

  async function handleDelete() {
    setIsLoading(true);

    try {
      await fetch(`${api}/comment/${id}`, {
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

  if (isAuthorAndCurrentUser) {
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

  return null;
}
