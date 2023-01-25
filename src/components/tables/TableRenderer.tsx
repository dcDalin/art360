/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import GlobalFilter from '@/components/tables/GlobalFilter';

interface ITableRenderProps {
  columns: any;
  data: any;
}

export default function TableRenderer({ columns, data }: ITableRenderProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow, // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as any;

  return (
    <div className='w-full overflow-x-auto'>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <table
        {...getTableProps()}
        className='table-zebra table-compact table w-full'
      >
        <thead>
          {headerGroups.map((headerGroup: any, index: number) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column: any, index: number) => (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, index: number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell: any, index: number) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

        <div className='flex items-center space-x-4'>
          <div className='btn-group py-4'>
            <button
              className='btn'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <FiChevronsLeft />
            </button>
            <button
              className='btn'
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <FiChevronLeft />
            </button>
            <button
              className='btn'
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <FiChevronRight />
            </button>
            <button
              className='btn'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <FiChevronsRight />
            </button>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='flex items-center space-x-1'>
              <div>Page</div>
              <div className='font-bold'>{pageIndex + 1}</div>
              <div>of</div>
              <div className='font-bold'>{pageOptions.length}</div>
            </div>
          </div>

          <div className='flex items-center'>
            <select
              className='select'
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </table>
    </div>
  );
}
