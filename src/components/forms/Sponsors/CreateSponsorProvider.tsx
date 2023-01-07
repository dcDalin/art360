import { useMutation } from '@apollo/client';
import { useAccessToken, useFileUpload } from '@nhost/react';
import { useContext } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';
import UploadImage from '@/components/forms/UploadImage';

import {
  ImageUploadContext,
  UploadImageContextType,
} from '@/context/ImageUploadContext';
import { INSERT_SPONSOR } from '@/graphql/mutations';
import { READ_ALL_SPONSORS } from '@/graphql/queries';
import { closeModals } from '@/redux/modals/adminCRUDModalSlice';
import urlRegex from '@/utils/urlRegex';

type FormValues = {
  title: string;
  description: string;
  url: string;
};

export default function CreateSponsorProvider() {
  const dispatch = useDispatch();
  const accessToken = useAccessToken();

  const { image } = useContext(ImageUploadContext) as UploadImageContextType;

  const { upload, isUploading } = useFileUpload();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const [insertSponsor, { loading, data, error }] = useMutation(
    INSERT_SPONSOR,
    {
      refetchQueries: [
        { query: READ_ALL_SPONSORS }, // DocumentNode object parsed with gql
        'ReadAllSponsors', // Query name
      ],
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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

          const { title, url, description } = data;

          await insertSponsor({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            },
            variables: { description, imageId: id, title, url },
          });
        }
      } else {
        toast.error('No image file found', { id: 'error-no-image' });
      }
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  if (data) {
    toast.success('Sponsor added', { id: 'data' });
    dispatch(closeModals());
  }

  if (error) {
    toast.error('Could not submit form');
  }

  return (
    <div className='flex flex-col justify-between space-x-0 md:flex-row md:space-x-4'>
      <div className='w-full'>
        <UploadImage />
        {!image ? <p>No image</p> : ''}
      </div>

      <div className='w-full'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
            <Input
              id='title'
              label='Title'
              validation={{
                required: 'Title is required',
                minLength: {
                  value: 3,
                  message: 'Title is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Title is too long',
                },
              }}
            />
            <TextArea
              id='description'
              label='Description'
              validation={{
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Description is too long',
                },
              }}
            />
            <Input
              id='url'
              label='URL'
              validation={{
                required: 'URL is required',
                pattern: {
                  value: urlRegex,
                  message: 'URL is not valid',
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
    </div>
  );
}
