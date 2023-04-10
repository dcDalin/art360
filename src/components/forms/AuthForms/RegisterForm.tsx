import Link from 'next/link';

import RegisterFormProvider from '@/components/forms/AuthForms/RegisterFormProvider';

import { AUTH_LOGIN } from '@/routes/paths';

export default function RegisterForm() {
  return (
    <>
      <RegisterFormProvider />
      <div className='flex flex-col'>
        <div className='flex items-center space-x-1'>
          <span>Already have an account?</span>
          <span>
            <Link href={AUTH_LOGIN}>
              <span className='link-primary link'>Log in.</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
