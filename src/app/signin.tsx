'use client';

import { signIn, useSession, getProviders } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function SignIn() {
  const { status } = useSession();
  const router = useRouter();
  const provider = await getProviders();

  useEffect(() => {
    if (status === 'authenticated') router.replace('/');
  }, []);

  return (
    <main className="grid place-content-center min-h-[calc(100vh-80px)] max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <div className="-mt-20 flex flex-col gap-6 text-center bg-gray-400 rounded p-14">
        <h1 className="text-xl">Faça login para entrar</h1>
        <a
          className="gap-4 bg-violet-light000 transition-all  hover:brightness-110 uppercase font-semibold text-gray-500  mx-auto h-[52px] rounded w-80 flex justify-center items-center mb-3"
          onClick={() => signIn(provider?.google.id)}
          role="button"
        >
          <Image alt="google logo" width={24} height={24} src={'/google.png'} />
          Entrar com Google
        </a>
      </div>
    </main>
  );
}
