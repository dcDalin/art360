import { useMutation, useQuery } from '@apollo/client';
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
import SelectInput from '@/components/forms/Elements/SelectInput';
import TextArea from '@/components/forms/Elements/TextArea';

import { READ_CATEGORIES } from '@/graphql/categories/queries';
import { UPDATE_SUB_CATEGORIES_BY_PK } from '@/graphql/subCategories/mutations';
import { READ_SUB_CATEGORIES } from '@/graphql/subCategories/queries';
import { ADMIN_STORE_SUB_CATEGORIES } from '@/routes/paths';

interface IEditSubCategoriesProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

type FormValues = {
  name: string;
  description: string;
  categoryId: string;
};

export default function EditSubCategoriesProvider({
  data,
}: IEditSubCategoriesProviderProps) {
  const accessToken = useAccessToken();

  const { id, name, description, categoryId } = data;

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name,
      description,
      categoryId,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(READ_CATEGORIES);

  const [updateSubCategoryByPk, { loading }] = useMutation(
    UPDATE_SUB_CATEGORIES_BY_PK,
    {
      refetchQueries: [{ query: READ_SUB_CATEGORIES }],
    }
  );

  if (categoriesError) return <p>Could not fetch categories</p>;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, description, categoryId } = data;

    try {
      await updateSubCategoryByPk({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id, name, description, categoryId },
      });
      toast.success('Product sub category updated', { id: 'artist-updated' });
      router.replace(ADMIN_STORE_SUB_CATEGORIES, undefined, { shallow: true });
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
            label='Sub category name'
            validation={{
              required: 'Sub category name is required',
              minLength: {
                value: 3,
                message: 'Sub category name is too short',
              },
              maxLength: {
                value: 30,
                message: 'Sub category name is too long',
              },
            }}
          />

          <SelectInput
            id='categoryId'
            label='Select category'
            validation={{
              required: 'Category name is required',
            }}
            loading={categoriesLoading}
            disabled={categoriesLoading}
          >
            {categoriesData &&
            categoriesData.categories &&
            categoriesData.categories.length
              ? categoriesData.categories.map(
                  ({ id, name }: { id: string; name: string }) => {
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  }
                )
              : null}
          </SelectInput>
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
            disabled={loading || categoriesLoading || !isDirty}
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
