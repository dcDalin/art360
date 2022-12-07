import { BiHome } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';

import { ADMIN_DASHBOARD, ADMIN_SETTINGS } from '@/routes/paths';
export default function useAdminMenu() {
  const mobileMenuItems = [
    {
      title: 'Home',
      icon: <BiHome />,
      path: ADMIN_DASHBOARD,
    },
    {
      title: 'Account',
      icon: <VscAccount />,
      path: ADMIN_SETTINGS,
    },
    {
      title: 'Search',
      icon: <BsSearch />,
      path: ADMIN_SETTINGS,
    },
  ];

  return mobileMenuItems;
}
