import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
import Graphcharts from "../../Charts/Graphchart";

import Barchart from "../../Charts/Barchart";
import IdContext from "../../Context/Context";
import Axios from "axios";
import {
  CellProps,
  Hooks,
  useSortBy,
  useGlobalFilter,
  useTable,
} from "react-table";

// tsrafce
type Props = {};

const AdminPage = (props: Props) => {
  const { user } = useContext(IdContext);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [staffList, setStaffList] = useState([]); // array ??
  useEffect(() => {
    Axios.get("http://localhost:3001/AALHRIA/viewstaffdetails", {
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
        Cell: ({ value }: CellProps<any>) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            className="rounded-full"
            src={`/uploads/staffImages/${value}`}
            style={{ height: "40px" }}
          />
        ),
      },
      {
        Header: "Employee Name",
        accessor: "name",
      },
      {
        Header: "Total Carta Issued",
        accessor: "numberOfCartaIssued",
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
  const tableInstance = useTable(
    {
      columns: columns,
      data: staffData,
      initialState: {
        hiddenColumns: ["id"],
      },
    },
    useGlobalFilter,
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  const isEven = (idx: number) => idx % 2 === 0;
  return (
    <>
      {/* <!-- This is an example component --> */}
      <div className="flex w-full h-screen  font-poppins ">
        <div id="main-content" className="h-full w-full bg-gray-50 relative  ">
          <main>
            <div className="pt-9 px-4">
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div
                  // data-aos-delay="500"
                  // data-aos="fade-up"
                  className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      // data-aos-delay="800"
                      // data-aos="fade-up"
                      className="flex-shrink-0"
                    >
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        {/* {user.username} */}
                        <p>13,345</p>
                      </span>
                      <h3
                        data-aos-delay="800"
                        data-aos="fade-up"
                        //data-aos="fade-up"
                        className="text-base font-normal text-gray-500"
                      >
                        Registration this week
                      </h3>
                    </div>
                    <div
                      data-aos-delay="800"
                      data-aos="fade-up"
                      className="flex items-center justify-end flex-1 text-green-500 text-base font-bold"
                    >
                      12.5%
                      <svg
                        data-aos-delay="900"
                        data-aos="fade-up"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>{" "}
                  </div>
                  <div id="main-chart">
                    {/* <img
                      className="w-full h-full"
                      sizes={"30"}
                      src={Graph}
                      alt=""
                    /> */}
                    <Graphcharts />
                  </div>
                </div>
                <div
                  // data-aos-delay="500"
                  // data-aos="fade-up"
                  className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 "
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Latest Registration
                      </h3>
                      <span className="text-base font-normal text-gray-500">
                        This is a list of latest Registration
                      </span>
                    </div>
                    <Link to="">
                      <div className="flex-shrink-0">
                        <a
                          href="/"
                          className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                        >
                          View all
                        </a>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col mt-8">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Owners Name
                                </th>
                                <th
                                  scope="col"
                                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Registration date
                                </th>
                                <th
                                  scope="col"
                                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Registered by
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  <span className="font-semibold">
                                    Hailu Tesfai Nataye
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  03/12/2022
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Kebede Gebre Yohannes
                                </td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  <span className="font-semibold">
                                    Zewedu Feleke Caleb
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  03/12/2022
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Alemu Kebede
                                </td>
                              </tr>
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  <span className="font-semibold">
                                    Mahdere Negasi Getahun
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  03/12/2022
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Alemu Kebede
                                </td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  <span className="font-semibold">
                                    Tesfaye Goliad Keya
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  03/12/2022
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Alemu Kebede
                                </td>
                              </tr>
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  <span className="font-semibold">
                                    Dagem Tiruneh Tewolde
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  03/12/2022
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Gedion Getachew Mitku
                                </td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  <span className="font-semibold">
                                    Eyoab Beyne Taye
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  03/12/2022
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Dave Hailu Kasahun
                                </td>
                              </tr>
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  <span className="font-semibold">
                                    Eyasu Duri Bessufekad
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  03/12/2022
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Dave Hailu Kasahun
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- boxs --> */}
              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-xl sm:text-2xl leading-none font-bold text-gray-900">
                        2,340
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        New Registration this week
                      </h3>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      14.6%
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        5,355
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Visitors this week
                      </h3>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      32.9%
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        385
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        User authentication this week
                      </h3>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                      -2.7%
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
            {/* Eployee stats */}
            <div className="flex flex-col mt-10 bg-gray-50 font-poppins">
              <h1 className=" py-4 mx-4 text-xl">
                {" "}
                Recent Employees Actvities
              </h1>
              <p className="mx-4 text-sm text-slate-500">
                Here is the list of Recent Staff Employees actvities
              </p>

              <div className=" bg-gray-50 mt-2 flex md:flex-row flex-col px-4 justify-between w-full h-full">
                <div className="flex flex-col justify-center md:w-2/3 w-full h-full ">
                  <div className="w-full max-w-6xl  bg-white shadow-lg rounded-md border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100 flex justify-between ">
                      <h2 className="font-semibold text-gray-800">Employee</h2>
                      <Link to="/adminhomepage/employees">
                        <div className="flex-shrink-0 pr-10">
                          <a
                            href="/"
                            className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                          >
                            View all
                          </a>
                        </div>
                      </Link>
                    </header>
                    <div className="p-3">
                      <div className="overflow-x-auto">
                        <table
                          {...getTableProps()}
                          className="min-w-full leading-normal"
                        >
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
                                    className={
                                      isEven(idx) ? "bg-slate-100/25 " : ""
                                    }
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="  h-auto md:w-2/5 w-full md:flex hidden   bg-gray-50">
                  <div className="w-full   items-center ">
                    {/* <Colchart /> */}
                    <Barchart />
                  </div>
                  {/* <h1>change this to bar graph</h1> */}
                </div>
              </div>
            </div>
            {/* News Feed*/}
            <div className="w-full   bg-gray-50 px- flex flex-col pb-20 ">
              <div className=" mt-10 md:ml- ml- flex flex-col justify-center items-center px-4  mb-6">
                <h1 className=" py-4 font-semibold text-2xl  ">News Feed</h1>

                <p> new information and updates </p>
              </div>
              {/* cards */}
              <div className="w-full flex flex-row bg-gray-50 ">
                <div className="w-2/3  px-4 flex">
                  <div className="flex flex-col py-4">
                    <div className=" w-[712px] h-80  cursor-pointer text-black hover:text-white transition duration-300 ease-in-out relative object-fill rounded-lg ">
                      <img
                        alt=""
                        className="bg-cover w-full h-80 bg-newsimg bg-no-repeat rounded-lg  "
                      />
                      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                      <span className="absolute bottom-0 left-0 px-7 my-7  ">
                        <h1>New land registrarion law</h1>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row py-3  space-x-3 rounded-lg">
                      <div className="w-[350px] h-40 cursor-pointer text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg ">
                        <img
                          alt=""
                          className="bg-cover w-full h-40 bg-newsimg2 bg-no-repeat rounded-lg  "
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                        <span className="absolute bottom-0 left-0 px-7 my-7  ">
                          <h1>land registrarion administration</h1>
                          <p>Lorem Ipsum is simply dummy text</p>
                        </span>
                      </div>
                      <div className="w-[350px] h-40 cursor-pointer text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg">
                        <img
                          alt=""
                          className="bg-cover w-full h-40 bg-newsimg3 bg-no-repeat rounded-lg  "
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                        <span className="absolute bottom-0 left-0 px-7 my-7  ">
                          <h1>Owner transfership details</h1>
                          <p>Lorem Ipsum is simply dummy text</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full px-4 py-4 ">
                    <div className="space-y-3 h-auto">
                      <div className="w-full h-60  text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg  ">
                        <img
                          alt=""
                          className="bg-cover w-full h-60 bg-newsimg4 bg-no-repeat rounded-lg  "
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                        <span className="absolute bottom-0 left-0 px-7 my-7  ">
                          <h1>Citizen requerment update</h1>
                          <p>Lorem Ipsum is simply dummy text</p>
                        </span>
                      </div>
                      <div className="w-full h-60  text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg ">
                        <img
                          alt=""
                          className="bg-cover w-full h-60 bg-newsimg5 bg-no-repeat rounded-lg  "
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                        <span className="absolute bottom-0 left-0 px-7 my-7  ">
                          <h1>New registrarion system</h1>
                          <p>Lorem Ipsum is simply dummy text</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-1/3 flex flex-col border-l-2 px-3 py-4 space-y-2">
                  <div className="w-full h-40  text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg ">
                    <img
                      alt=""
                      className="bg-cover w-full h-40 bg-newsimg6 bg-no-repeat rounded-lg  "
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                    <span className="absolute bottom-0 left-0 px-7 my-7  ">
                      <h1>What is Lorem Ipsum? box6</h1>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </span>
                  </div>
                  <div className="w-full h-40  text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg ">
                    <img
                      alt=""
                      className="bg-cover w-full h-40 bg-newsimg7 bg-no-repeat rounded-lg  "
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                    <span className="absolute bottom-0 left-0 px-7 my-7  ">
                      <h1>What is Lorem Ipsum? box7</h1>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </span>
                  </div>
                  <div className="w-full h-40  text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg ">
                    <img
                      alt=""
                      className="bg-cover w-full h-40 bg-newsimg8 bg-no-repeat rounded-lg  "
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                    <span className="absolute bottom-0 left-0 px-7 my-7  ">
                      <h1>What is Lorem Ipsum? box8</h1>
                      <p>Lorem Ipsum is simply dummy text</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* fotter */}
          </main>

          {/* <button onClick={() => {}}>ManagEmp</button>
                <button onClick={() => {}}>RegisterEmp</button> */}
          {/* News feed */}

          <div className="w-full mx-auto ">
            <footer className="p-4 bg-gray-50 text-black shadow md:px-6 md:py-8 dark:bg- border-t-2 border-black/5">
              <div className="sm:flex sm:items-center sm:justify-end  ">
                {/* <a
                  href="/"
                  target="_blank"
                  className="flex items-center mb-4 sm:mb-0"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-4 h-8"
                    alt="Flowbite Logo"
                  />
                  <span className="self-center text-xl font-semibold whitespace-nowrap z">
                    Flowbite
                  </span>
                </a> */}
                <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
                  <li>
                    <a
                      href="/"
                      className="mr-4 text-sm  hover:underline md:mr-6 "
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="mr-4 text-sm  hover:underline md:mr-6 "
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="mr-4 text-sm  hover:underline md:mr-6 "
                    >
                      Licensing
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-sm hover:underline ">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              {/* <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2022 <a href="/">Flowbite™</a>. All Rights Reserved.
              </span> */}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
