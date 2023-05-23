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

import { READ_GALLERY } from '@/graphql/gallery/queries';

export default function GalleryTable() {
  const router = useRouter();
  const { pathname } = useRouter();

  const { data, loading, error } = useQuery(READ_GALLERY);

  const tableData = useMemo(
    () => (data && data.gallery && data.gallery.length ? data.gallery : []),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Pic',
        accessor: 'imageId',
        Cell: ({ row }: any) => {
          const imageUrl = nhost.storage.getPublicUrl({
            fileId: row.original.imageId,
          });

          return (
            <div className='max-w-sm py-1'>
              <div
                className='tooltip tooltip-right cursor-pointer'
                data-tip='Edit image'
                onClick={() =>
                  router.push(`${pathname}/edit-image?id=${row.original.id}`)
                }
              >
                <div className='avatar'>
                  <div className='h-18 w-18 mask mask-square'>
                    <NextImage
                      src={imageUrl}
                      imgClassName='object-contain'
                      useSkeleton
                      alt='sponsor'
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'title',
        Cell: ({ value }: any) => (
          <p className='max-w-sm overflow-hidden text-ellipsis md:w-40'>
            {value}
          </p>
        ),
      },

      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }: any) => (
          <p className='min-w-30 overflow-hidden text-ellipsis md:w-40'>
            {value}
          </p>
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
