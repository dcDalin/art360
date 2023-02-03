import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Step1 from '@/components/forms/Products/Step1';
import Step2 from '@/components/forms/Products/Step2';
import Step3 from '@/components/forms/Products/Step3';
import Step4 from '@/components/forms/Products/Step4';
import FormStepper from '@/components/FormStepper';

import { RootState } from '@/redux/store';

export default function CreateProductsProvider() {
  const { activeFormStep } = useSelector(
    (state: RootState) => state.createProduct
  );

  const renderActiveForm = useCallback(() => {
    switch (activeFormStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  }, [activeFormStep]);

  return (
    <div className='max-w-4xl'>
      {renderActiveForm()}
      <FormStepper />
    </div>
  );
}
