import Link from 'next/link';
import { useRouter } from 'next/router';

import useAdminMenu from '@/components/navigation/useAdminMenu';

export default function AdminMenuItem() {
  const adminMenuItems = useAdminMenu();
  const router = useRouter();
  return (
    <ul className='menu rounded-box w-full bg-base-100 p-1 lg:p-2'>
      {adminMenuItems && adminMenuItems.length
        ? adminMenuItems.map(({ title, icon, path }, index) => {
            if (title === 'Dashboard') {
              return (
                <li key={index}>
                  <Link
                    className={router.asPath === path ? 'active' : ''}
                    href={path}
                  >
                    <div className='flex w-full items-center justify-center lg:w-fit'>
                      {icon}
                    </div>
                    <div className='hidden lg:flex'>{title}</div>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Link
                    className={router.asPath.includes(path) ? 'active' : ''}
                    href={path}
                  >
                    <div className='flex w-full items-center justify-center lg:w-fit'>
                      {icon}
                    </div>
                    <div className='hidden lg:flex'>{title}</div>
                  </Link>
                </li>
              );
            }
          })
        : null}
    </ul>
  );
}
