/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import router from 'next/router';

import Layout from '@/components/layout/Layout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_BLOGS } from '@/graphql/blogs/queries';

export default function ArtPage() {
  const { data, loading, error } = useQuery(READ_BLOGS);

  if (loading) return <TableLoader width='full' />;

  if (error) return <p>Coule not fetch blogs</p>;
  return (
    <Layout templateTitle='Blogs'>
      <div className=''>
        {data && data.blogs && data.blogs.length ? (
          data.blogs.map(({ title, excerpt, id }: any) => {
            return (
              <div
                className='my-2 cursor-pointer rounded-sm bg-base-100 p-6 hover:shadow-lg'
                key={id}
                onClick={() => router.push(`/blogs/${id}`)}
              >
                <h1 className='text-4xl font-bold'>{title}</h1>
                <p className='py-2'>{excerpt}</p>
              </div>
            );
          })
        ) : (
          <p>No blogs found</p>
        )}
      </div>
    </Layout>
  );
}
