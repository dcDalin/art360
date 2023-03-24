import { useMutation } from '@apollo/client';
import { useAccessToken, useFileUpload } from '@nhost/nextjs';
import router from 'next/router';
import { useContext } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import CheckBox from '@/components/forms/Elements/CheckBox';
import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';
import UploadImage from '@/components/forms/UploadImage';

import {
  ImageUploadContext,
  UploadImageContextType,
} from '@/context/ImageUploadContext';
import { INSERT_ARTISTS_ONE } from '@/graphql/artists/mutations';
import { READ_ARTISTS } from '@/graphql/artists/queries';
import { ADMIN_ARTISTS } from '@/routes/paths';

type FormValues = {
  firstName: string;
  lastName: string;
  nickName: string;
  bio: string;
  isFeatured: boolean;
};

export default function CreateArtistProvider() {
  const accessToken = useAccessToken();

  const { image } = useContext(ImageUploadContext) as UploadImageContextType;

  const { upload, isUploading } = useFileUpload();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const [insertArtistsOne, { loading }] = useMutation(INSERT_ARTISTS_ONE, {
    refetchQueries: [
      { query: READ_ARTISTS }, // DocumentNode object parsed with gql
      'readArtists', // Query name
    ],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { firstName, lastName, nickName, bio, isFeatured } = data;

    try {
      if (image && image[0] && image[0].file) {
        const { file } = image[0];
        const { id, isUploaded, isError } = await upload({ file });

        if (isError) {
          toast.error('Something went wrong while uploading the image', {
            id: 'isError',
          });
        } else if (isUploaded) {
          // submit rest of the form

          await insertArtistsOne({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            },
            variables: {
              bio,
              firstName,
              lastName,
              nickName,
              imageId: id,
              isFeatured,
            },
          });
          toast.success(`${nickName} has been added`, { id: 'artist-success' });
          router.replace(ADMIN_ARTISTS, undefined, { shallow: true });
        }
      } else {
        toast.error('No image file found', { id: 'error-no-image' });
      }
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <div className='w-full'>
        <UploadImage title='Artist profile picture' />
        {!image ? <p>No image</p> : ''}
      </div>
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
            disabled={loading || isUploading}
            className={`btn-primary btn-block btn my-6 ${
              loading || isUploading ? 'loading' : null
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
