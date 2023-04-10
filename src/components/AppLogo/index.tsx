import router from 'next/router';

import NextImage from '@/components/NextImage';

export default function AppLogo() {
  return (
    <div className='cursor-pointer' onClick={() => router.push('/')}>
      <NextImage
        imgClassName='w-14 h-14 md:w-24 md:h-24 object-contain'
        className='flex items-center justify-center object-contain'
        src='/images/logo.jpeg'
        alt='artist'
        width={100}
        height={50}
      />
    </div>
  );
}
