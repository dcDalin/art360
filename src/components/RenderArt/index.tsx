/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import nhost from '@/lib/nhost';

import ProductCard from '@/components/cards/ProductCard';
import TableLoader from '@/components/loaders/TableLoader';

import { FETCH_PRODUCTS_FILTER_SORT_PAGINATE } from '@/graphql/products/queries';
import { RootState } from '@/redux/store';

export default function RenderArt() {
  const { artist, category, searchString } = useSelector(
    (state: RootState) => state.searchArt
  );

  const { data, loading, error, refetch } = useQuery(
    FETCH_PRODUCTS_FILTER_SORT_PAGINATE,
    {
      variables: {
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
  return (
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
  );
}
