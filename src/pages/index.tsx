import { useQuery } from '@apollo/client';
import * as React from 'react';

import Layout from '@/components/layout/Layout';

import { FETCH_TEST } from '@/graphql/queries';

export default function HomePage() {
  const { data, loading, error } = useQuery(FETCH_TEST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  return (
    <Layout templateTitle='Home'>
      <main>hello world</main>
      {data ? <p>{JSON.stringify(data)}</p> : null}
    </Layout>
  );
}
