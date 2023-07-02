import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export function UserCard({ id, name, image }: User) {
  return (
    <Link href={`/users/${id}`}>
      <div className="group flex flex-col gap-1 items-center justify-center">
        <Image
          width={60}
          height={60}
          src={image ?? '/default_pfp.png'}
          alt={`Foto de ${name}`}
          className="w-10 h-10 lg:h-[60px] lg:w-[60px] rounded-full group-hover:ring-2 group-hover:ring-violet-light200"
        />

        <span className="text-sm group-hover:text-violet-light200">{name}</span>
      </div>
    </Link>
  );
}
