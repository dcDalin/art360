import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import router from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';

import { INSERT_ARTIST_GENRE_ONE } from '@/graphql/artistGenre/mutations';
import { READ_ARTIST_GENRES } from '@/graphql/artistGenre/queries';
import { READ_ARTISTS_GENRES } from '@/graphql/artistGenrePivot/queries';
import { ADMIN_ARTISTS_GENRES } from '@/routes/paths';

type FormValues = {
  name: string;
  description: string;
};

export default function CreateArtistGenreProvider() {
  const accessToken = useAccessToken();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const [insertArtistGenreOne, { loading }] = useMutation(
    INSERT_ARTIST_GENRE_ONE,
    {
      refetchQueries: [
        { query: READ_ARTIST_GENRES }, // DocumentNode object parsed with gql
        { query: READ_ARTISTS_GENRES },
      ],
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, description } = data;

    try {
      await insertArtistGenreOne({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { name, description },
      });
      toast.success(`${name} genre has been added`, { id: 'artist-success' });
      router.replace(ADMIN_ARTISTS_GENRES, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <Input
            id='name'
            label='Genre name'
            validation={{
              required: 'Genre name is required',
              minLength: {
                value: 3,
                message: 'Genre name is too short',
              },
              maxLength: {
                value: 30,
                message: 'Genre name is too long',
              },
            }}
          />

          <TextArea
            id='description'
            label='Description'
            validation={{
              required: 'Description is required',
              minLength: {
                value: 20,
                message: 'Description is too short',
              },
              maxLength: {
                value: 3000,
                message: 'Description is too long',
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
            SAVE
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
