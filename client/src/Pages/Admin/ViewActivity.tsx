import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiDotsHorizontal } from "react-icons/hi";
import Axios from "axios";

type Props = {
  viewactvity: boolean;
  setViewactvity: Dispatch<SetStateAction<boolean>>;
  setid: number;
};

const ViewActivity = ({ viewactvity, setViewactvity, setid }: Props) => {
  const style = { color: "gray", fontSize: "1.5em" };

  const [citizen, setCitizen] = useState<any>({
    fullName: null,
    img: null,
  });
  const [cartaInfo, setCartaInfo] = useState<any>({
    cartaTitleDeedNo: null, //
    action: null, //
    lastModifiedDate: null, //
  });
  useEffect(() => {
    Axios.get(`http://localhost:3001/AALHRIA/viewCarta/${setid}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((data) => {
      setCartaInfo(data.data.carta);
      setCitizen(data.data.citizenInfo);
    });
  }, [viewactvity, setid]);
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
  return (
    <>
      <Transition appear show={viewactvity} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setViewactvity}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            {<ToastContainer />}
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                  <div className=" flex justify-between items-center p-3">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-semibold my-0">
                        Recent Activity
                      </h2>
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={}
                      onClick={() => setViewactvity(false)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="w-full h-auto ">
                    <div className="w-full h-full bg-white flex flex-col px-4 py-7 ">
                      {/* <h1>{setid}</h1> */}
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Owner name
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                lAND ID
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Action
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                              </th>
                            </>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const tableData = [];
                            if(cartaInfo.cartaTitleDeedNo !== null || citizen.img !== null)
                            for (let x in cartaInfo) {
                              tableData.push(
                                <tr>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 w-10 h-10">
                                        <img
                                          className="w-full h-full rounded-full"
                                          src={`/uploads/citizenImages/${citizen[x].img}`}
                                          alt=""
                                        />
                                      </div>
                                      <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                          {citizen[x].fullName}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {cartaInfo[x].cartaTitleDeedNo}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                      <span
                                        aria-hidden
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                      ></span>
                                      <span className="relative">
                                        {cartaInfo[x].action}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {dateConverter(cartaInfo[x].lastModifiedDate)}
                                    </p>
                                  </td>
                                </tr>
                              );
                            }
                            return tableData;
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ViewActivity;
