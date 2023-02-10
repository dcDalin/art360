/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import CollapseWrapper from '@/components/ArtistsSearch/CollapseWrapper';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ARTISTS } from '@/graphql/artists/queries';
import { setArtist } from '@/redux/searchArt/searchArtSlice';
import { RootState } from '@/redux/store';

export default function ArtistsFilter() {
  const { data, loading, error } = useQuery(READ_ARTISTS);

  const dispatch = useDispatch();

  const { artist } = useSelector((state: RootState) => state.searchArt);
  return (
    <CollapseWrapper title='Artists'>
      {loading ? (
        <TableLoader />
      ) : data && data.artists && data.artists.length ? (
        <>
          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span
                className={`label-text font-bold ${
                  !artist ? 'text-accent' : ''
                }`}
              >
                Show all
              </span>
              <input
                type='checkbox'
                checked={!artist}
                className='checkbox'
                onChange={() => dispatch(setArtist(null))}
              />
            </label>
          </div>
          {data.artists.map(({ id, firstName, lastName, nickName }: any) => {
            return (
              <div className='form-control' key={id}>
                <label className='label cursor-pointer'>
                  <span
                    className={`label-text font-bold ${
                      artist === id ? 'text-accent' : ''
                    }`}
                  >
                    {`${firstName} ${lastName} - ${nickName}`}
                  </span>
                  <input
                    type='checkbox'
                    checked={artist === id}
                    className='checkbox'
                    onChange={() => dispatch(setArtist(id))}
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
