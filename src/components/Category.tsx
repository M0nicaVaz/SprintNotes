import Link from 'next/link';

export interface CategoryProps {
  name: 'emr' | 'medclub' | 'medtest';
}

export function Category({ name }: CategoryProps) {
  const categoryBg: Record<CategoryProps['name'], string> = {
    emr: 'bg-green-light200',
    medclub: 'bg-violet-pure',
    medtest: 'bg-yellow-300',
  };

  return (
    <Link href={`/${name}`}>
      <span
        className={`${categoryBg[name]} w-fit text-gray-500  rounded font-semibold px-2 py-1 text-xxs`}
      >
        {name}
      </span>
    </Link>
  );
}
