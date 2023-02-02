import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { changeActiveStep } from '@/redux/createProduct/createProductSlice';

export default function Step2() {
  const dispatch = useDispatch();

  return (
    <div className='max-w-4xl'>
      <Select />

      <div className='flex items-center space-x-10'>
        <button
          className='btn-primary btn my-6'
          onClick={() => dispatch(changeActiveStep(1))}
        >
          prev
        </button>
        <button className='btn-primary btn my-6' type='submit'>
          next
        </button>
      </div>
    </div>
  );
}
