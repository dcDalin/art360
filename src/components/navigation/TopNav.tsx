import router from 'next/router';
import { VscAccount } from 'react-icons/vsc';

import AppLogo from '@/components/AppLogo';
import ContainerLayout from '@/components/layout/ContainerLayout';
import TopBannerMessage from '@/components/navigation/TopBannerMessage';
import UserDropDown from '@/components/navigation/UserDropDown';

export default function TopNav() {
  return (
    <>
      <TopBannerMessage />
      <div className='bg-base-100'>
        <ContainerLayout>
          <div className='navbar bg-base-100 px-0'>
            <div className='flex-1'>
              <AppLogo />
            </div>
            <div className='flex-none gap-2'>
              <ul className='menu menu-horizontal p-0'>
                <li onClick={() => router.push('/artists')}>
                  <a>Artists</a>
                </li>
                <li onClick={() => router.push('/art')}>
                  <a>Art</a>
                </li>
                <li>
                  <a>
                    <VscAccount />
                    Item 1
                  </a>
                </li>
              </ul>

              <UserDropDown />
            </div>
          </div>
        </ContainerLayout>
      </div>
    </>
  );
}
