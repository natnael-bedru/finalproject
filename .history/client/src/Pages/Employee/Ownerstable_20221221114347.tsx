import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Dialog, Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import QRcodePage from "../authentication/QRcodePage";
import Ownerprofile from "../Employee/Ownerprofile";
//
import { Link } from "react-router-dom";
import Axios from "axios";
import { OwnerSearch } from "./OwnerSearch";

import {
  CellProps,
  Hooks,
  useSortBy,
  useGlobalFilter,
  useTable,
} from "react-table";

type Props = {};

const Ownerstable = (props: Props) => {
  const [showOption, setShowOption] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [ownersList, setOwnersList] = useState([]); // array ??

  useLayoutEffect(() => {
    Axios.get("http://localhost:3001/AALHRIA/viewallowner", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((data) => {
      console.log(data.data);
      setOwnersList(data.data);
    });
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Picture",
        accessor: "img",
        // Cell: ({ value }: CellProps<any>) => (
        //   <img
        //     src={`/uploads/staffImages/${value}`}
        //     style={{ height: "100px" }}
        //   />
        // ),
      },
      {
        Header: "Firstname",
        accessor: "firstName",
      },
      {
        Header: "Middlename",
        accessor: "middleName",
      },
      {
        Header: "Lastname",
        accessor: "lastName",
      },
      {
        Header: "Sex",
        accessor: "sex",
        // Cell: ({ value }: CellProps<any>) => <p>{value}</p>,
      },
      {
        Header: "Phonenumber",
        accessor: "phonenumber",
      },
      {
        Header: "DateofBirht",
        accessor: "dateofbirth",
      },
      // {
      //   Header: "Woreda",
      //   accessor: "woredaNumber",
      // },
      // {
      //   Header: "Kebele",
      //   accessor: "kebeleNumber",
      // },
      // {
      //   Header: "Subcity",
      //   accessor: "subCityName",
      // },
    ],
    []
  );

  const ownerData = useMemo(() => [...ownersList], [ownersList]);
  // const editHooks = (hooks: Hooks) => {
  //   hooks.visibleColumns.push((columns: any) => [
  //     ...columns,
  //     {
  //       id: "Edit",
  //       Header: "Edit",
  //       Cell: ({ row }: CellProps<any>) => (
  //         <button onClick={() => alert("Editing: " + row.values.id)}>
  //           Edit
  //         </button>
  //       ),
  //     },
  //   ]);
  // };
  // const activityHooks = (hooks: Hooks) => {
  //   hooks.visibleColumns.push((columns: any) => [
  //     ...columns,
  //     {
  //       id: "Activity",
  //       Header: "Recent Activity",
  //       Cell: ({ row }: CellProps<any>) => (
  //         <button
  //           onClick={() => alert("Activity: " + row.values.id)}
  //           className="inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
  //         >
  //           View Activity
  //         </button>
  //       ),
  //     },
  //   ]);
  // };
  const tableInstance = useTable(
    {
      columns: columns,
      data: ownerData,
      initialState: {
        hiddenColumns: ["id"],
      },
    },
    useGlobalFilter,
    // activityHooks,
    // editHooks,
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    // state,
  } = tableInstance;
  const isEven = (idx: number) => idx % 2 === 0;
  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold md:text-4xl text-2xl ">
              Employee List
            </h2>
            <span className="md:text-xl text-base">
              View employees status and activites
            </span>
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
            {/* <OwnerSearch
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
              globalFilter={state.globalFilter}
            /> */}
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {/* table ▼▲ */}
              <table {...getTableProps()} className="min-w-full leading-normal">
                <thead>
                  {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                      // Apply the header row props
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                          // Loop over the headers in each row
                          headerGroup.headers.map((column) => (
                            // Apply the header cell props
                            <th {...column.getHeaderProps()}>
                              {
                                // Render the header
                                column.render("Header")
                              }
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                <tbody {...getTableBodyProps()}>
                  {
                    // Loop over the table rows
                    rows.map((row) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                          {
                            // Loop over the rows cells
                            row.cells.map((cell) => {
                              // Apply the cell props
                              return (
                                <td {...cell.getCellProps()}>
                                  {
                                    // Render the cell contents
                                    cell.render("Cell")
                                  }
                                </td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>

              {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
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
              </div> */}
              {/* // */}
            </div>
          </div>
        </div>
      </div>
      {/* <QRcodePage QRcode={showOption} setQRcode={setShowOption} />
      {<Ownerprofile show={isOpen} setShow={setIsOpen} />} */}
    </>
  );
};

export default Ownerstable;
