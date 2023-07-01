'use client';

import { useEffect } from 'react';

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={`min-h-[calc(100vh-80px)] grid place-content-center text-center`}
    >
      <span className="text-red-200 text-9xl">f</span>
      <span className="text-3xl">Algo deu errado</span>
      <button className="hover:text-violet-light100" onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
