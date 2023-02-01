/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';

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
                  <div key={id} className='max-w-96 card'>
                    <figure className='mask mask-square pt-10'>
                      <NextImage
                        src={imageUrl}
                        imgClassName='object-contain w-32 h-32'
                        useSkeleton
                        alt='sponsor'
                        width={100}
                        height={100}
                      />
                    </figure>
                    <div className='card-body items-center py-2 text-center'>
                      <h2 className='card-title'>{`${firstName} ${lastName} - ${nickName}`}</h2>
                      <div className='card-actions'>
                        <button className='btn-outline btn-primary btn-sm btn'>
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
