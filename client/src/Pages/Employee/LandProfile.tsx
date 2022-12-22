import React, { Dispatch, SetStateAction, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  showland: boolean;
  setShowland: Dispatch<SetStateAction<boolean>>;
};

const LandProfile = ({ showland, setShowland }: Props) => {
  return (
    <>
      <Transition appear show={showland} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowland}>
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
                <div className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className=" flex justify-between p-3 items-center">
                    <h1 className="font-semibold text-2xl">Land Details</h1>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={}
                      onClick={() => setShowland(false)}
                    >
                      Close
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 px-3 py-3 flex text-center justify-center items-center"
                  >
                    Addis Ababa City Goverment Land Adminstration <br />
                    and permit Authority permit Hold Certificate of Tittle Deed
                  </Dialog.Title>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div> */}

                  <div className="mt- px-3">
                    <div className="w-full  flex justify-end font-semibold text-base">
                      <p>Date: current date</p>
                    </div>
                    <div className=" w-full flex justify-between  mt-2">
                      <div className="flex flex-col space-y-3 font-semibold text-base">
                        <h1>Posserors Full Name:</h1>
                        <h1>Partners Full Name:</h1>
                      </div>
                      <div className="flex flex-col space-y-3 px-4 font-semibold text-base">
                        <h1>House Number:</h1>
                        <h1>Registration Number:</h1>
                        <h1>Permmit Use:</h1>
                        <h1>Carta Issue date:</h1>
                        <h1>Staff member:</h1>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mt-4">
                      <div className="w-1/2 p-2 h-[450px] bg-black flex justify-center items-center text-white">
                        image goes here
                      </div>
                      <div className="w-1/2  p-4   ">
                        {/* table section */}
                        <h1 className="text-center">COORDINATES</h1>
                        <div className="flex flex-col">
                          <div className="overflow-x-auto  ">
                            <div className="py-4 inline-block w-full ">
                              <div className="overflow-hidden">
                                <table className="min-w-full text-center">
                                  <thead className="border-b bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4"
                                      >
                                        X
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4"
                                      >
                                        Y
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-white border-b">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        1
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Mark
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        2
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Jacob
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        3
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        Larry the Bird
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
                    {/* the info table */}
                    <div className="flex flex-col mt-">
                      <div className="overflow-x-auto  ">
                        <div className="py-4 inline-block w-full ">
                          <div className="overflow-hidden">
                            <table className="min-w-full text-center">
                              <thead className="border-b bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Former werda
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Former Kebele
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Sub City
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    block number
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    parcel Number
                                  </th>

                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Plot Area
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    built Up Area
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    land Grade
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Tittle Deed Number
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Base Map number
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Type of holding
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Land use
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Permmit use
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    1
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    Mark
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Button */}
                    <div className="flex justify-end space-x-3">
                      {" "}
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // onClick={}
                      >
                        Update
                      </button>
                      {/* add print land nati */}
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // onClick={}
                      >
                        print land details
                      </button>
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

export default LandProfile;
