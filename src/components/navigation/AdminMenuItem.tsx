import Link from 'next/link';
import { useRouter } from 'next/router';

import useAdminMenu from '@/components/navigation/useAdminMenu';

export default function AdminMenuItem() {
  const adminMenuItems = useAdminMenu();
  const router = useRouter();
  return (
    <ul className='menu rounded-box bg-base-100 p-1 md:p-2'>
      {adminMenuItems && adminMenuItems.length
        ? adminMenuItems.map(({ title, icon, path }, index) => {
            return (
              <li key={index}>
                <Link
                  className={router.asPath === path ? 'active' : ''}
                  href={path}
                >
                  {icon}
                  <div className='hidden md:flex'>{title}</div>
                </Link>
              </li>
            );
          })
        : null}
    </ul>
  );
}
