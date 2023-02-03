import { useMutation } from '@apollo/client';
import { useAccessToken, useFileUpload } from '@nhost/react';
import router from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ImageUploading from 'react-images-uploading';
import { useDispatch, useSelector } from 'react-redux';

import NextImage from '@/components/NextImage';

import { INSERT_PRODUCT_IMAGES } from '@/graphql/productImages/mutations';
import { INSERT_PRODUCT } from '@/graphql/products/mutation';
import { changeActiveStep } from '@/redux/createProduct/createProductSlice';
import { RootState } from '@/redux/store';
import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

export default function Step4() {
  const accessToken = useAccessToken();
  const { upload, isUploading } = useFileUpload();

  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const maxNumber = 10;

  const { selectedArtist, formData, selectedCategory, selectedSubCategory } =
    useSelector((state: RootState) => state.createProduct);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (imageList: any) => {
    // data for submit
    setImages(imageList);
  };

  const [insertProductOne, { data, loading }] = useMutation(INSERT_PRODUCT);

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
          subCategory: selectedSubCategory.value,
        },
      });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  const [insertProductImages, { loading: productImagesLoading }] = useMutation(
    INSERT_PRODUCT_IMAGES
  );

  useEffect(() => {
    const uploadImages = async () => {
      for (let i = 0; i < images.length; i++) {
        const { file } = images[i];
        const { id, isUploaded, isError } = await upload({ file });

        if (isError) {
          toast.error('Something went wrong while uploading the image', {
            id: 'isError',
          });
        } else if (isUploaded) {
          // submit rest of the form

          await insertProductImages({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            },
            variables: { productId: data.insert_products_one.id, imageId: id },
          });
        }

        if (images.length - 1 === i) {
          toast.success(`All images uploaded`, { id: 'image-success' });
          // TODO: reset redux state

          router.replace(ADMIN_STORE_PRODUCTS, undefined, { shallow: true });
        }
      }
    };

    uploadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.insert_products_one.id]);

  return (
    <div className='max-w-4xl'>
      <div className='App'>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey='data_url'
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            dragProps,
          }) => (
            // write your building UI
            <div className=''>
              <div className='btn-group-horizontal btn-group'>
                <button
                  className='btn-outline btn btn-xs md:btn-md'
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  upload images
                </button>
                <button
                  className='btn-outline btn btn-xs md:btn-md'
                  onClick={onImageRemoveAll}
                >
                  Remove all images
                </button>
              </div>
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className='card my-4 w-full bg-base-100 shadow-xl md:w-64'
                >
                  <NextImage
                    className='mask mask-square mx-4 my-2 h-20 w-20'
                    src={image['data_url']}
                    alt=''
                    width={100}
                    height={100}
                  />

                  <div className='btn-sm btn-group my-2'>
                    <button
                      className='btn-outline btn btn-sm'
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      className='btn-outline btn btn-sm'
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <div className='flex items-center space-x-10'>
        <button
          className='btn btn-primary my-6'
          onClick={() => dispatch(changeActiveStep(2))}
        >
          prev
        </button>
        <button
          className='btn btn-primary my-6'
          type='submit'
          // disabled={images.length === 0}
          onClick={handleCreateProductSubmit}
        >
          {loading
            ? 'Saving product'
            : productImagesLoading
            ? 'Saving images'
            : isUploading
            ? 'Uploading'
            : 'save'}
        </button>
      </div>
    </div>
  );
}
