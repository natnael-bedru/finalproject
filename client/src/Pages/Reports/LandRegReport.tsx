import React, {
  Dispatch,
  SetStateAction,
  Fragment,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import ReactToPrint, {
  PrintContextConsumer,
  useReactToPrint,
} from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import Axios from "axios";
import { Link } from "react-router-dom";

type Props = {
  repoland: boolean;
  setrepoland: Dispatch<SetStateAction<boolean>>;
  citizenId: number;
};

const LandRegReport = ({ repoland, setrepoland, citizenId }: Props) => {
  return (
    <>
      <Transition appear show={repoland} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setrepoland}>
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

          <div className="fixed inset-0 overflow-y-auto font-poppins">
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
                <div className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                  <div className=" flex justify-between items-center p-3">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-semibold my-0">
                        Recent Activity
                      </h2>
                      <p>
                        every activity of the current employees is listed here
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={}
                      onClick={() => setrepoland(false)}
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
                                Employee Name
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Assigned by
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Land registed to
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Registration date
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                transtfered owner to
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                transtfered date
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Details
                              </th>
                            </>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Vera Carpenter
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Admin
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative">Active</span>
                              </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Jan 21, 2020
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Jan 21, 2020
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Jan 21, 2020
                              </p>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <Link to="/adminhomepage/landprofilereport">
                                <button
                                  // onClick={() => setreposhow(true)}
                                  type="button"
                                  className="inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                  Activity
                                </button>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td className="px-5 py-5 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Alonzo Cox
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Admin
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative">Active</span>
                              </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Jan 21, 2020
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Jan 21, 2020
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                Jan 21, 2020
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <Link to="/adminhomepage/landupdatereport">
                                <button
                                  // onClick={() => setreposhow(true)}
                                  type="button"
                                  className="inline-block px-4 py-2.5 bg-transparent text-black font-medium text-md leading-tight  rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                  Activity
                                </button>
                              </Link>
                            </td>
                          </tr>
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

export default LandRegReport;
