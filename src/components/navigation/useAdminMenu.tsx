import { AiFillDashboard } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { SiGithubsponsors } from 'react-icons/si';

import { ADMIN_DASHBOARD, ADMIN_SETTINGS } from '@/routes/paths';

export default function useAdminMenu() {
  const adminMenuItems = [
    {
      title: 'Dashboard',
      icon: <AiFillDashboard />,
      path: ADMIN_DASHBOARD,
    },
    {
      title: 'Sponsors',
      icon: <SiGithubsponsors />,
      path: ADMIN_SETTINGS,
    },
    {
      title: 'Settings',
      icon: <FiSettings />,
      path: ADMIN_SETTINGS,
    },
  ];

  return adminMenuItems;
}
