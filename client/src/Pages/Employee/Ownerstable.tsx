import React, { useState, useMemo, useLayoutEffect } from "react";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { Dialog, Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import QRcodePage from "../authentication/QRcodePage";
//import Ownerprofile from "../Reports/Ownerprofile";
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
  // Column,
} from "react-table";
import LandProfile from "./LandProfile";

type Props = {};

const Ownerstable = (props: Props) => {
  // this is for the  QR-CODE
  const [showOption, setShowOption] = useState(false);
  // this is for the OWNER PAGE
  const [isOpen, setIsOpen] = useState(false);
  const [landshow, setLandshow] = useState(false);

  const [ownersList, setOwnersList] = useState([]); // array ??

  const [citizenId, setCitizenId] = useState(0);

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
        Cell: ({ value }: CellProps<any>) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={`/uploads/citizenImages/${value}`}
            style={{ height: "100px" }}
          />
        ),
      },
      {
        Header: "FullName",
        accessor: "fullName",
      },
      {
        Header: "Sex",
        accessor: "sex",
      },
      {
        Header: "Phonenumber",
        accessor: "phonenumber",
      },
      {
        Header: "Date of Birth",
        accessor: "dateofbirth",
        Cell: ({ value }: CellProps<any>) => <p>{value.substring(0, 10)}</p>,
      },
      {
        Header: "Woreda",
        accessor: "woredaNumber",
      },
      // {
      //   Header: "Kebele",
      //   accessor: "kebeleNumber",
      // },
      {
        Header: "Subcity",
        accessor: "subCityName",
      },
    ],
    []
  );

  const ownerData = useMemo(() => [...ownersList], [ownersList]);

  const QRCodeHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        Header: " QR code",
        id: "Genate-QR-code",
        Cell: ({ row }: CellProps<any>) => (
          <button
            onClick={() => {
              setShowOption(
                // status: true,
                // rowid: row.values.id,
                true
              );
              //setSid(row.values.id);
            }}
            className="font-poppins inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
          >
            Genate QR code
          </button>
        ),
      },
    ]);
  };
  const RegisterLandHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        Header: "MORE",
        id: "Register-Land",
        Cell: ({ row }: CellProps<any>) => (
          <>
            <Menu>
              <div>
                <Menu.Button
                  // onClick={() => setShowOption(!showOption)}
                  className="  "
                >
                  <button
                    type="button"
                    className=" font-poppins text-center inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
                  >
                    Actions
                  </button>
                  <Menu.Items
                    className="font-poppins absolute right-20 z-20 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <Link
                      to={{
                        pathname: `/employeehomepage/landregistration/${row.values.id}`,
                      }}
                    >
                      <button className="inline-block px-4 py-2.5 bg-transparent w-full text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out">
                        Register Land
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setLandshow(true);
                        setCitizenId(row.values.id);
                      }}
                      // onClick={() => alert("Editing: " + row.values.id)}
                      className="inline-block px-4 py-2.5 w-full bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      View Land
                    </button>
                  </Menu.Items>
                </Menu.Button>{" "}
              </div>
              {/* <Link
              to={{
                pathname: `/employeehomepage/landregistration/${row.values.id}`,
              }}
            >
              <button className="inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out">
                Register Land
              </button>
            </Link>
            <button
              onClick={() => setLandshow(true)}
              // onClick={() => alert("Editing: " + row.values.id)}
              className="inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
            >
              View Land
            </button> */}
            </Menu>
          </>
        ),
      },
    ]);
  };
  // const ViewLandHooks = (hooks: Hooks) => {
  //   hooks.visibleColumns.push((columns: any) => [
  //     ...columns,
  //     {
  //       // Header: "Genate QR code",
  //       id: "View-Land",
  //       Cell: ({ row }: CellProps<any>) => (
  //         <button onClick={() => alert("Editing: " + row.values.id)} className="inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out">
  //           View Land
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
    QRCodeHooks,
    RegisterLandHooks,
    // ViewLandHooks,
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;
  const isEven = (idx: number) => idx % 2 === 0;
  return (
    <>
      <div className="bg-white p-8 rounded-md w-full font-poppins">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold md:text-4xl text-2xl ">
              Citizen List
            </h2>
            <span className="md:text-xl text-base">
              View Citizen information here
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
            <OwnerSearch
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
              globalFilter={state.globalFilter}
            />
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full  shadow rounded-lg overflow-hidden">
              {/* table ▼▲ */}
              <table
                {...getTableProps()}
                className="min-w-full  leading-normal"
              >
                <thead className="">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="px-5  py-3 border-b-2  border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {column.render("Header")}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ▼"
                              : " ▲"
                            : ""}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {
                    // Loop over the table rows
                    rows.map((row, idx) => {
                      // Prepare the row for display statusStyle
                      // red
                      // "relative inline-block px-3 py-1 font-semibold  leading-tight"
                      // green
                      // "relative inline-block px-3 py-1 font-semibold  leading-tight"
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className={isEven(idx) ? "bg-slate-100/25  " : ""}
                        >
                          {row.cells.map((cell, idx) => (
                            <td
                              {...cell.getCellProps()}
                              className="px-5 py-5 border-b border-gray-200  text-sm"
                            >
                              {/* {cell.column.Header === "Joined Date" ? cell.render(cell.value.substring(0, 10)): ""} */}

                              {cell.render("Cell")}
                            </td>
                          ))}
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
      <QRcodePage QRcode={showOption} setQRcode={setShowOption} />
      {/* {<Ownerprofile show={isOpen} setShow={setIsOpen} />} */}
      {
        <LandProfile
          showland={landshow}
          setShowland={setLandshow}
          citizenId={citizenId}
        />
      }
    </>
  );
};

export default Ownerstable;
