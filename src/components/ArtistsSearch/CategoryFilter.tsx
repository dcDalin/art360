/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import CollapseWrapper from '@/components/ArtistsSearch/CollapseWrapper';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_CATEGORIES } from '@/graphql/categories/queries';
import { setCategoryFilter } from '@/redux/searchArt/searchArtSlice';
import { RootState } from '@/redux/store';

export default function CategoryFilter() {
  const { data, loading, error } = useQuery(READ_CATEGORIES);

  const dispatch = useDispatch();

  const { category } = useSelector((state: RootState) => state.searchArt);
  return (
    <CollapseWrapper title='Categories'>
      {loading ? (
        <TableLoader />
      ) : data && data.categories && data.categories.length ? (
        <>
          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span
                className={`label-text font-bold ${
                  !category ? 'text-accent' : ''
                }`}
              >
                Show all
              </span>
              <input
                type='checkbox'
                checked={!category}
                className='checkbox'
                onChange={() => dispatch(setCategoryFilter(null))}
              />
            </label>
          </div>
          {data.categories.map(({ id, name }: any) => {
            return (
              <div className='form-control' key={id}>
                <label className='label cursor-pointer'>
                  <span
                    className={`label-text font-bold ${
                      category === id ? 'text-accent' : ''
                    }`}
                  >
                    {name}
                  </span>
                  <input
                    type='checkbox'
                    checked={category === id}
                    className='checkbox'
                    onChange={() => dispatch(setCategoryFilter(id))}
                  />
                </label>
              </div>
            );
          })}
        </>
      ) : error ? (
        <p>Could not fetch categories</p>
      ) : null}
    </CollapseWrapper>
  );
}
