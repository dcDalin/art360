import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import nhost from '@/lib/nhost';

import Input from '@/components/forms/Elements/Input';
import PasswordInput from '@/components/forms/Elements/PasswordInput';

import {
  loginFormLoading,
  stopAuthFormLoading,
} from '@/redux/authForms/authFormsSlice';
import { RootState } from '@/redux/store';
import { AUTH_LOGIN } from '@/routes/paths';

type FormValues = {
  email: string;
  password: string;
  displayName: string;
};

export default function RegisterFormProvider() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoginFormLoading } = useSelector(
    (state: RootState) => state.authForms
  );

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      dispatch(loginFormLoading());
      const { displayName, email, password } = data;
      const { error } = await nhost.auth.signUp({
        email,
        password,
        options: {
          displayName,
          allowedRoles: ['user', 'me'],
        },
      });
      if (error) {
        dispatch(stopAuthFormLoading());
        toast.error(error.message);
      } else {
        dispatch(stopAuthFormLoading());
        router.push(AUTH_LOGIN);
      }
    } catch (error) {
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
        <Input
          id='displayName'
          label='Display name'
          validation={{
            required: 'Display name is required',
          }}
        />

        <Input
          id='email'
          label='Email'
          placeholder='email@address.com'
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email address',
            },
          }}
        />
        <PasswordInput
          id='password'
          label='Password'
          type='password'
          placeholder='**********'
          validation={{
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters',
            },
            required: 'Password is required',
          }}
        />

        <button
          disabled={isLoginFormLoading}
          className={`btn-primary btn-block btn my-6 ${
            isLoginFormLoading ? 'loading' : null
          }`}
          type='submit'
        >
          Register
        </button>
      </form>
    </FormProvider>
  );
}
