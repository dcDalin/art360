import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import router from 'next/router';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import CheckBox from '@/components/forms/Elements/CheckBox';
import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';

import { UPDATE_ARTIST_BY_PK } from '@/graphql/artists/mutations';
import { READ_ARTISTS } from '@/graphql/artists/queries';
import { ADMIN_ARTISTS } from '@/routes/paths';

interface IEditArtistProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type FormValues = {
  firstName: string;
  lastName: string;
  nickName: string;
  bio: string;
  isFeatured: boolean;
};

export default function EditArtistProvider({ data }: IEditArtistProviderProps) {
  const accessToken = useAccessToken();

  const { id, bio, firstName, lastName, nickName, isFeatured } = data;

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName,
      lastName,
      nickName,
      bio,
      isFeatured,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const [updateArtistByPk, { loading }] = useMutation(UPDATE_ARTIST_BY_PK, {
    refetchQueries: [{ query: READ_ARTISTS }, 'readArtistByPk'],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { bio, firstName, lastName, nickName, isFeatured } = data;

    try {
      await updateArtistByPk({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id, firstName, lastName, nickName, bio, isFeatured },
      });
      toast.success('Artist updated', { id: 'artist-updated' });
      router.replace(ADMIN_ARTISTS, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <div className='flex flex-col items-center space-x-0 md:flex-row md:space-x-4'>
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
            <Input
              id='nickName'
              label='Nick name'
              validation={{
                required: 'Nick name is required',
                minLength: {
                  value: 2,
                  message: 'Nick name is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Nick name is too long',
                },
              }}
            />
          </div>
          <TextArea
            id='bio'
            label='Bio'
            validation={{
              required: 'Bio is required',
              minLength: {
                value: 20,
                message: 'Bio is too short',
              },
              maxLength: {
                value: 3000,
                message: 'Bio is too long',
              },
            }}
          />
          <CheckBox id='isFeatured' label='Featured' type='checkbox' />

          <button
            disabled={loading || !isDirty}
            className={`btn-primary btn-block btn my-6 ${
              loading ? 'loading' : null
            }`}
            type='submit'
          >
            SAVE
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
