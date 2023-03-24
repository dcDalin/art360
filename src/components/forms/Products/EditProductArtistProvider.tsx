/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';

import nhost from '@/lib/nhost';

import NextImage from '@/components/NextImage';

import { READ_ARTISTS } from '@/graphql/artists/queries';
import { UPDATE_PRODUCT_ARTIST } from '@/graphql/products/mutation';
import { FETCH_PRODUCTS_BY_PK } from '@/graphql/products/queries';

interface IEditProductArtistProvider {
  data: any;
  closeModal: () => void;
}

export default function EditProductArtistProvider({
  data,
  closeModal,
}: IEditProductArtistProvider) {
  const accessToken = useAccessToken();

  const [artistsOptions, setArtistsOptions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState({
    label: '',
    value: '',
  });

  let imageUrl = '';

  if (data && data.artistByArtist && data.artistByArtist.imageId) {
    imageUrl = nhost.storage.getPublicUrl({
      fileId: data.artistByArtist.imageId,
    });
  }

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

      const filterArtistData = newArtistsData.filter(
        (obj: { label: string; value: string }) =>
          obj.value !== data.artistByArtist.id
      );
      setArtistsOptions(filterArtistData);
    }
  }, [artistsData, data.artistByArtist.id]);

  const handleSelectArtist = (artist: any) => {
    setSelectedArtist(artist);
  };

  const [updateArtist, { loading }] = useMutation(UPDATE_PRODUCT_ARTIST, {
    refetchQueries: [
      {
        query: FETCH_PRODUCTS_BY_PK,
        variables: {
          // product id
          id: data.id,
          _eq: data.id,
        },
      },
    ],
  });

  if (artistsError) return <p>Could not fetch artists</p>;

  const handleSubmit = async () => {
    try {
      await updateArtist({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: {
          id: data.id,
          artist: selectedArtist.value,
        },
      });
      closeModal();
      toast.success(`Product artist updated`, { id: 'prod-success' });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };
  return (
    <div>
      <div className='pt-4'>
        <div>Current artist:</div>
        {data && data.artistByArtist && data.artistByArtist.id ? (
          <>
            <NextImage
              src={imageUrl}
              useSkeleton
              alt={data.artistByArtist.nickName}
              width={100}
              height={100}
            />

            <div className='font-bold'>
              {`${data.artistByArtist.firstName} ${data.artistByArtist.lastName} - ${data.artistByArtist.firstName}`}
            </div>
          </>
        ) : (
          <p>No artist found</p>
        )}
      </div>

      <div className='form-control w-full pb-0'>
        <label className='label cursor-pointer' htmlFor='category'>
          <span className='label-text text-base'>Artist</span>
        </label>
        <Select
          isLoading={artistsLoading}
          options={artistsOptions}
          onChange={handleSelectArtist}
          className='z-10'
        />
      </div>
      <button
        className={`btn-primary btn my-6 ${loading ? 'disabled: loading' : ''}`}
        type='submit'
        disabled={!selectedArtist.value}
        onClick={handleSubmit}
      >
        {loading ? 'Saving' : 'save'}
      </button>
    </div>
  );
}
