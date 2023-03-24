import { useMutation, useQuery } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import router from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/forms/Elements/Input';
import SelectInput from '@/components/forms/Elements/SelectInput';
import TextArea from '@/components/forms/Elements/TextArea';

import { READ_CATEGORIES } from '@/graphql/categories/queries';
import { INSERT_SUB_CATEGORIES_ONE } from '@/graphql/subCategories/mutations';
import { READ_SUB_CATEGORIES } from '@/graphql/subCategories/queries';
import { ADMIN_STORE_SUB_CATEGORIES } from '@/routes/paths';

type FormValues = {
  name: string;
  description: string;
  categoryId: string;
};

export default function CreateSubCategoriesProvider() {
  const accessToken = useAccessToken();

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(READ_CATEGORIES);

  const [insertSubCategory, { loading }] = useMutation(
    INSERT_SUB_CATEGORIES_ONE,
    {
      refetchQueries: [{ query: READ_SUB_CATEGORIES }],
    }
  );

  if (categoriesError) return <p>Could not fetch categories</p>;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, description, categoryId } = data;

    try {
      await insertSubCategory({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { categoryId, name, description },
      });
      toast.success(`${name} sub category has been added`, {
        id: 'artist-success',
      });
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
            disabled={loading || categoriesLoading}
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
