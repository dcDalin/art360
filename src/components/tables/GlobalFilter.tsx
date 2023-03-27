/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useAsyncDebounce } from 'react-table';
import 'regenerator-runtime';

interface IGlobalFilterProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}

export default function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: IGlobalFilterProps) {
  const count = preGlobalFilteredRows.length;

  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <div className='py-4 pl-2'>
      <div className='flex w-full max-w-xs items-center justify-between space-x-2 py-2'>
        <div className='flex items-center space-x-2'>
          <BsSearch />
          <h4>Search</h4>
        </div>
      </div>
      <input
        className='input w-full max-w-xs'
        type='text'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </div>
  );
}
