import React, { useState, useEffect, useMemo } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Dialog, Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import StaffProfile from "../Profile/Staffprofile";
import { Link } from "react-router-dom";
import RegisterEmp from "./RegisterEmp";
import Axios from "axios";
import { StaffSearch } from "./StaffSearch";
// contrl f3 for search
import {
  CellProps,
  Hooks,
  useSortBy,
  useGlobalFilter,
  useTable,
} from "react-table";
import ViewActivity from "./ViewActivity";

type Props = {};

const Employee = (props: Props) => {
  const [reg, setreg] = useState(false);
  const [view, setView] = useState(
    // status: false,
    // rowid: 0,
    false
  );
  // used to pass id of the selected employee
  const [sid, setSid] = useState(0);

  const [staffList, setStaffList] = useState([]); // array ??

  useEffect(() => {
    Axios.get("http://localhost:3001/AALHRIA/viewallstaff", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((data) => {
      setStaffList(data.data);
    });
  }, []);
  const dateConverter = (date: string) => {
    if (date) {
      var temp_date = new Date(date.substring(0, 10));
      var new_Date = new Date(
        temp_date.getTime() +
          Math.abs(temp_date.getTimezoneOffset() * 60000) * 12
      )
        .toISOString()
        .substring(0, 10);
      return new_Date;
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Picture",
        accessor: "img",
        // eslint-disable-next-line jsx-a11y/alt-text
        Cell: ({ value }: CellProps<any>) => (
          <img
            src={`/uploads/staffImages/${value}`}
            style={{ height: "100px" }}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Role",
        accessor: "roleName",
      },
      {
        Header: "Account Status",
        accessor: "accountStatus",
        Cell: ({ value }: CellProps<any>) =>
          value === "Active" ? (
            <>
              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-green-200  opacity-50 rounded-full"
                ></span>
                <span className="relative">{value}</span>
              </span>
            </>
          ) : value === "Inactive" ? (
            <>
              <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                ></span>
                <span className="relative">{value}</span>
              </span>
            </>
          ) : (
            <></>
          ),
      },
      {
        Header: "Joined Date",
        accessor: "joinedDate",
        Cell: ({ value }: CellProps<any>) => <p>{dateConverter(value)}</p>,
      },
    ],
    []
  );
  const staffData = useMemo(() => [...staffList], [staffList]);
  // DYNAMIC COLUMN
  // const staffColumn = useMemo(
  //   () =>
  //     staffList[0]
  //       ? Object.keys(staffList[0])
  //           // .filter(
  //           //   (key) =>
  //           //     // u can choose what  not to be seen
  //           //     key !== 'password' &&
  //           //     key !== 'birthday' &&
  //           //     key !== 'email' &&
  //           //     key !== 'phoneNumber' &&
  //           //     key !== 'firstName' &&
  //           //     key !== 'middleName' &&
  //           //     key !== 'lastName' &&
  //           //     key !== 'sex' &&
  //           //     key !== 'residentAddress'
  //           // )
  //           .map((key) => {
  //             // for Image
  //             // if(key === "image")
  //             // return {
  //             //   Header: key,
  //             //   accessor: key,
  //             //   Cell: ({ value }: CellProps<any>) => <img src={value}/>,maxWidth: 50,
  //             // }
  //             return { Header: key, accessor: key };
  //           })
  //       : [],
  //   [staffList]
  // );
  const editHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "profile",
        Header: "PROFILE",
        Cell: ({ row }: CellProps<any>) => (
          //onClick={() => alert("Editing: " + row.values.id)}
          //    row.values.roleName === "Admin" ? (
          // to={{
          // pathname: `/dashboard/${device.device_id}`,
          //  state: { device },
          //}}
          // your link creation
          //TODO:
          //https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react#:~:text=You%20can%20use%20the%20Link,you%20want%20to%20pass%20on.
          <Link
            to={{ pathname: `/adminhomepage/staffprofile/${row.values.id}` }}
          >
            {/* // <Link to={`/adminhomepage/staffprofile/${row.values.id}`}> */}
            <button>Profile</button>
          </Link>
        ),
        //   ) : row.values.roleName === "Employee" ? (
        //     <Link to="/employeehomepage/staffprofile">
        //       <button>Profile</button>
        //      </Link>
        //   ) : (
        //      <></>
        //   ),
      },
    ]);
  };
  const activityHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Activity",
        Header: "Recent Activity",
        Cell: ({ row }: CellProps<any>) =>
          //onClick={() => alert("Activity: " + row.values.id)}
          row.values.roleName !== "Admin" ? (
            <button
              onClick={() => {
                setView(
                  // status: true,
                  // rowid: row.values.id,
                  true
                );
                //TODO:
                setSid(row.values.id);
              }}
              className="inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
            >
              View Activity
            </button>
          ) : (
            <></>
          ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: columns,
      data: staffData,
      initialState: {
        hiddenColumns: ["id"],
      },
    },
    useGlobalFilter,
    activityHooks,
    editHooks,
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
            <StaffSearch
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
              globalFilter={state.globalFilter}
            />
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
              <table {...getTableProps()} className="min-w-full leading-normal">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
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
                          className={isEven(idx) ? "bg-slate-100/25 " : ""}
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

              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
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
      {/* const [sid, setSid] = useState(0); */}
      {<ViewActivity viewactvity={view} setViewactvity={setView} setid={sid} />}
    </>
  );
};

export default Employee;
