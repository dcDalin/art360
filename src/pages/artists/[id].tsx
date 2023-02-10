import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import nhost from '@/lib/nhost';

import ProductCard from '@/components/cards/ProductCard';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';
import ProductCategorySideNav from '@/components/navigation/ProductCategorySideNav';
import NextImage from '@/components/NextImage';

import { ARTIST_PROFILE } from '@/graphql/artists/queries';

export default function Artist() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(ARTIST_PROFILE, {
    variables: { id, _eq: id },
  });

  let imageUrl = '';

  if (data && data.artists_by_pk) {
    imageUrl = nhost.storage.getPublicUrl({
      fileId: data.artists_by_pk.imageId,
    });
  }

  if (error) return <p>Could not fetch artist profile</p>;

  return (
    <Layout templateTitle='Artists'>
      {loading ? (
        <TableLoader width='full' />
      ) : data && data.artists_by_pk ? (
        <div className='py-4'>
          <div className='flex w-full items-center justify-center'>
            <NextImage
              className='flex items-center justify-center'
              imgClassName='w-24 h-24 object-cover rounded-full'
              src={imageUrl}
              alt='artist'
              width={1000}
              height={1000}
            />
          </div>
          <SectionWrapper
            heading={`${data.artists_by_pk.nickName}`}
            description={`${data.artists_by_pk.firstName} ${data.artists_by_pk.lastName}`}
          >
            <div className='flex space-x-8'>
              <ProductCategorySideNav />

              <div>{data.artists_by_pk.bio}</div>
            </div>
            <SectionWrapper
              description={`Art made by ${data.artists_by_pk.nickName}`}
            >
              <div className='flex w-full items-center justify-center space-x-4 overflow-x-auto'>
                {data.artists_by_pk.products &&
                data.artists_by_pk.products.length ? (
                  data.artists_by_pk.products.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ({ id, name, price, product_images }: any) => {
                      const productImageUrl = nhost.storage.getPublicUrl({
                        fileId: product_images[0].imageId,
                      });
                      return (
                        <div key={id} className='w-36'>
                          <ProductCard
                            id={id}
                            productImageUrl={productImageUrl}
                            name={name}
                            price={price}
                          />
                        </div>
                      );
                    }
                  )
                ) : (
                  <p>Art will be made soon</p>
                )}
              </div>
            </SectionWrapper>
          </SectionWrapper>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </Layout>
  );
}
