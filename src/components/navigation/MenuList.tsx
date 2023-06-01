import router from 'next/router';

import AboutMobileDisclosure from '@/components/navigation/AboutMobileDisclosure';

export default function MenuList() {
  return (
    <div className='flex flex-col items-start space-y-4 space-x-0 font-bold md:flex-row md:items-center md:space-x-2 md:space-y-0'>
      <li className='flex md:hidden'>
        <a>
          <AboutMobileDisclosure />
        </a>
      </li>
      <li onClick={() => router.push('/shop')}>
        <a>Shop</a>
      </li>
      <li onClick={() => router.push('/blogs')}>
        <a>Blogs</a>
      </li>
    </div>
  );
}
