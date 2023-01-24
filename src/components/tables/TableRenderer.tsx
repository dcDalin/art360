/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalFilter, useSortBy, useTable } from 'react-table';

interface ITableRenderProps {
  columns: any;
  data: any;
  tableHooks?: any;
}

export default function TableRenderer({
  columns,
  data,
  tableHooks,
}: ITableRenderProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useGlobalFilter, tableHooks, useSortBy);

  return (
    <div className='w-full overflow-x-auto'>
      <table {...getTableProps()} className='table-compact table w-full'>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
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
      </table>
    </div>
  );
}
