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

import { UPDATE_SPONSOR_BY_PK } from '@/graphql/sponsors/mutations';
import { READ_SPONSORS } from '@/graphql/sponsors/queries';
import { ADMIN_SPONSORS } from '@/routes/paths';

interface IEditSponsorProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type FormValues = {
  title: string;
  url: string;
  description: string;
};

export default function EditSponsorProvider({
  data,
}: IEditSponsorProviderProps) {
  const accessToken = useAccessToken();

  const { id, title, url, description } = data;

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      title,
      url,
      description,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const [updateSponsorByPk, { loading }] = useMutation(UPDATE_SPONSOR_BY_PK, {
    refetchQueries: [{ query: READ_SPONSORS }, 'readSponsors'],
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, url, description } = data;

    try {
      await updateSponsorByPk({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id, title, description, url },
      });
      toast.success('Sponsor updated', { id: 'artist-updated' });
      router.replace(ADMIN_SPONSORS, undefined, { shallow: true });
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
              id='title'
              label='Sponsor name'
              validation={{
                required: 'Sponsor name is required',
                minLength: {
                  value: 3,
                  message: 'Sponsor name is too short',
                },
                maxLength: {
                  value: 30,
                  message: 'Sponsor name is too long',
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
