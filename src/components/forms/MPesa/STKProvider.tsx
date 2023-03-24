import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import router from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/forms/Elements/Input';

import { INSERT_CATEGORIES_ONE } from '@/graphql/categories/mutations';
import { READ_CATEGORIES } from '@/graphql/categories/queries';
import { ADMIN_STORE_CATEGORIES } from '@/routes/paths';

type FormValues = {
  name: string;
  description: string;
};

export default function STKProvider() {
  const accessToken = useAccessToken();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const [insertCategoriesOne, { loading }] = useMutation(
    INSERT_CATEGORIES_ONE,
    {
      refetchQueries: [{ query: READ_CATEGORIES }],
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, description } = data;

    try {
      await insertCategoriesOne({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { name, description },
      });
      toast.success(`${name} category has been added`, {
        id: 'artist-success',
      });
      router.replace(ADMIN_STORE_CATEGORIES, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <Input
            id='phoneNumber'
            label='Phone number'
            type='number'
            validation={{
              required: 'Phone number is required',
              pattern: {
                value: /^254/,
                message: 'Phone number must start with 254',
              },
              minLength: {
                value: 12,
                message: 'Phone number is too short',
              },
              maxLength: {
                value: 12,
                message: 'Phone number is too long',
              },
            }}
          />

          <button
            disabled={loading}
            className={`btn-primary btn-block btn my-6 ${
              loading ? 'loading' : null
            }`}
            type='submit'
          >
            send prompt
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
