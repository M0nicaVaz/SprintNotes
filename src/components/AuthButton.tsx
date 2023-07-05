'use client';
import { Icon } from 'design-system-medclub';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export function SignOutButton() {
  return (
    <button
      className="group flex flex-col gap-1 items-center"
      onClick={() => signOut()}
    >
      <Icon
        name="exit-outline"
        className="group-hover:bg-gray-300 rounded-full p-1 transition-colors"
      />
      <small className="text-xs">Log out</small>
    </button>
  );
}

export function SignInButton() {
  return (
    <button
      className="group flex flex-col gap-1 items-center"
      onClick={() => signIn()}
    >
      <Icon
        name="exit-outline"
        className="group-hover:bg-gray-300 rounded-full p-1 transition-colors"
      />
      <small className="text-xs group-hover:text-gray-100 transition-colors">
        Login
      </small>
    </button>
  );
}

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="animate-pulse">...</div>;
  }

  if (status === 'authenticated') {
    return (
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src={session.user?.image ?? '/default_pqp.png'}
          width={32}
          height={32}
          alt="Your Name"
        />

        <SignOutButton />
      </div>
    );
  }

  return <SignInButton />;
}
