/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import router from 'next/router';

import nhost from '@/lib/nhost';

import NextImage from '@/components/NextImage';

import { FETCH_NEW_PRODUCTS } from '@/graphql/products/queries';

export default function ProductsCarousel() {
  const { data } = useQuery(FETCH_NEW_PRODUCTS);

  return (
    <div className='carousel-center carousel w-full space-x-4 rounded-sm bg-neutral p-4'>
      {data && data.products && data.products.length
        ? data.products.map(({ id, product_images }: any) => {
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
              <div
                className='carousel-item cursor-pointer'
                key={id}
                onClick={() => router.push(`/art/${id}`)}
              >
                <NextImage
                  className='flex w-60 items-center justify-center rounded-t-xl'
                  imgClassName='w-full h-72 object-cover'
                  src={productImageUrl}
                  alt='artist'
                  width={1000}
                  height={1000}
                />
              </div>
            );
          })
        : null}
    </div>
  );
}
