import {
  useAuthenticationStatus,
  useSignOut,
  useUserAvatarUrl,
  useUserData,
  useUserDisplayName,
} from '@nhost/nextjs';
import { useRouter } from 'next/router';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { GiShoppingCart } from 'react-icons/gi';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { RiAdminFill } from 'react-icons/ri';
import { VscAccount } from 'react-icons/vsc';

import Avatar from '@/components/avatar';
import DropDownLink from '@/components/navigation/DropDownLink';

import { ADMIN_DASHBOARD, AUTH_LOGIN, AUTH_REGISTER } from '@/routes/paths';
import shortenText from '@/utils/shortenText';

export default function UserDropDown() {
  const avatar = useUserAvatarUrl() || '';
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const displayName = useUserDisplayName() || '';
  const { signOut } = useSignOut();
  const router = useRouter();
  const userData = useUserData();

  return (
    <div className='dropdown-end dropdown'>
      {isLoading ? (
        <div className='h-6 w-20 animate-pulse rounded-lg bg-base-100/50'></div>
      ) : (
        <>
          <label tabIndex={0} className='btn-ghost btn gap-2'>
            {isAuthenticated ? (
              <>
                <Avatar url={avatar} width={15} height={15} />
                <div className='hidden md:flex'>
                  {shortenText(displayName.split(' ')[0], 10)}
                </div>
                <HiOutlineChevronDown />
              </>
            ) : (
              <>
                <VscAccount />
                Account
              </>
            )}
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
          >
            {isAuthenticated ? (
              <>
                <DropDownLink
                  handleClick={signOut}
                  title='Cart'
                  icon={<GiShoppingCart />}
                  badge='0'
                />
                <li>
                  <a className='justify-between'>
                    Profile
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                {isAuthenticated && userData?.roles.includes('staff') ? (
                  <>
                    <div className='divider m-0'></div>
                    <DropDownLink
                      handleClick={() => router.push(ADMIN_DASHBOARD)}
                      title='Admin Dashboard'
                      icon={<RiAdminFill />}
                    />
                  </>
                ) : null}
                <div className='divider m-0'></div>
                <DropDownLink
                  handleClick={signOut}
                  title='Log out'
                  icon={<AiOutlineLogout />}
                />
              </>
            ) : (
              <>
                <DropDownLink
                  handleClick={() => router.push(AUTH_LOGIN)}
                  title='Log in'
                  icon={<AiOutlineLogin />}
                />
                <DropDownLink
                  handleClick={() => router.push(AUTH_REGISTER)}
                  title='Register'
                  icon={<VscAccount />}
                />
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
