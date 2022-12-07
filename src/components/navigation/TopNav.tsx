import { VscAccount } from 'react-icons/vsc';

import AppLogo from '@/components/AppLogo';
import ContainerLayout from '@/components/layout/ContainerLayout';
import TopBannerMessage from '@/components/navigation/TopBannerMessage';
import TopSearch from '@/components/navigation/TopSearch';
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

              <div className='dropdown-end dropdown'>
                <label tabIndex={0} className='btn-ghost btn gap-2'>
                  <VscAccount />
                  Account
                </label>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
                >
                  <li>
                    <a className='justify-between'>
                      Profile
                      <span className='badge'>New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ContainerLayout>
      </div>
    </>
  );
}
