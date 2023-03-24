import router from 'next/router';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import nhost from '@/lib/nhost';

import EditCardWrapper from '@/components/forms/Products/EditCardWrapper';
import EditProductArtistProvider from '@/components/forms/Products/EditProductArtistProvider';
import EditProductCategoriesProvider from '@/components/forms/Products/EditProductCategoriesProvider';
import EditProductDetailsProvider from '@/components/forms/Products/EditProductDetailsProvider';
import ModalWrapper from '@/components/modals/ModalWrapper';
import NextImage from '@/components/NextImage';

import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

interface IEditProductsProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function EditProductsProvider({
  data,
}: IEditProductsProviderProps) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [openEditArtistsModal, setOpenEditArtistsModal] = useState(false);
  const [openEditCategories, setOpenEditCategories] = useState(false);

  if (!data || !data.artistByArtist) return <p>No artist found</p>;

  const imageUrl = nhost.storage.getPublicUrl({
    fileId: data.artistByArtist.imageId,
  });

  return (
    <div className='max-w-4xl'>
      <EditCardWrapper
        title='Product details'
        handleClick={() => setOpenProductDetailsModal(true)}
      >
        <h4 className='text-xl'>{data.name}</h4>
        <div
          tabIndex={0}
          className={`rounded-box collapse border border-base-300 bg-base-100 ${
            descriptionOpen ? 'collapse-open' : 'collapse-close'
          }`}
        >
          <div className='flex items-center justify-between px-4'>
            <div className='collapse-title px-0 font-medium'>
              Product description
            </div>
            <div
              className='tooltip tooltip-left tooltip-info'
              data-tip={descriptionOpen ? 'Close' : 'Show description'}
            >
              <button
                className='btn-outline btn-sm btn-square btn'
                onClick={() =>
                  setDescriptionOpen((descriptionOpen) => !descriptionOpen)
                }
              >
                {descriptionOpen ? <BsChevronUp /> : <BsChevronDown />}
              </button>
            </div>
          </div>
          <div className='collapse-content'>
            <p>{data.description}</p>
          </div>
        </div>

        <div className='stats shadow'>
          <div className='stat'>
            <div className='stat-title'>Price</div>
            <div className='stat-value text-primary'>{`KES ${data.price.toLocaleString(
              2
            )}`}</div>
          </div>
        </div>
      </EditCardWrapper>

      <EditCardWrapper
        title='Artist'
        handleClick={() => setOpenEditArtistsModal(true)}
      >
        <div className='stats shadow'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <figure className='mask mask-square'>
                <NextImage
                  src={imageUrl}
                  imgClassName='object-contain w-20 h-20'
                  useSkeleton
                  alt='sponsor'
                  width={100}
                  height={100}
                />
              </figure>
            </div>
            <div className='stat-value text-base font-bold'>
              {`${data.artistByArtist.firstName} ${data.artistByArtist.lastName}`}
            </div>
            <div className='stat-title font-bold'>
              {data.artistByArtist.nickName}
            </div>
          </div>
        </div>
      </EditCardWrapper>

      <EditCardWrapper
        title='Categories'
        handleClick={() => setOpenEditCategories(true)}
      >
        <div className='stats stats-vertical shadow lg:stats-horizontal'>
          <div className='stat'>
            <div className='stat-title'>Category</div>
            <div className='stat-desc'>
              <span className='badge'>{data.categoryByCategory.name}</span>
            </div>
          </div>

          {data.subCategoryBySubCategory &&
          data.subCategoryBySubCategory.name ? (
            <div className='stat'>
              <div className='stat-title'>Sub category</div>
              <div className='stat-desc'>
                <span className='badge'>
                  {data.subCategoryBySubCategory.name}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </EditCardWrapper>

      <EditCardWrapper
        title='Product images'
        handleClick={() =>
          router.push(`${ADMIN_STORE_PRODUCTS}/edit-image?id=${data.id}`)
        }
      >
        <div className='flex flex-wrap items-center'>
          {data.product_images && data.product_images.length ? (
            data.product_images.map(
              ({ imageId, id }: { imageId: string; id: string }) => {
                let productImageUrl = '';

                if (imageId) {
                  productImageUrl = nhost.storage.getPublicUrl({
                    fileId: imageId,
                  });
                }

                return (
                  <figure key={id} className='mask mask-square'>
                    <NextImage
                      src={productImageUrl}
                      imgClassName='object-contain w-20 h-20'
                      useSkeleton
                      alt='sponsor'
                      width={100}
                      height={100}
                    />
                  </figure>
                );
              }
            )
          ) : (
            <p>No product images found</p>
          )}
        </div>
      </EditCardWrapper>

      <ModalWrapper
        isOpen={openProductDetailsModal}
        closeModal={() => setOpenProductDetailsModal(false)}
        title='Edit product details'
      >
        <EditProductDetailsProvider
          data={data}
          closeModal={() => setOpenProductDetailsModal(false)}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={openEditArtistsModal}
        closeModal={() => setOpenEditArtistsModal(false)}
        title='Edit artist'
      >
        <EditProductArtistProvider
          data={data}
          closeModal={() => setOpenEditArtistsModal(false)}
        />
      </ModalWrapper>

      <ModalWrapper
        isOpen={openEditCategories}
        closeModal={() => setOpenEditCategories(false)}
        title='Edit product category'
      >
        <EditProductCategoriesProvider
          data={data}
          closeModal={() => setOpenEditCategories(false)}
        />
      </ModalWrapper>
    </div>
  );
}
