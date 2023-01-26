import { useMutation } from '@apollo/client';
import { useAccessToken, useFileUpload } from '@nhost/react';
import router from 'next/router';
import { useContext } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';
import UploadImage from '@/components/forms/UploadImage';

import {
  ImageUploadContext,
  UploadImageContextType,
} from '@/context/ImageUploadContext';
import { INSERT_SPONSOR_ONE } from '@/graphql/sponsors/mutations';
import { READ_SPONSORS } from '@/graphql/sponsors/queries';
import { ADMIN_SPONSORS } from '@/routes/paths';

type FormValues = {
  title: string;
  url: string;
  description: string;
};

export default function CreateSponsorProvider() {
  const accessToken = useAccessToken();

  const { image } = useContext(ImageUploadContext) as UploadImageContextType;

  const { upload, isUploading } = useFileUpload();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const [insertArtistsOne, { loading }] = useMutation(INSERT_SPONSOR_ONE, {
    refetchQueries: [
      { query: READ_SPONSORS }, // DocumentNode object parsed with gql
      'readSponsors', // Query name
    ],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, url, description } = data;

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
            variables: { title, url, description, imageId: id },
          });
          toast.success(`${title} has been added`, { id: 'artist-success' });
          router.replace(ADMIN_SPONSORS, undefined, { shallow: true });
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
        <UploadImage title='Sponsor image' />
        {!image ? <p>No image</p> : ''}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <div className='flex flex-col items-center space-x-0 md:flex-row md:space-x-4'>
            <Input
              id='title'
              label='Sponsor name'
              validation={{
                required: 'Name is required',
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
              id='url'
              label='URL'
              validation={{
                required: 'URL is required',
                minLength: {
                  value: 3,
                  message: 'URL is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'URL is too long',
                },
              }}
            />
          </div>
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
