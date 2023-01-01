import { useRouter } from 'next/router';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import useRedirectTo from '@/hooks/useRedirectTo';

import AppLogo from '@/components/AppLogo';
interface ICardLayoutProps {
  children: React.ReactNode;
  title?: string;
  footerText?: string;
}

export default function CardLayout({
  children,
  title,
  footerText,
}: ICardLayoutProps) {
  const redirectTo = useRedirectTo();
  const router = useRouter();
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-between'>
      <div className='flex w-full justify-center'>
        <div className='card mt-1 w-full bg-base-100 shadow-xl md:mt-10 md:w-2/3 lg:w-1/3'>
          <div className='card-body'>
            <div className='grid grid-cols-3 items-center'>
              <button
                className='btn-outline btn btn-sm btn-circle'
                onClick={() => router.push(redirectTo)}
              >
                <MdOutlineKeyboardBackspace className='text-2xl' />
              </button>

              <div className='text-center'>
                <AppLogo className='text-black' />
              </div>
              <div></div>
            </div>
            {title ? <h2 className='card-title'>{title}</h2> : null}
            {children}
          </div>
        </div>
      </div>
      {footerText ? <div className='py-4'>{footerText}</div> : null}
    </div>
  );
}
