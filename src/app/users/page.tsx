import { User } from '@/@types/User';
import { UserCard } from '@/components';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function Users() {
  const fetchUsers = await fetch(`${api}/users`);
  const users: User[] = await fetchUsers.json();

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <h1 className="text-2xl">Lista de usuários</h1>

      <section className="flex flex-wrap gap-6">
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex flex-col gap-1 group w-24 h-[120px]"
            >
              <UserCard key={user.id} {...user} />
              <div className=" flex-col items-center hidden group-hover:flex">
                <span className="text-xs">
                  {user['_count']?.posts} recados(s)
                </span>
                <span className="text-xs">
                  {user['_count']?.comments} comentário(s)
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
