import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export function OwnerSearch({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }: {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 300);
  
    return (
      <>
        <div className="flex bg-gray-50 items-center p-2 rounded-md  md:w-2/5 w-full mb-4 border-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            className="bg-gray-50 outline-none ml-1 block w-full  "
            type="text"
            name=""
            id=""
            placeholder="Search for resident . . ."
            value={value || ''}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
          />
        </div>
      </>
    );
  }