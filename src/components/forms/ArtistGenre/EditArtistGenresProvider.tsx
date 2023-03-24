import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import router from 'next/router';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';

import { UPDATE_ARTIST_GENRE_BY_PK } from '@/graphql/artistGenre/mutations';
import { READ_ARTIST_GENRES } from '@/graphql/artistGenre/queries';
import { READ_ARTISTS_GENRES } from '@/graphql/artistGenrePivot/queries';
import { ADMIN_ARTISTS_GENRES } from '@/routes/paths';

interface IEditArtistGenresProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type FormValues = {
  name: string;
  description: string;
};

export default function EditArtistGenresProvider({
  data,
}: IEditArtistGenresProviderProps) {
  const accessToken = useAccessToken();

  const { id, name, description } = data;

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name,
      description,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const [updateArtistGenreByPk, { loading }] = useMutation(
    UPDATE_ARTIST_GENRE_BY_PK,
    {
      refetchQueries: [
        { query: READ_ARTIST_GENRES },
        { query: READ_ARTISTS_GENRES },
      ],
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, description } = data;

    try {
      await updateArtistGenreByPk({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id, name, description },
      });
      toast.success('Artist genre updated', { id: 'artist-updated' });
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
