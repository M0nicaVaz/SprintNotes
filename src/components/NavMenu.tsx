import Link from 'next/link';
import { AuthButton } from './AuthButton';
import { AuthCheck } from './AuthCheck';

export function NavMenu() {
  return (
    <header className="text-white-100 px-12 flex  justify-between h-20 w-full items-center bg-gray-400 ">
      <Link href={'/'} className="hover:text-violet-pure transition-colors">
        Início
      </Link>

      <ul className="flex gap-2 items-center">
        <AuthCheck>
          <li className="hover:text-violet-pure transition-colors">
            <Link href={'/medclub'}>Medclub</Link>
          </li>
          <li className="hover:text-violet-pure transition-colors">
            <Link href={'/emr'}>EMR</Link>
          </li>
          <li className="hover:text-violet-pure transition-colors">
            <Link href={'/medtest'}>Medtest</Link>
          </li>
          <li className="hover:text-violet-pure transition-colors">
            <Link href={'/users'}>Usuários</Link>
          </li>
        </AuthCheck>

        <li className="ml-6">
          <AuthButton />
        </li>
      </ul>
    </header>
  );
}
