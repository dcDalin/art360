/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import router from 'next/router';

import nhost from '@/lib/nhost';

import SectionWrapper from '@/components/layout/SectionWrapper';
import NextImage from '@/components/NextImage';

import { FEATURED_ARTIST } from '@/graphql/artists/queries';

export default function FeaturedArtist() {
  const { data, loading } = useQuery(FEATURED_ARTIST);

  if (loading) return <p>Loading...</p>;
  return (
    <SectionWrapper
      heading='Featured artists'
      description='Check out our amazing artists'
    >
      <div className='flex flex-col items-center justify-center space-x-0 md:flex-row md:space-x-10'>
        {data && data.artists && data.artists.length
          ? data.artists.map(
              ({ id, imageId, firstName, lastName, nickName }: any) => {
                const imageUrl = nhost.storage.getPublicUrl({
                  fileId: imageId,
                });

                return (
                  <div key={id} className='max-w-96 flex flex-col items-center'>
                    <NextImage
                      src={imageUrl}
                      className='flex items-center justify-center'
                      imgClassName='object-cover w-32 h-32 mask mask-circle'
                      useSkeleton
                      alt='sponsor'
                      width={150}
                      height={150}
                    />

                    <div className='card-body items-center py-2 text-center'>
                      <h2 className='card-title'>{`${firstName} ${lastName} - ${nickName}`}</h2>
                      <div className='card-actions'>
                        <button
                          className='btn-outline btn-primary btn-sm btn'
                          onClick={() => router.push(`/artists/${id}`)}
                        >
                          See bio
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          : null}
      </div>
    </SectionWrapper>
  );
}
