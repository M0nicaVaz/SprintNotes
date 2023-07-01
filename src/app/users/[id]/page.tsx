import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `Perfil de ${user?.name}` };
}

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, image, id } = user ?? {};

  return (
    <main className="flex gap-8 flex-col max-w-[1580px] mx-auto py-10 px-6 lg:px-16">
      <div className="flex flex-wrap items-center gap-4">
        <Image
          width={74}
          height={74}
          src={image ?? '/default_pfp.png'}
          alt={`Foto de ${name}`}
          className="rounded-full group-hover:ring-2 group-hover:ring-violet-light100"
        />
        <h1 className="text-2xl"> Perfil de {name}</h1>
      </div>
    </main>
  );
}
