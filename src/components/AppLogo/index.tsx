import router from 'next/router';

interface IAppLogoProps {
  className?: string;
}

export default function AppLogo({ className = 'text-neutral' }: IAppLogoProps) {
  return (
    <div className='cursor-pointer' onClick={() => router.push('/')}>
      <h1 className={className}>Art360</h1>
    </div>
  );
}
