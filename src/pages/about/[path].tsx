import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ABOUT_BY_PK } from '@/graphql/about/queries';
import createMarkup from '@/utils/createMarkup';

export default function Artist() {
  const router = useRouter();
  const { path } = router.query;

  const { data, loading, error } = useQuery(READ_ABOUT_BY_PK, {
    variables: { path },
  });

  if (error) return <></>;

  return (
    <Layout templateTitle='About'>
      {loading ? (
        <TableLoader width='full' />
      ) : data && data.about_by_pk ? (
        <div className='py-4'>
          <h1 className='py-2 text-3xl font-bold'>{data.about_by_pk.name}</h1>
          <div className='flex w-full'>
            <div
              className='preview'
              dangerouslySetInnerHTML={createMarkup(data.about_by_pk.about)}
            ></div>
          </div>
        </div>
      ) : (
        <p>Page not found</p>
      )}
    </Layout>
  );
}
