import { useMutation } from '@apollo/client';
import { useAccessToken, useFileUpload } from '@nhost/nextjs';
import router from 'next/router';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import UploadImage from '@/components/forms/UploadImage';
import ModalWrapper from '@/components/modals/ModalWrapper';

import {
  ImageUploadContext,
  UploadImageContextType,
} from '@/context/ImageUploadContext';
import { INSERT_PRODUCT_IMAGES } from '@/graphql/productImages/mutations';
import { FETCH_PRODUCTS_BY_PK } from '@/graphql/products/queries';
import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

interface INewProductImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function NewProductImageModal({
  isOpen,
  closeModal,
}: INewProductImageModalProps) {
  const accessToken = useAccessToken();
  const { id: productId } = router.query;

  const { image } = useContext(ImageUploadContext) as UploadImageContextType;

  const { upload, isUploading } = useFileUpload();

  const [insertProductImageOne, { data, loading }] = useMutation(
    INSERT_PRODUCT_IMAGES,
    {
      refetchQueries: [
        {
          query: FETCH_PRODUCTS_BY_PK,
          variables: {
            id: productId,
            _eq: productId,
          },
        },
      ],
    }
  );

  // upon submission of data, as soon as we get the id saved in db, redirect
  if (
    data &&
    data.insert_product_images_one &&
    data.insert_product_images_one.id
  ) {
    toast.success(`Image has been added`, { id: 'artist-success' });
    closeModal();
    router.replace(`${ADMIN_STORE_PRODUCTS}/edit?id=${productId}`, undefined, {
      shallow: true,
    });
  }

  const handleSubmit = async () => {
    try {
      if (image && image[0] && image[0].file) {
        const { file } = image[0];
        const { id: imageId, isUploaded, isError } = await upload({ file });

        if (isError) {
          toast.error('Something went wrong while uploading the image', {
            id: 'isError',
          });
        } else if (isUploaded) {
          // submit rest of the form

          await insertProductImageOne({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            },
            variables: { productId, imageId },
          });
        }
      } else {
        toast.error('No image file found', { id: 'error-no-image' });
      }
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      closeModal={closeModal}
      title='Add product image'
    >
      <div className='w-full'>
        <UploadImage title='Product image' />
        {!image || image.length === 0 ? (
          <p>No image</p>
        ) : (
          <button
            onClick={handleSubmit}
            className={`btn-primary btn my-4 ${
              isUploading || loading ? 'loading' : ''
            }`}
            disabled={isUploading || loading}
          >
            {isUploading || loading ? 'Saving' : 'Save'}
          </button>
        )}
      </div>
    </ModalWrapper>
  );
}
