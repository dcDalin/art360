/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import nhost from '@/lib/nhost';

import PaginationNavButton from '@/components/buttons/PaginationNavButton';
import ProductCard from '@/components/cards/ProductCard';
import TableLoader from '@/components/loaders/TableLoader';

import { FETCH_PRODUCTS_FILTER_SORT_PAGINATE } from '@/graphql/products/queries';
import { RootState } from '@/redux/store';

export default function RenderArt() {
  const [pageOffset, setPageOffset] = useState(0);

  const { artist, category, searchString } = useSelector(
    (state: RootState) => state.searchArt
  );

  const PAGE_SIZE = 16;

  const { data, loading, error, refetch } = useQuery(
    FETCH_PRODUCTS_FILTER_SORT_PAGINATE,
    {
      variables: {
        limit: PAGE_SIZE,
        offset: pageOffset * PAGE_SIZE,
        condition: {
          _or: {
            artist: artist ? { _eq: artist } : { _is_null: false },
            category: category ? { _eq: category } : {},
            name: searchString ? { _ilike: `%${searchString}%` } : {},
            description: category ? { _ilike: `%${searchString}%` } : {},
          },
        },
      },
    }
  );

  useEffect(() => {
    refetch({
      condition: {
        _or: {
          artist: artist ? { _eq: artist } : { _is_null: false },
          category: category ? { _eq: category } : {},
          name: searchString ? { _ilike: `%${searchString}%` } : {},
          description: category ? { _ilike: `%${searchString}%` } : {},
        },
      },
    });
  }, [artist, category, refetch, searchString]);

  if (loading) return <TableLoader width='full' />;
  if (error) return <p>Could not fetch art</p>;

  const totalRecords = data.products_aggregate.aggregate.count;

  const pageCount = Math.ceil(totalRecords / PAGE_SIZE);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    setPageOffset(event.selected);
  };

  return (
    <>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {data && data.products && data.products.length ? (
          data.products.map(({ name, id, product_images, price }: any) => {
            let productImageUrl = '';

            if (
              product_images &&
              product_images.length &&
              product_images[0].imageId
            ) {
              productImageUrl = nhost.storage.getPublicUrl({
                fileId: product_images[0].imageId,
              });
            }

            return (
              <ProductCard
                key={id}
                id={id}
                productImageUrl={productImageUrl}
                name={name}
                price={price}
              />
            );
          })
        ) : (
          <p>No art found</p>
        )}
      </div>
      {data && data.products && data.products.length ? (
        <div className='py-6'>
          <ReactPaginate
            breakLabel='...'
            nextLabel={<PaginationNavButton type='next' />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<PaginationNavButton type='prev' />}
            renderOnZeroPageCount={null}
            className='flex items-center space-x-1'
            pageClassName='btn btn-sm btn-outline'
          />
        </div>
      ) : null}
    </>
  );
}
