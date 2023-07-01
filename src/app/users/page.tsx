import { UserCard } from '@/components';
import { api } from '@/lib/api';
import { User } from 'next-auth';

export default async function Users() {
  const users: User[] = await fetch(`${api}/users`).then((res) => res.json());

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <h1 className="text-2xl">Lista de usuários</h1>

      <section className="flex flex-wrap">
        {users.map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}
      </section>
    </main>
  );
}
