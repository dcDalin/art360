/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { READ_CATEGORIES } from '@/graphql/categories/queries';
import { READ_SUB_CATEGORY_BY_CATEGORY } from '@/graphql/subCategories/queries';
import {
  changeActiveStep,
  setSelectedCategory,
  setSelectedSubCategory,
} from '@/redux/createProduct/createProductSlice';
import { RootState } from '@/redux/store';

export default function Step2() {
  const dispatch = useDispatch();

  const { selectedCategory, selectedSubCategory } = useSelector(
    (state: RootState) => state.createProduct
  );

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(READ_CATEGORIES);

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
        ({ id, name }: { id: string; name: string }) => {
          return {
            label: name,
            value: id,
          };
        }
      );
      setCategoriesOptions(newCategoriesData);
      refetch({ _eq: selectedCategory.value });
    }
  }, [categoriesData, refetch, selectedCategory.value]);

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
      dispatch(
        setSelectedSubCategory({
          label: '',
          value: null,
        })
      );
      setSubCategoriesOptions([]);
    }
  }, [dispatch, subCategoriesData]);

  const handleSelectCategory = (category: any) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSelectSubCategory = (subCategory: any) => {
    dispatch(setSelectedSubCategory(subCategory));
  };

  return (
    <div className='max-w-4xl'>
      <div className='flex items-center justify-between space-x-4'>
        <div className='form-control w-full pb-0'>
          <label className='label cursor-pointer' htmlFor='category'>
            <span className='label-text text-base'>Category</span>
          </label>
          <Select
            defaultValue={selectedCategory}
            isLoading={categoriesLoading}
            options={categoriesOptions}
            onChange={handleSelectCategory}
            className='z-10'
          />
        </div>

        {selectedCategory.value && subCategoriesOptions.length === 0 ? (
          <div className='form-control w-full pb-0'>
            <label className='label cursor-pointer' htmlFor='sub-category'>
              <span className='label-text text-base'>Sub Category</span>
            </label>
            <Select isDisabled={true} className='z-10' />
          </div>
        ) : selectedCategory.value && subCategoriesOptions.length ? (
          <div className='form-control w-full pb-0'>
            <label className='label cursor-pointer' htmlFor='sub-category'>
              <span className='label-text text-base'>Sub Category</span>
            </label>
            <Select
              defaultValue={selectedSubCategory}
              isLoading={subCategoriesLoading}
              onChange={handleSelectSubCategory}
              options={subCategoriesOptions}
              className='z-10'
            />
          </div>
        ) : (
          <p>Select category</p>
        )}
      </div>

      <div className='flex items-center space-x-10'>
        <button
          className='btn-primary btn my-6'
          onClick={() => dispatch(changeActiveStep(1))}
        >
          prev
        </button>
        <button
          className='btn-primary btn my-6'
          type='submit'
          disabled={!selectedCategory.value}
          onClick={() => dispatch(changeActiveStep(3))}
        >
          next
        </button>
      </div>
    </div>
  );
}
