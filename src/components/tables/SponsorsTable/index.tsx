import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import nhost from '@/lib/nhost';

import NextImage from '@/components/NextImage';
import TableRenderer from '@/components/tables/SponsorsTable/TableRenderer';

import { UPDATE_ADMIN_SPONSORS_MODAL } from '@/constants/modalNames';
import { READ_ALL_SPONSORS } from '@/graphql/queries';
import { openAdminCRUDModal } from '@/redux/modals/adminCRUDModalSlice';

export default function SponsorsTable() {
  const dispatch = useDispatch();

  const { data, loading } = useQuery(READ_ALL_SPONSORS);

  const sponsorsData = useMemo(
    () => (data && data.sponsors && data.sponsors.length ? data.sponsors : []),
    [data]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Logo',
        accessor: 'imageId',
        Cell: ({ value }: { value: string }) => {
          const imageUrl = nhost.storage.getPublicUrl({
            fileId: value,
          });

          return (
            <NextImage
              src={imageUrl}
              imgClassName='object-cover'
              useSkeleton
              alt='sponsor'
              width={100}
              height={100}
            />
          );
        },
      },
      {
        Header: 'Name',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'URL',
        accessor: 'url',
        Cell: ({ value }: { value: string }) => {
          return (
            <a
              className='link-primary link flex items-center space-x-1'
              target='_blank'
              href={value}
              rel='noreferrer'
            >
              <AiOutlineLink />
              Open page
            </a>
          );
        },
      },
      {
        Header: 'Date Created',
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) =>
          dayjs(value).format('DD/MM/YYYY'),
      },
    ],
    []
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: '',
        Cell: ({ row }) => (
          <button
            onClick={() =>
              dispatch(
                openAdminCRUDModal({
                  adminModalToOpen: UPDATE_ADMIN_SPONSORS_MODAL,
                  formData: row.values,
                })
              )
            }
          >
            Edit
          </button>
        ),
      },
      {
        id: 'Delete',
        Header: '',
        Cell: ({ row }) => (
          <button onClick={() => alert('Editing: ' + row.values.createdAt)}>
            Delete
          </button>
        ),
      },
    ]);
  };

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <TableRenderer
        data={sponsorsData}
        columns={columns}
        tableHooks={tableHooks}
      />
    </div>
  );
}
