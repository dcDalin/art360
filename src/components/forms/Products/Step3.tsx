/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import router from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { READ_ARTISTS } from '@/graphql/artists/queries';
import { INSERT_PRODUCT } from '@/graphql/products/mutation';
import { FETCH_PRODUCTS } from '@/graphql/products/queries';
import {
  changeActiveStep,
  setSelectedArtist,
} from '@/redux/createProduct/createProductSlice';
import { RootState } from '@/redux/store';
import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

export default function Step3() {
  const dispatch = useDispatch();
  const accessToken = useAccessToken();

  const [artistsOptions, setArtistsOptions] = useState([]);

  const { selectedArtist, formData, selectedCategory, selectedSubCategory } =
    useSelector((state: RootState) => state.createProduct);

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

  const [insertProductOne, { data, loading }] = useMutation(INSERT_PRODUCT, {
    refetchQueries: [FETCH_PRODUCTS],
  });

  // upon submission of data, as soon as we get the id saved in db, redirect
  if (data && data.insert_products_one && data.insert_products_one.id) {
    router.replace(
      `${ADMIN_STORE_PRODUCTS}/edit-image?id=${data.insert_products_one.id}`,
      undefined,
      { shallow: true }
    );
  }

  const handleCreateProductSubmit = async () => {
    try {
      await insertProductOne({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: {
          artist: selectedArtist.value,
          category: selectedCategory.value,
          description: formData.description,
          name: formData.name,
          price: formData.price,
          priceFrame: formData.priceFrame,
          subCategory: selectedSubCategory.value,
          isUnique: formData.isUnique,
        },
      });

      toast.success(`Product added`, { id: 'prod-success' });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
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
          className={`btn-primary btn my-6 ${
            loading ? 'loading disabled' : ''
          }`}
          onClick={() => dispatch(changeActiveStep(2))}
        >
          prev
        </button>
        <button
          className={`btn-primary btn my-6 ${
            loading ? 'disabled: loading' : ''
          }`}
          type='submit'
          disabled={!selectedArtist.value}
          onClick={handleCreateProductSubmit}
        >
          {loading ? 'Saving' : 'save'}
        </button>
      </div>
    </div>
  );
}
