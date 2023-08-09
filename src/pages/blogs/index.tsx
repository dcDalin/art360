/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from 'next/router';

import useBlogs from '@/hooks/useBlogs';

import BlogCard from '@/components/cards/BlogCard';
import Layout from '@/components/layout/Layout';
import TableLoader from '@/components/loaders/TableLoader';

export default function ArtPage() {
  const { data, loading, error } = useBlogs();

  const router = useRouter();

  if (loading) return <TableLoader width='full' />;

  if (error) return <p>Coule not fetch blogs</p>;
  return (
    <Layout templateTitle='Blogs' contained>
      <div className=''>
        {data && data.length ? (
          <div className='flex space-x-4'>
            {data.map(
              ({
                author,
                datePosted,
                imageUrl: {
                  fields: {
                    file: { url },
                  },
                },
                slug,
                title,
              }: any) => {
                return (
                  <BlogCard
                    key={slug}
                    imageUrl={`https:${url}`}
                    title={title}
                    author={author}
                    datePublished={datePosted}
                    readTime='2 minutes read'
                    handleNavigate={() => router.push(`/blogs/${slug}`)}
                  />
                );
              }
            )}
          </div>
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </Layout>
  );
}
