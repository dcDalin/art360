/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';

import { READ_CATEGORIES } from '@/graphql/categories/queries';
import { UPDATE_PRODUCT_CATEGORY_SUB_CATEGORY } from '@/graphql/products/mutation';
import { FETCH_PRODUCTS_BY_PK } from '@/graphql/products/queries';
import { READ_SUB_CATEGORY_BY_CATEGORY } from '@/graphql/subCategories/queries';

interface IEditProductCategoriesProvider {
  data: any;
  closeModal: () => void;
}

export default function EditProductCategoriesProvider({
  data,
  closeModal,
}: IEditProductCategoriesProvider) {
  const accessToken = useAccessToken();

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState({
    label: '',
    value: '',
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    label: '',
    value: null,
  });

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(READ_CATEGORIES);

  const {
    data: subCategoriesData,
    loading: subCategoriesLoading,
    refetch,
  } = useQuery(READ_SUB_CATEGORY_BY_CATEGORY, {
    variables: { _eq: selectedCategory.value },
  });

  useEffect(() => {
    if (
      categoriesData &&
      categoriesData.categories &&
      categoriesData.categories.length
    ) {
      const newCategoriesData = categoriesData.categories.map(
        ({
          id,
          name,
        }: {
          id: string;

          name: string;
        }) => {
          return {
            label: name,
            value: id,
          };
        }
      );
      const filteredCategories = newCategoriesData.filter(
        (obj: { label: string; value: string }) =>
          obj.value !== data.categoryByCategory.id
      );
      setCategoriesOptions(filteredCategories);
      refetch({ _eq: selectedCategory.value });
    }
  }, [
    categoriesData,
    data.categoryByCategory.id,
    refetch,
    selectedCategory.value,
  ]);

  useEffect(() => {
    if (
      subCategoriesData &&
      subCategoriesData.sub_categories &&
      subCategoriesData.sub_categories.length
    ) {
      const newSubCategoriesData = subCategoriesData.sub_categories.map(
        ({ id, name }: { id: string; name: string }) => {
          return {
            label: name,
            value: id,
          };
        }
      );
      setSubCategoriesOptions(newSubCategoriesData);
    } else {
      setSelectedSubCategory({
        label: '',
        value: null,
      });

      setSubCategoriesOptions([]);
    }
  }, [subCategoriesData]);

  const handleSelectCategory = (category: any) => {
    setSelectedCategory(category);
  };

  const handleSelectSubCategory = (subCategory: any) => {
    setSelectedSubCategory(subCategory);
  };

  const [updateCategory, { loading }] = useMutation(
    UPDATE_PRODUCT_CATEGORY_SUB_CATEGORY,
    {
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
    }
  );

  if (categoriesError) return <p>Could not fetch artists</p>;

  const handleSubmit = async () => {
    try {
      await updateCategory({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: {
          id: data.id,
          category: selectedCategory.value,
          subCategory: selectedSubCategory.value,
        },
      });
      closeModal();
      toast.success(`Product categories updated`, { id: 'prod-success' });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };
  return (
    <div>
      <div className='flex items-center space-x-4'>
        <div className='form-control w-full pb-0'>
          <label className='label cursor-pointer' htmlFor='category'>
            <span className='label-text text-base'>Category</span>
          </label>
          <Select
            isLoading={categoriesLoading}
            options={categoriesOptions}
            onChange={handleSelectCategory}
            className='z-10'
          />
        </div>
        <div className='form-control w-full pb-0'>
          <label className='label cursor-pointer' htmlFor='sub-category'>
            <span className='label-text text-base'>Sub category</span>
          </label>
          <Select
            isLoading={subCategoriesLoading}
            options={subCategoriesOptions}
            onChange={handleSelectSubCategory}
            className='z-10'
          />
        </div>
      </div>
      <button
        className={`btn-primary btn my-6 ${loading ? 'disabled: loading' : ''}`}
        type='submit'
        disabled={!selectedCategory.value}
        onClick={handleSubmit}
      >
        {loading ? 'Saving' : 'save'}
      </button>
    </div>
  );
}
