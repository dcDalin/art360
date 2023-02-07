import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import router from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io';

import nhost from '@/lib/nhost';

import ModalWrapper from '@/components/modals/ModalWrapper';
import NewProductImageModal from '@/components/modals/NewProductImageModal';
import NextImage from '@/components/NextImage';

import { DELETE_PRODUCT_IMAGE_BY_PK } from '@/graphql/productImages/mutations';
import { FETCH_PRODUCTS_BY_PK } from '@/graphql/products/queries';
import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

interface IEditProductImagesProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function EditProductImagesProvider({
  data,
}: IEditProductImagesProviderProps) {
  const accessToken = useAccessToken();
  const { id } = router.query;

  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [imageIdToDelete, setImageIdToDelete] = useState('');

  // product_images table
  const [tableIdToDelete, setTableIdToDelete] = useState('');

  const [deleteImageByPk, { loading }] = useMutation(
    DELETE_PRODUCT_IMAGE_BY_PK,
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

  if (!data || !data.artistByArtist) return <p>No product found</p>;

  const handleDeleteImage = async () => {
    try {
      // delete from storage/files
      const { error } = await nhost.storage.delete({ fileId: imageIdToDelete });

      if (error) {
        toast.error('Could not delete image', { id: 'error-delete' });
      } else {
        await deleteImageByPk({
          context: {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
          // delete from product_images table
          variables: { id: tableIdToDelete },
        });
        toast.success(`Image has been added`, { id: 'artist-success' });
        setOpenConfirmDeleteModal(false);
      }
    } catch (error) {
      toast.error('Something went wrong', { id: 'catch-error' });
    }
  };
  return (
    <div className='max-w-4xl'>
      <div className='flex items-center space-x-2 pb-4'>
        <div className='tooltip' data-tip='back'>
          <button
            className='btn-outline btn-sm btn-circle btn'
            onClick={() =>
              router.replace(
                `${ADMIN_STORE_PRODUCTS}/edit?id=${id}`,
                undefined,
                { shallow: true }
              )
            }
          >
            <IoMdArrowBack className='text-lg' />
          </button>
        </div>

        <h1 className='text-lg md:text-2xl'>Edit product images</h1>
      </div>
      <button className='btn-outline btn' onClick={() => setOpenModal(true)}>
        Add new image
      </button>

      <div className='flex flex-wrap py-10'>
        {data.product_images && data.product_images.length ? (
          data.product_images.map(
            ({ id, imageId }: { id: string; imageId: string }) => {
              const imageUrl = nhost.storage.getPublicUrl({
                fileId: imageId,
              });

              return (
                <div
                  key={id}
                  className='max-w-96 card'
                  onClick={() => {
                    setImageIdToDelete(imageId);
                    setTableIdToDelete(id);
                    setOpenConfirmDeleteModal(true);
                  }}
                >
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
                    <div className='card-actions'>
                      <button className='btn-error btn-sm btn'>delete</button>
                    </div>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <p>No product images found</p>
        )}
      </div>

      <NewProductImageModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
      />

      <ModalWrapper
        isOpen={openConfirmDeleteModal}
        closeModal={() => {
          setOpenConfirmDeleteModal(false);
          setImageIdToDelete('');
          setTableIdToDelete('');
        }}
        title='Are you sure you want to delete the image?'
      >
        <div className='flex items-center justify-between pt-4'>
          <button
            onClick={() => {
              setOpenConfirmDeleteModal(false);
              setImageIdToDelete('');
              setTableIdToDelete('');
            }}
            className='btn-primary btn-sm btn'
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleDeleteImage}
            className={`btn-error btn-sm btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Deleting' : 'Delete'}
          </button>
        </div>
      </ModalWrapper>
    </div>
  );
}
