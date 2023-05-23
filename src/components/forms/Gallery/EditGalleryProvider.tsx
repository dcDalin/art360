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

import { UPDATE_GALLERY_BY_PK } from '@/graphql/gallery/mutations';
import { READ_GALLERY } from '@/graphql/gallery/queries';
import { ADMIN_GALLERY } from '@/routes/paths';

interface IEditGalleryProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type FormValues = {
  title: string;
  description: string;
};

export default function EditGalleryProvider({
  data,
}: IEditGalleryProviderProps) {
  const accessToken = useAccessToken();

  const { id, title, description } = data;

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      title,
      description,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const [updateGalleryByPk, { loading }] = useMutation(UPDATE_GALLERY_BY_PK, {
    refetchQueries: [{ query: READ_GALLERY }],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, description } = data;

    try {
      await updateGalleryByPk({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id, title, description },
      });
      toast.success('Gallery updated', { id: 'artist-updated' });
      router.replace(ADMIN_GALLERY, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-0'>
          <Input
            id='title'
            label='Gallery title'
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
