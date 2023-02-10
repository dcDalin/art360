import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import nhost from '@/lib/nhost';

import ArtView from '@/components/cards/ArtViewCard';
import Layout from '@/components/layout/Layout';
import TableLoader from '@/components/loaders/TableLoader';
import NextImage from '@/components/NextImage';

import { FETCH_PRODUCTS_BY_PK } from '@/graphql/products/queries';

export default function ArtPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(FETCH_PRODUCTS_BY_PK, {
    variables: { id, _eq: id },
  });

  if (error) return <p>Could not fetch art</p>;

  if (loading) return <TableLoader width='full' />;
  return (
    <Layout templateTitle='Artists'>
      {loading ? (
        <TableLoader width='full' />
      ) : data && data.products_by_pk ? (
        <div className='flex flex-col space-x-0 md:flex-row md:space-x-8'>
          <div className='w-full md:w-2/3'>
            <ArtView
              images={
                data.products_by_pk &&
                data.products_by_pk.product_images &&
                data.products_by_pk.product_images.length
                  ? data.products_by_pk.product_images
                  : []
              }
            />
            {/* desktop */}
            <div className='hidden flex-col space-y-2 md:flex'>
              <h1 className='text-4xl font-bold'>{data.products_by_pk.name}</h1>
              <div className='flex items-center space-x-2'>
                <div className='badge badge-lg'>
                  {data.products_by_pk.categoryByCategory.name}
                </div>
                {data.products_by_pk.subCategoryBySubCategory ? (
                  <div className='badge-secondary badge badge-lg'>
                    {data.products_by_pk.subCategoryBySubCategory.name}
                  </div>
                ) : null}
              </div>
              <div className='py-2'>{data.products_by_pk.description}</div>
              <div className='my-4'>
                <div className='font-bold'>Art by</div>
                <div
                  className='flex cursor-pointer items-center space-x-2 bg-base-100 py-4 px-4 pt-4'
                  onClick={() =>
                    router.push(
                      `/artists/${data.products_by_pk.artistByArtist.id}`
                    )
                  }
                >
                  <NextImage
                    src={nhost.storage.getPublicUrl({
                      fileId: data.products_by_pk.artistByArtist.imageId,
                    })}
                    imgClassName='w-12 h-12 rounded-full object-cover'
                    useSkeleton
                    alt='art'
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className='text-xl'>{`${data.products_by_pk.artistByArtist.firstName} ${data.products_by_pk.artistByArtist.lastName}`}</div>
                    <div className='text-xl font-bold'>{`${data.products_by_pk.artistByArtist.nickName}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full rounded-sm bg-base-100  px-4 md:w-1/3'>
            <div>
              {/* mobile */}
              <div className='flex flex-col md:hidden'>
                <div className='flex items-center justify-between py-4'>
                  <h1 className='text-xl'>{data.products_by_pk.name}</h1>
                  <div className='text-2xl font-bold text-primary'>{`Ksh. ${data.products_by_pk.price.toLocaleString()}`}</div>
                </div>
                <div className='flex items-center space-x-2 pb-4'>
                  <div className='badge badge-lg'>
                    {data.products_by_pk.categoryByCategory.name}
                  </div>
                  {data.products_by_pk.subCategoryBySubCategory ? (
                    <div className='badge-secondary badge badge-lg'>
                      {data.products_by_pk.subCategoryBySubCategory.name}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* end mobile */}

              {/* desktop */}
              <div className='hidden py-4 md:flex'>
                <div className='text-4xl font-bold text-primary'>{`Ksh. ${data.products_by_pk.price.toLocaleString()}`}</div>
              </div>
              {/* end */}

              <button className='btn-primary btn-block btn'>Add to cart</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </Layout>
  );
}
