import Link from 'next/link';
import { AuthButton } from './AuthButton';
import { AuthCheck } from './AuthCheck';
import { DropdownMenu } from './DropdownMenu';

const Links = [
  {
    title: 'Medclub',
    to: '/medclub',
    icon: <></>,
  },
  {
    title: 'Emr',
    to: '/emr',
    icon: <></>,
  },
  {
    title: 'Medtest',
    to: '/medtest',
    icon: <></>,
  },
  {
    title: 'Usuários',
    to: '/users',
    icon: <></>,
  },
];

export function NavMenu() {
  return (
    <header className="text-white-100 px-12 flex  justify-between h-20 w-full items-center bg-gray-400 ">
      <Link href={'/'} className="hover:text-violet-pure transition-colors">
        Início
      </Link>

      <ul className="flex gap-2 items-center">
        <AuthCheck>
          <DropdownMenu hasExitLink={false} dropdownLinks={Links}>
            Filtros
          </DropdownMenu>
        </AuthCheck>

        <li className="ml-6">
          <AuthButton />
        </li>
      </ul>
    </header>
  );
}
