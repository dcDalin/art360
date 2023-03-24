import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import ProductsCarousel from '@/components/carousel/ProductsCarousel';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_BLOGS_BY_PK } from '@/graphql/blogs/queries';

export default function BlogPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_BLOGS_BY_PK, {
    variables: { id, _eq: id },
  });

  if (error) return <p>Could not fetch blog</p>;

  if (loading) return <TableLoader width='full' />;
  return (
    <Layout templateTitle='Blog'>
      {loading ? (
        <TableLoader width='full' />
      ) : data && data.blogs_by_pk ? (
        <div className='px-8'>
          <h1 className='text-4xl font-bold'>{data.blogs_by_pk.title}</h1>
          <p className='py-2'>
            {data.blogs_by_pk.blog ? data.blogs_by_pk.blog : ''}
          </p>
        </div>
      ) : (
        <p>No data found</p>
      )}
      <div className='py-10 md:py-20'>
        <SectionWrapper heading='Art you might like'>
          <ProductsCarousel />
        </SectionWrapper>
      </div>
    </Layout>
  );
}
