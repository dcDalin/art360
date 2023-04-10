import AppLogo from '@/components/AppLogo';
import CartCounter from '@/components/Cart/CartCounter';
import ContainerLayout from '@/components/layout/ContainerLayout';
import MenuList from '@/components/navigation/MenuList';
import SlideOutMenu from '@/components/navigation/SlideOutMenu';
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
              <ul className='menu menu-horizontal hidden p-0 md:flex'>
                <MenuList />
              </ul>

              <div className='hidden md:flex'>
                <UserDropDown />
              </div>
              <ul className='menu menu-horizontal p-0'>
                <li>
                  <a>
                    <CartCounter />
                  </a>
                </li>
              </ul>
              <SlideOutMenu />
            </div>
          </div>
        </ContainerLayout>
      </div>
    </>
  );
}
