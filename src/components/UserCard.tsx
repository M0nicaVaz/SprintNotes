import { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export function UserCard({ id, name, image }: User) {
  return (
    <Link href={`/users/${id}`}>
      <div className="group flex flex-col gap-1 items-center justify-center">
        <Image
          width={74}
          height={74}
          src={image ?? '/default_pfp.png'}
          alt={`Foto de ${name}`}
          className="rounded-full group-hover:ring-2 group-hover:ring-violet-light100"
        />
        <div className="">
          <span className="text-sm group-hover:text-violet-light100">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}
