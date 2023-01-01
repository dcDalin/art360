import { VscAccount } from 'react-icons/vsc';

import AppLogo from '@/components/AppLogo';
import ContainerLayout from '@/components/layout/ContainerLayout';
import TopBannerMessage from '@/components/navigation/TopBannerMessage';
import TopSearch from '@/components/navigation/TopSearch';
import UserDropDown from '@/components/navigation/UserDropDown';

export default function TopNav() {
  return (
    <>
      <TopBannerMessage />
      <div className='bg-primary'>
        <ContainerLayout>
          <div className='navbar bg-primary px-0'>
            <div className='flex-1'>
              <AppLogo />
            </div>
            <div className='flex-none gap-2'>
              <TopSearch />
              <ul className='menu menu-horizontal p-0'>
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
