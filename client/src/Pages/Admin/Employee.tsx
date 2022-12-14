import React, { useState, useEffect, useMemo } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Dialog, Transition } from '@headlessui/react';
import { Menu } from '@headlessui/react';
import Employeeprofile from '../Employee/Employeeprofile';
import { Link } from 'react-router-dom';
import RegisterEmp from './RegisterEmp';
import Axios, { AxiosResponse } from 'axios';
import { StaffSearch } from './StaffSearch';

import { CellProps, Hooks, useSortBy, useGlobalFilter,  useTable } from 'react-table';

type Props = {};

const Employee = (props: Props) => {
  const style = { color: 'gray', fontSize: '1.5em' };
  const [reg, setreg] = useState(false);

  const [staffList, setStaffList] = useState([]); // array ??

  useEffect(() => {
    Axios.get('http://localhost:3001/AALHRIA/viewstaff', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    }).then((data) => {
      setStaffList(data.data);
    });
    console.log(`DATA2: ${JSON.stringify(staffList)}`);
  }, []);
  console.log(staffList);

  /*
  const data = useMemo(
    () => [
      {
        id: 14,
        roleid: 2,
        assignedBy: 12,
        firstName: 'Kebede',
        middleName: 'Abe',
        lastName: 'Shemsu',
        username: 'Kebede',
        password: '$2b$10$neNJICTR0/FDRiU.kCrjNe5Li/uuERjHDNMbOLeSpVzTMTUP9Svli',
        email: 'kebe@gmail.com',
        phoneNumber: '0922334455',
        sex: 'Female',
        birthday: '1911-03-14T21:30:00.000Z',
        residentAddress: null,
      },
      {
        id: 15,
        roleid: 2,
        assignedBy: null,
        firstName: 'Sami',
        middleName: 'Shemsu',
        lastName: 'Hopa',
        username: 'Sami',
        password: '$2b$10$rIRw3Fjdx0MUsueeV8.Cw.XTJIpoYXhvzEqQybohzYjXyUSQ3PV/O',
        email: 'sami@gmail.com',
        phoneNumber: '1122334455',
        sex: 'Male',
        birthday: '1955-06-09T21:00:00.000Z',
        residentAddress: null,
      },
      {
        id: 123,
        roleid: 1,
        assignedBy: 12,
        firstName: 'Natnaeloio',
        middleName: 'Bedru',
        lastName: 'Abdulkadir',
        username: 'nat',
        password: '$2b$10$8wTXLzgUfWIlLSxnbOM1quUPGkdGyTxh5TYrShxdWRcOvgCC0wq7C',
        email: 'nat@gmail.com',
        phoneNumber: '0911223344909',
        sex: 'Male',
        birthday: '2022-12-08T21:00:00.000Z',
        residentAddress: 'Bole',
      },
    ],
    []
  );

  interface Data {
    id: number;
    roleid: number;
    assignedBy: number;
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    sex: string;
    birthday: string;
    residentAddress: string;
  }
  */
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Firstname',
        accessor: 'firstName',
      },
      {
        Header: 'Middlename',
        accessor: 'middleName',
      },
      {
        Header: 'Lastname',
        accessor: 'lastName',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
    ],
    []
  );

  const staffData = useMemo(() => [...staffList], [staffList]);
  const staffColumn = useMemo(
    () =>
      staffList[0]
        ? Object.keys(staffList[0])
            // .filter(
            //   (key) =>
            //     // u can choose what  not to be seen
            //     key !== 'password' &&
            //     key !== 'birthday' &&
            //     key !== 'email' &&
            //     key !== 'phoneNumber' &&
            //     key !== 'firstName' &&
            //     key !== 'middleName' &&
            //     key !== 'lastName' &&
            //     key !== 'sex' &&
            //     key !== 'residentAddress'
            // )
            .map((key) => {
              // for Image
              // if(key === "image")
              // return {
              //   Header: key,
              //   accessor: key,
              //   Cell: ({ value }: CellProps<any>) => <img src={value}/>,maxWidth: 50,
              // }
              return { Header: key, accessor: key };
            })
        : [],
    [staffList]
  );
  

  const tableHooks = (hooks :Hooks) => {
    hooks.visibleColumns.push((columns: any) =>[
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }: CellProps<any>) => (
          <button onClick={()=> alert("Editing: "+row.values.id)}>Edit</button>
        )
      }
    ] )
  }

  const tableInstance = useTable({ columns: staffColumn, data: staffData },useGlobalFilter ,tableHooks ,useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state  } = tableInstance;
  const isEven = (idx: number) => idx % 2 === 0;

  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold md:text-4xl text-2xl ">Employee List</h2>
            <span className="md:text-xl text-base">View employees status and activites</span>
          </div>
          {/* <div className="flex items-center justify-between ">
            <div className="lg:ml-40 ml-10 space-x-8">
              <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                New Report
              </button>
            </div>
          </div> */}
        </div>
        <div>
          {/* search bar */}
          <div className="flex justify-between items-center">
           <StaffSearch preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/>
            <Link to="">
              <button
                onClick={() => setreg(true)}
                type="button"
                className="hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Add Employee
              </button>
            </Link>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {/* table ▼▲ */}
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                        {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲"):""}
                        </th>
                      ))}

                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {
                    // Loop over the table rows
                    rows.map((row, idx) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} className={isEven(idx) ? 'bg-green-400 bg-opacity-30' : ''}>
                          {row.cells.map((cell, idx) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>

              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {<RegisterEmp Empreg={reg} setEmpreg={setreg} />}
    </>
  );
};

export default Employee;
