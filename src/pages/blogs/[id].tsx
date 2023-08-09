import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useRouter } from 'next/router';

import useBlog from '@/hooks/useBlog';

import ProductsCarousel from '@/components/carousel/ProductsCarousel';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';
import NextImage from '@/components/NextImage';

export default function BlogPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useBlog(id);

  if (error) return <p>Could not fetch blog</p>;

  if (loading) return <TableLoader width='full' />;

  const {
    title,
    author,
    datePosted,
    imageUrl: {
      fields: {
        file: { url },
      },
    },
    blog,
  } = data;

  return (
    <Layout templateTitle='Blog' contained>
      {loading ? (
        <TableLoader width='full' />
      ) : data ? (
        <div className='px-8'>
          <h1 className='text-4xl font-bold'>{title}</h1>
          <div>
            <figure>
              <NextImage
                imgClassName='w-14 h-14 md:w-full md:h-full object-contain'
                className='flex h-full w-full items-center justify-center object-contain'
                src={`https:${url}`}
                alt={`${title} image`}
                width={100}
                height={50}
              />
            </figure>
          </div>
          <div className='preview'>{documentToReactComponents(blog)}</div>
          <div>
            {author}
            {datePosted}
          </div>
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
