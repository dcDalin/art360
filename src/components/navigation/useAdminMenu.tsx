import { AiFillDashboard } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdDraw } from 'react-icons/md';
import { SiGithubsponsors } from 'react-icons/si';

import {
  ADMIN_ARTISTS,
  ADMIN_ARTISTS_GENRES,
  ADMIN_DASHBOARD,
  ADMIN_SETTINGS,
  ADMIN_SPONSORS,
  ADMIN_STORE_CATEGORIES,
} from '@/routes/paths';

export default function useAdminMenu() {
  const adminMenuItems = [
    {
      title: 'Dashboard',
      icon: <AiFillDashboard />,
      path: ADMIN_DASHBOARD,
    },
    {
      title: 'Artists Genres',
      icon: <MdDraw />,
      path: ADMIN_ARTISTS_GENRES,
    },
    {
      title: 'Artists',
      icon: <MdDraw />,
      path: ADMIN_ARTISTS,
    },
    {
      title: 'Sponsors',
      icon: <SiGithubsponsors />,
      path: ADMIN_SPONSORS,
    },
    {
      title: 'Product Categories',
      icon: <BiCategoryAlt />,
      path: ADMIN_STORE_CATEGORIES,
    },
    {
      title: 'Settings',
      icon: <FiSettings />,
      path: ADMIN_SETTINGS,
    },
  ];

  return adminMenuItems;
}
