import { RiFilterLine, RiFilterOffFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { clearFilters } from '@/redux/searchArt/searchArtSlice';
import { RootState } from '@/redux/store';

export default function FilterDisplay() {
  const dispatch = useDispatch();

  const { filtersActive } = useSelector((state: RootState) => state.searchArt);

  return (
    <div className='flex items-center justify-between'>
      <h1>Filter results</h1>
      {filtersActive ? (
        <div className='tooltip cursor-pointer' data-tip='Clear all filters'>
          <button
            className='btn-outline btn-sm btn-circle btn'
            onClick={() => dispatch(clearFilters())}
          >
            <RiFilterLine className='text-lg' />
          </button>
        </div>
      ) : (
        <div className='tooltip cursor-pointer' data-tip='No filters applied'>
          <button className='btn-outline btn-sm btn-circle btn'>
            <RiFilterOffFill className='text-lg' />
          </button>
        </div>
      )}
    </div>
  );
}
