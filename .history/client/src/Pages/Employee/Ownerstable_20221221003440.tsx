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
      {
        Header: "Woreda",
        accessor: "woredaNumber",
      },
      {
        Header: "Kebele",
        accessor: "kebeleNumber",
      },
      {
        Header: "Subcity",
        accessor: "subCityName",
      },
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
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;
  const isEven = (idx: number) => idx % 2 === 0;
  return (
    <>
       
      {/* <QRcodePage QRcode={showOption} setQRcode={setShowOption} />
      {<Ownerprofile show={isOpen} setShow={setIsOpen} />} */}
    </>
  );
};

export default Ownerstable;
