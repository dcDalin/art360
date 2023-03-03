import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import CheckBox from '@/components/forms/Elements/CheckBox';
import Input from '@/components/forms/Elements/Input';
import TextArea from '@/components/forms/Elements/TextArea';

import {
  changeActiveStep,
  handleFormData,
} from '@/redux/createProduct/createProductSlice';
import { RootState } from '@/redux/store';

type FormValues = {
  name: string;
  description: string;
  price: number;
  isUnique: boolean;
};

export default function Step1() {
  const dispatch = useDispatch();

  const {
    formData: { name, description, price, isUnique },
  } = useSelector((state: RootState) => state.createProduct);

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

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, description, price, isUnique } = data;

    dispatch(changeActiveStep(2));
    return dispatch(handleFormData({ name, description, price, isUnique }));
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

          <CheckBox id='isUnique' label='Unique Art' type='checkbox' />
          <br />
          <button className='btn-primary btn my-6' type='submit'>
            next
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
