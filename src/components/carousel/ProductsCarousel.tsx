/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import router from 'next/router';

import nhost from '@/lib/nhost';

import NextImage from '@/components/NextImage';

import { FETCH_NEW_GALLERY_ITEMS } from '@/graphql/gallery/queries';

export default function ProductsCarousel() {
  const { data } = useQuery(FETCH_NEW_GALLERY_ITEMS);

  return (
    <>
      {data && data.gallery && data.gallery.length ? (
        <div className='carousel-center carousel w-full space-x-4 rounded-sm bg-neutral p-4'>
          {data && data.gallery && data.gallery.length
            ? data.gallery.map(({ id, imageId }: any) => {
                let productImageUrl = '';

                productImageUrl = nhost.storage.getPublicUrl({
                  fileId: imageId,
                });

                return (
                  <div
                    className='carousel-item cursor-pointer'
                    key={id}
                    onClick={() => router.push(`/shop/${id}`)}
                  >
                    <NextImage
                      className='flex w-60 items-center justify-center rounded-t-xl'
                      imgClassName='w-full h-72 object-contain'
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
      ) : null}
    </>
  );
}
