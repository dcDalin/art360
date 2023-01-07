/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';

import nhost from '@/lib/nhost';

import NextImage from '@/components/NextImage';

import { READ_ALL_SPONSORS } from '@/graphql/queries';

export default function SponsorsCarousel() {
  const { data, loading } = useQuery(READ_ALL_SPONSORS);

  if (loading) return <p>Loading...</p>;

  return (
    <div className=' w-full border border-red-900'>
      {data && data.sponsors && data.sponsors.length
        ? data.sponsors.map(({ id, imageId }: any) => {
            const imageUrl = nhost.storage.getPublicUrl({
              fileId: imageId,
            });
            return (
              <div key={id}>
                <NextImage
                  src={imageUrl}
                  imgClassName='object-cover h-full'
                  useSkeleton
                  alt='sponsor'
                  width={100}
                  height={100}
                />
              </div>
            );
          })
        : null}
    </div>
  );
}
