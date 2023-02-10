import { useQuery } from '@apollo/client';
import { ImSpinner2 } from 'react-icons/im';
import { useSelector } from 'react-redux';

import { FETCH_PRODUCTS_FILTER_SORT_AGGREGATE } from '@/graphql/products/queries';
import { RootState } from '@/redux/store';

export default function SummaryCountBadge() {
  const { artist, category, searchString } = useSelector(
    (state: RootState) => state.searchArt
  );

  const { data, loading, error } = useQuery(
    FETCH_PRODUCTS_FILTER_SORT_AGGREGATE,
    {
      variables: {
        condition: {
          _or: {
            artist: artist ? { _eq: artist } : {},
            category: category ? { _eq: category } : {},
            name: searchString ? { _ilike: `%${searchString}%` } : {},
            description: category ? { _ilike: `%${searchString}%` } : {},
          },
        },
      },
    }
  );

  if (error) return <p>Could not count results</p>;

  return (
    <div className='flex-end flex'>
      <div className='badge badge-lg'>
        {loading ? (
          <ImSpinner2 className='flex animate-spin' />
        ) : data && data.products_aggregate ? (
          `${data.products_aggregate.aggregate.count.toLocaleString()} ${
            data.products_aggregate.aggregate.count === 1 ? 'result' : 'results'
          } found`
        ) : (
          'Could not count'
        )}
      </div>
    </div>
  );
}
