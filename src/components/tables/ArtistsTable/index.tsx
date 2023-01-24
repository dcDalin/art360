/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import nhost from '@/lib/nhost';

import TableLoader from '@/components/loaders/TableLoader';
import NextImage from '@/components/NextImage';
import AlterButton from '@/components/tables/AlterButton';
import TableRenderer from '@/components/tables/TableRenderer';

import { READ_ARTISTS } from '@/graphql/artists/queries';

export default function ArtistsTable() {
  const router = useRouter();
  const { pathname } = useRouter();

  const { data, loading, error } = useQuery(READ_ARTISTS);

  const tableData = useMemo(
    () => (data && data.artists && data.artists.length ? data.artists : []),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ row }: any) => {
          const imageUrl = nhost.storage.getPublicUrl({
            fileId: row.original.imageId,
          });

          return (
            <div className='flex items-center space-x-3'>
              <div className='py-4'>
                <div
                  className='tooltip tooltip-right cursor-pointer'
                  data-tip='Edit image'
                  onClick={() =>
                    router.push(`${pathname}/edit-image?id=${row.original.id}`)
                  }
                >
                  <div className='avatar'>
                    <div className='mask mask-squircle h-12 w-12'>
                      <NextImage
                        src={imageUrl}
                        imgClassName='object-cover'
                        useSkeleton
                        alt='sponsor'
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='font-bold'>{`${row.original.firstName} ${row.original.lastName}`}</div>
                <div className='text-sm opacity-50'>
                  {row.original.nickName}
                </div>
              </div>
            </div>
          );
        },
      },

      {
        Header: 'Bio',
        accessor: 'bio',
        Cell: ({ value }: any) => (
          <p className='w-20 overflow-hidden text-ellipsis md:w-40'>{value}</p>
        ),
      },
      {
        Header: 'Date Created',
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) =>
          dayjs(value).format('DD/MM/YYYY'),
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
