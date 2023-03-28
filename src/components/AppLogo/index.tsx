import router from 'next/router';

import NextImage from '@/components/NextImage';

export default function AppLogo() {
  return (
    <div className='cursor-pointer' onClick={() => router.push('/')}>
      <NextImage
        imgClassName='w-24 h-24 object-contain'
        className='object-contain'
        src='/images/logo.jpeg'
        alt='artist'
        width={100}
        height={50}
      />
    </div>
  );
}
