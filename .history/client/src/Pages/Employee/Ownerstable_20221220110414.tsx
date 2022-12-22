import React, { useState, useEffect, useMemo  } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Dialog, Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import QRcodePage from "../authentication/QRcodePage";
import Ownerprofile from "../Employee/Ownerprofile";
//
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { OwnerSearch } from './OwnerSearch';

import { CellProps, Hooks, useSortBy, useGlobalFilter,  useTable } from 'react-table';

type Props = {};

const Ownerstable = (props: Props) => {
  const [showOption, setShowOption] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [staffList, setStaffList] = useState([]); // array ??

  useEffect(() => {
    Axios.get('http://localhost:3001/AALHRIA/viewallowner', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    }).then((data) => {
      console.log(data.data);
      setStaffList(data.data);
    });
  }, []);


  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold md:text-4xl text-2xl ">
              Owners List
            </h2>
            <span className="md:text-xl text-base">
              view Owners status and activites
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
       
      </div>
      <QRcodePage QRcode={showOption} setQRcode={setShowOption} />
      {<Ownerprofile show={isOpen} setShow={setIsOpen} />}
    </>
  );
};

export default Ownerstable;
