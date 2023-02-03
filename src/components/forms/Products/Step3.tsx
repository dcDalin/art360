/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { READ_ARTISTS } from '@/graphql/artists/queries';
import {
  changeActiveStep,
  setSelectedArtist,
} from '@/redux/createProduct/createProductSlice';
import { RootState } from '@/redux/store';

export default function Step3() {
  const dispatch = useDispatch();

  const { selectedArtist } = useSelector(
    (state: RootState) => state.createProduct
  );

  const [artistsOptions, setArtistsOptions] = useState([]);

  const {
    data: artistsData,
    loading: artistsLoading,
    error: artistsError,
  } = useQuery(READ_ARTISTS);

  useEffect(() => {
    if (artistsData && artistsData.artists && artistsData.artists.length) {
      const newArtistsData = artistsData.artists.map(
        ({
          id,
          firstName,
          lastName,
          nickName,
        }: {
          id: string;
          firstName: string;
          lastName: string;
          nickName: string;
        }) => {
          return {
            label: `${firstName} ${lastName} - ${nickName}`,
            value: id,
          };
        }
      );
      setArtistsOptions(newArtistsData);
    }
  }, [artistsData]);

  const handleSelectArtist = (artist: any) => {
    dispatch(setSelectedArtist(artist));
  };

  if (artistsError) return <p>Could not fetch artists</p>;

  return (
    <div className='max-w-4xl'>
      <div className='form-control w-full pb-0'>
        <label className='label cursor-pointer' htmlFor='category'>
          <span className='label-text text-base'>Artist</span>
        </label>
        <Select
          defaultValue={selectedArtist}
          isLoading={artistsLoading}
          options={artistsOptions}
          onChange={handleSelectArtist}
          className='z-10'
        />
      </div>

      <div className='flex items-center space-x-10'>
        <button
          className='btn-primary btn my-6'
          onClick={() => dispatch(changeActiveStep(2))}
        >
          prev
        </button>
        <button
          className='btn-primary btn my-6'
          type='submit'
          disabled={!selectedArtist.value}
          onClick={() => dispatch(changeActiveStep(4))}
        >
          next
        </button>
      </div>
    </div>
  );
}
