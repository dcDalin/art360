import Link from 'next/link';

import LoginFormProvider from '@/components/forms/AuthForms/LoginFormProvider';

import { AUTH_REGISTER } from '@/routes/paths';

export default function LoginForm() {
  return (
    <>
      <LoginFormProvider />
      <div className='flex flex-col'>
        <Link href=''>
          <span className='link-primary link mt-4'>Forgot your password?</span>
        </Link>

        <div className='flex items-center space-x-1'>
          <p>Don&apos;t have an account?</p>
          <Link href={AUTH_REGISTER}>
            <span className='link-primary link'>Create one today.</span>
          </Link>
        </div>
      </div>
    </>
  );
}
