import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiTwotoneEdit } from 'react-icons/ai';
import { FaRegImage } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import nhost from '@/lib/nhost';

import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';
import NextImage from '@/components/NextImage';

import { UPDATE_ADMIN_SPONSORS_IMAGE_MODAL } from '@/constants/modalNames';
import { UPDATE_SPONSOR_DATA } from '@/graphql/mutations';
import { READ_ALL_SPONSORS } from '@/graphql/queries';
import {
  closeModals,
  openAdminCRUDModal,
} from '@/redux/modals/adminCRUDModalSlice';
import { RootState } from '@/redux/store';
import urlRegex from '@/utils/urlRegex';

type FormValues = {
  title: string;
  description: string;
  url: string;
};

export default function UpdateSponsorProvider() {
  const dispatch = useDispatch();
  const accessToken = useAccessToken();

  const {
    adminModalPayload: {
      formData: { id, imageId, url, title, description },
    },
  } = useSelector((state: RootState) => state.adminCRUDModal);

  const imageUrl = nhost.storage.getPublicUrl({
    fileId: imageId,
  });

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      title,
      description,
      url,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const [updateSponsor, { loading, data, error }] = useMutation(
    UPDATE_SPONSOR_DATA,
    {
      refetchQueries: [
        { query: READ_ALL_SPONSORS }, // DocumentNode object parsed with gql
        'ReadAllSponsors', // Query name
      ],
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { title, url, description } = data;

      await updateSponsor({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { description, id, title, url },
      });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  if (data) {
    toast.success('Sponsor updated', { id: 'data' });
    dispatch(closeModals());
  }

  if (error) {
    toast.error('Could not submit form', { id: 'nhost-error' });
  }

  return (
    <div className='flex flex-col justify-between space-x-0 md:flex-row md:space-x-4'>
      <div className='flex w-full flex-col space-y-4'>
        <button
          className='btn-outline btn gap-2'
          onClick={() =>
            dispatch(
              openAdminCRUDModal({
                adminModalToOpen: UPDATE_ADMIN_SPONSORS_IMAGE_MODAL,
                formData: { description, id, title, url, imageId },
              })
            )
          }
        >
          Update image
          <FaRegImage />
        </button>
        <div className='indicator'>
          <span className='badge-primary badge indicator-item'>
            <AiTwotoneEdit />
          </span>
          <div className=''>
            <NextImage
              src={imageUrl}
              imgClassName='object-cover'
              useSkeleton
              alt='sponsor'
              width={200}
              height={200}
            />
          </div>
        </div>
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
    </div>
  );
}
