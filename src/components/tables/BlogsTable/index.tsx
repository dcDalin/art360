/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import TableLoader from '@/components/loaders/TableLoader';
import AlterButton from '@/components/tables/AlterButton';
import TableRenderer from '@/components/tables/TableRenderer';

import { READ_BLOGS } from '@/graphql/blogs/queries';

export default function BlogsTable() {
  const router = useRouter();
  const { pathname } = useRouter();

  const { data, loading, error } = useQuery(READ_BLOGS);

  const tableData = useMemo(
    () => (data && data.blogs && data.blogs.length ? data.blogs : []),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value }: any) => (
          <p className='max-w-sm overflow-hidden text-ellipsis md:w-40'>
            {value}
          </p>
        ),
      },

      {
        Header: 'Excerpt',
        accessor: 'excerpt',
        Cell: ({ value }: any) => (
          <p className='min-w-30 overflow-hidden text-ellipsis md:w-40'>
            {value}
          </p>
        ),
      },

      {
        id: 'EditDelete',
        Header: '',
        Cell: ({ row }: any) => (
          <div className='flex space-x-2'>
            <div className='tooltip' data-tip='Edit'>
              <AlterButton
                type='edit'
                handleClick={() =>
                  router.push(`${pathname}/edit?id=${row.original.id}`)
                }
              />
            </div>
            <div className='tooltip' data-tip='Delete'>
              <AlterButton
                type='delete'
                handleClick={() =>
                  router.push(`${pathname}/delete?id=${row.original.id}`)
                }
              />
            </div>
          </div>
        ),
      },
    ],
    [pathname, router]
  );

  if (loading) return <TableLoader width='full' />;

  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <TableRenderer data={tableData} columns={columns} />
    </div>
  );
}
