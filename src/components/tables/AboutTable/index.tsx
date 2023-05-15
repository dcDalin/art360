/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import TableLoader from '@/components/loaders/TableLoader';
import AlterButton from '@/components/tables/AlterButton';
import TableRenderer from '@/components/tables/TableRenderer';

import { READ_ALL_ABOUT } from '@/graphql/about/queries';

export default function AboutTable() {
  const router = useRouter();
  const { pathname } = useRouter();

  const { data, loading, error } = useQuery(READ_ALL_ABOUT);

  const tableData = useMemo(
    () => (data && data.about && data.about.length ? data.about : []),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Path',
        accessor: 'path',
        Cell: ({ value }: any) => (
          <p className='max-w-sm overflow-hidden text-ellipsis md:w-40'>
            {value}
          </p>
        ),
      },
      {
        Header: 'Name | Title',
        accessor: 'name',
        Cell: ({ value }: any) => (
          <p className='min-w-30 overflow-hidden text-ellipsis md:w-40'>
            {value}
          </p>
        ),
      },
      {
        Header: 'About',
        accessor: 'about',
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
                  router.push(`${pathname}/edit?id=${row.original.path}`)
                }
              />
            </div>
            <div className='tooltip' data-tip='Delete'>
              <AlterButton
                type='delete'
                handleClick={() =>
                  router.push(`${pathname}/delete?id=${row.original.path}`)
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
