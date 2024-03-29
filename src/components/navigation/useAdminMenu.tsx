import { AiFillDashboard } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaPaintBrush } from 'react-icons/fa';
import { FcAbout } from 'react-icons/fc';
import { FiSettings } from 'react-icons/fi';
import { GrGallery } from 'react-icons/gr';
import { MdDraw, MdOutlineCategory } from 'react-icons/md';
import { SiGithubsponsors, SiWritedotas } from 'react-icons/si';

import {
  ADMIN_ABOUT,
  ADMIN_ARTISTS,
  ADMIN_ARTISTS_GENRES,
  ADMIN_BLOGS,
  ADMIN_DASHBOARD,
  ADMIN_GALLERY,
  ADMIN_SETTINGS,
  ADMIN_SPONSORS,
  ADMIN_STORE_CATEGORIES,
  ADMIN_STORE_PRODUCTS,
  ADMIN_STORE_SUB_CATEGORIES,
} from '@/routes/paths';

export default function useAdminMenu() {
  const adminMenuItems = [
    {
      title: 'Dashboard',
      icon: <AiFillDashboard />,
      path: ADMIN_DASHBOARD,
    },
    {
      title: 'About',
      icon: <FcAbout />,
      path: ADMIN_ABOUT,
    },
    {
      title: 'Gallery',
      icon: <GrGallery />,
      path: ADMIN_GALLERY,
    },
    {
      title: 'Blogs',
      icon: <SiWritedotas />,
      path: ADMIN_BLOGS,
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
      title: 'Product Sub Categories',
      icon: <MdOutlineCategory />,
      path: ADMIN_STORE_SUB_CATEGORIES,
    },
    {
      title: 'Products',
      icon: <FaPaintBrush />,
      path: ADMIN_STORE_PRODUCTS,
    },
    {
      title: 'Settings',
      icon: <FiSettings />,
      path: ADMIN_SETTINGS,
    },
  ];

  return adminMenuItems;
}
