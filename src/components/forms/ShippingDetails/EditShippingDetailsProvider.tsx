import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import router from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/forms/Elements/Input';

import { UPDATE_USER_PROFILE } from '@/graphql/userProfile/mutation';
import { FETCH_USER_PROFILE } from '@/graphql/userProfile/queries';

interface IEditShippingDetailsProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  town: string;
  phoneNumber: string;
};

export default function EditShippingDetailsProvider({
  data,
}: IEditShippingDetailsProviderProps) {
  const accessToken = useAccessToken();

  const { id, firstName, lastName, address, country, town, phoneNumber } = data;

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName,
      lastName,
      address,
      country,
      town,
      phoneNumber,
    },
  });

  const { handleSubmit } = methods;

  const [updateUserProfileByPK, { loading }] = useMutation(
    UPDATE_USER_PROFILE,
    {
      refetchQueries: [{ query: FETCH_USER_PROFILE }],
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { firstName, lastName, address, country, town, phoneNumber } = data;

    try {
      await updateUserProfileByPK({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: {
          _eq: id,
          firstName,
          lastName,
          address,
          country,
          town,
          phoneNumber,
        },
      });
      toast.success('Shipping information saved', { id: 'shipping-updated' });
      router.replace('/checkout/payment', undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <div className='flex items-center space-x-4 md:space-x-8'>
            <Input
              id='firstName'
              label='First name'
              validation={{
                required: 'First name is required',
                minLength: {
                  value: 3,
                  message: 'First name is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'First name is too long',
                },
              }}
            />
            <Input
              id='lastName'
              label='Last name'
              validation={{
                required: 'Last name is required',
                minLength: {
                  value: 3,
                  message: 'Last name is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Last name is too long',
                },
              }}
            />
          </div>

          <div className='flex items-center space-x-4 md:space-x-8'>
            <Input
              id='country'
              label='Country'
              validation={{
                required: 'Country is required',
                minLength: {
                  value: 3,
                  message: 'Country is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Country is too long',
                },
              }}
            />
            <Input
              id='town'
              label='Town'
              validation={{
                required: 'Town is required',
                minLength: {
                  value: 3,
                  message: 'Town is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Town is too long',
                },
              }}
            />
          </div>

          <div className='flex items-center space-x-4 md:space-x-8'>
            <Input
              id='address'
              label='Address'
              validation={{
                required: 'Address is required',
                minLength: {
                  value: 3,
                  message: 'Address is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Address is too long',
                },
              }}
            />
            <Input
              id='phoneNumber'
              label='Phone number'
              validation={{
                required: 'Phone number is required',
                minLength: {
                  value: 3,
                  message: 'Phone number is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Phone number is too long',
                },
              }}
            />
          </div>

          <button
            disabled={loading}
            className={`btn-primary btn-block btn my-6 ${
              loading ? 'loading' : null
            }`}
            type='submit'
          >
            next
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
