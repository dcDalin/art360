import { useRouter } from 'next/router';

import useMobileMenu from '@/components/navigation/useMobileMenu';
export default function MobileBottomNav() {
  const mobileMenuItems = useMobileMenu();
  const router = useRouter();
  return (
    <div className='btm-nav flex md:hidden'>
      {mobileMenuItems && mobileMenuItems.length
        ? mobileMenuItems.map(({ title, icon, path }, index) => {
            return (
              <button
                className={router.asPath === path ? 'active' : ''}
                key={index}
                onClick={() => router.push(path)}
              >
                {icon}
                <span className='btm-nav-label'>{title}</span>
              </button>
            );
          })
        : null}
    </div>
  );
}
