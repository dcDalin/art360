import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchString } from '@/redux/searchArt/searchArtSlice';
import { RootState } from '@/redux/store';

export default function SearchBox() {
  const dispatch = useDispatch();

  const { searchString } = useSelector((state: RootState) => state.searchArt);
  return (
    <div className='form-control w-full'>
      <div className='input-group-sm input-group md:input-group-md'>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={(e) => dispatch(setSearchString(e.target.value))}
          className='input-bordered input w-full'
          placeholder='Search…'
          value={searchString}
        />

        <button className='btn-square btn'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
