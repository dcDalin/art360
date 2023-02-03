import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

export default function FormStepper() {
  const { activeFormStep } = useSelector(
    (state: RootState) => state.createProduct
  );

  const steps = [
    { step: 1, description: 'Product info' },
    { step: 2, description: 'Category' },
    { step: 3, description: 'Artist' },
    { step: 4, description: 'Images' },
  ];

  return (
    <ul className='steps steps-horizontal w-full py-10'>
      {steps && steps.length
        ? steps.map(({ step, description }) => {
            return (
              <li
                key={step}
                data-content={step < activeFormStep ? '✓' : null}
                className={`step ${
                  step <= activeFormStep ? 'step-primary' : ''
                }`}
              >
                <span className='hidden md:block'>{description}</span>
              </li>
            );
          })
        : null}
    </ul>
  );
}
