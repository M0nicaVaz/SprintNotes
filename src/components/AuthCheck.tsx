'use client';
import { useSession } from 'next-auth/react';

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { status, data } = useSession();
  console.log(data);

  if (status === 'authenticated') return <>{children}</>;
  return <></>;
}
