/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

import nhost from '@/lib/nhost';

import ArtistCard from '@/components/cards/ArtistCard';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ARTISTS_FILTER } from '@/graphql/artists/queries';

export default function ArtistsPage() {
  const [artistName, setArtistName] = useState('');

  const { data, loading, error } = useQuery(READ_ARTISTS_FILTER, {
    variables: {
      condition: {
        _or: [
          { firstName: { _ilike: `%${artistName}%` } },
          { lastName: { _ilike: `%${artistName}%` } },
          { nickName: { _ilike: `%${artistName}%` } },
        ],
      },
    },
  });

  if (error) return <p>Could not fetch artists</p>;

  return (
    <Layout templateTitle='Artists'>
      <SectionWrapper heading='Artists'>
        <>
          <div className='flex w-full items-center justify-center'>
            <div className='form-control'>
              <div className='input-group'>
                <DebounceInput
                  minLength={2}
                  debounceTimeout={300}
                  onChange={(e) => setArtistName(e.target.value)}
                  className='input-bordered input w-full'
                  placeholder='Search…'
                  value={artistName}
                />

                <button className='btn-primary btn-square btn'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {loading ? (
            <TableLoader width='full' />
          ) : (
            <div className='grid grid-cols-2 gap-0 md:grid-cols-4 md:gap-4'>
              {data && data.artists && data.artists.length
                ? data.artists.map(
                    ({
                      id,
                      firstName,
                      lastName,
                      nickName,
                      imageId,
                      artists_genres_pivots,
                    }: any) => {
                      const imageUrl = nhost.storage.getPublicUrl({
                        fileId: imageId,
                      });

                      return (
                        <ArtistCard
                          imageUrl={imageUrl}
                          key={id}
                          artistId={id}
                          firstName={firstName}
                          lastName={lastName}
                          nickName={nickName}
                          genres={artists_genres_pivots}
                        />
                      );
                    }
                  )
                : null}
            </div>
          )}
        </>
      </SectionWrapper>
    </Layout>
  );
}
