import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import CheckBox from '@/components/forms/Elements/CheckBox';
import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';

import { UPDATE_CART_ZERO } from '@/graphql/cart/mutations';
import { UPDATE_PRODUCT_DESCRIPTION } from '@/graphql/products/mutation';
import { FETCH_PRODUCTS } from '@/graphql/products/queries';

interface IEditProductDetailsProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  closeModal: () => void;
}

type FormValues = {
  name: string;
  description: string;
  price: number;
  isUnique: boolean;
};

export default function EditProductDetailsProvider({
  data,
  closeModal,
}: IEditProductDetailsProviderProps) {
  const accessToken = useAccessToken();

  const { id, name, description, price, isUnique } = data;

  const methods = useForm<FormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name,
      description,
      price,
      isUnique,
    },
  });

  const { handleSubmit, control } = methods;

  const { isDirty } = useFormState({
    control,
  });

  const [updateProductDetails, { loading }] = useMutation(
    UPDATE_PRODUCT_DESCRIPTION,
    {
      refetchQueries: [{ query: FETCH_PRODUCTS }],
    }
  );

  const [updateCartZero, { loading: cartLoading }] =
    useMutation(UPDATE_CART_ZERO);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, description, price, isUnique } = data;

    try {
      const { data } = await updateProductDetails({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id, name, description, price, isUnique },
      });

      // update users cart to one if updated to isUnique
      if (data && isUnique) {
        await updateCartZero({
          context: {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
          variables: { _eq: id },
        });
      }

      toast.success('Product details updated', { id: 'product-updated' });
      closeModal();
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
            label='Product name'
            validation={{
              required: 'Product name is required',
              minLength: {
                value: 3,
                message: 'Product name is too short',
              },
              maxLength: {
                value: 30,
                message: 'Product name is too long',
              },
            }}
          />

          <Input
            id='price'
            type='number'
            label='Product price'
            validation={{
              required: 'Product price is required',
              min: {
                value: 10,
                message: 'Price is too low',
              },
              maxLength: {
                value: 1000000,
                message: 'Price is too high',
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
          <CheckBox label='Is Art Unique' id='isUnique' />

          <button
            disabled={loading || cartLoading || !isDirty}
            className={`btn-primary btn-block btn my-6 ${
              loading || cartLoading ? 'loading' : null
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
