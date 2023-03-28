import router from 'next/router';

import AppLogo from '@/components/AppLogo';
import CartCounter from '@/components/Cart/CartCounter';
import ContainerLayout from '@/components/layout/ContainerLayout';
import UserDropDown from '@/components/navigation/UserDropDown';

export default function TopNav() {
  return (
    <>
      <div className='bg-base-100'>
        <ContainerLayout>
          <div className='navbar bg-base-100 px-0'>
            <div className='flex-1'>
              <AppLogo />
            </div>
            <div className='flex-none gap-0'>
              <ul className='menu menu-horizontal p-0'>
                <li onClick={() => router.push('/about')}>
                  <a>About</a>
                </li>
                <li onClick={() => router.push('/artists')}>
                  <a>Artists</a>
                </li>
                <li onClick={() => router.push('/art')}>
                  <a>Art</a>
                </li>
                <li onClick={() => router.push('/blogs')}>
                  <a>Blogs</a>
                </li>
              </ul>

              <UserDropDown />
              <ul className='menu menu-horizontal hidden p-0 md:flex'>
                <li>
                  <a>
                    <CartCounter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ContainerLayout>
      </div>
    </>
  );
}
