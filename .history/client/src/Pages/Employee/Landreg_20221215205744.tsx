import React from "react";

type Props = {};

const Landreg = (props: Props) => {
  return (
    <>
      {/* <div className="w-full h-screen ">
        <div className="w-full h-full bg-white flex flex-col px-8 py-4">
          <div className="flex items-center max-h-min justify-between w-full">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold my-0">Land Registration</h2>
              <p className="text-sm font-light">
                View Land information and manage them here
              </p>
            </div>
            <div className="flex"></div>
          </div>

          <div className="mt-10 mx-auto flex flex-col w-full">
            <div className="w-full">
              <section className="p-3 rounded-md shadow-md dark:bg-gray-100 text-black">
                <h1 className="text-xl font-bold capitalize ">
                  Land Registration Form
                </h1>
                <form>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label className="" htmlFor="username">
                        First Name
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder="First Name"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="username">
                        Last Name
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="username">
                        middle Name
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="emailAddress">
                        username
                      </label>
                      <input
                        id="Address"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>

                    <div>
                      <label className="" htmlFor="">
                        phone number
                      </label>
                      <input
                        id="text"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="password">
                        Email
                      </label>
                      <input
                        id="text"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="emailAddress">
                        password
                      </label>
                      <input
                        id="Address"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                    <div>
                      <label className="" htmlFor="emailAddress">
                        Registerd By
                      </label>
                      <input
                        id="Address"
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                   

                    <div>
                      <label className="block text-sm font-medium">
                        {" "}
                        Image{" "}
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span className="">Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                      Save
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-full h-screen ">
        <div className="w-full h-full bg-white flex flex-col px-8 py-4">
          <div className="flex items-center max-h-min justify-between w-full">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold my-0">
                Empyee Registration
              </h2>
              <p className="text-sm font-light">
                View Sales information and manage them here
              </p>
            </div>
            <div className="flex"></div>
          </div>

          <div className="mt-10 mx-auto flex flex-col w-full jsu">
            <div className="w-full ">
              <section className="p-3 rounded-md shadow-md  text-black">
                <h1 className="text-xl font-bold capitalize ">
                  Sales Registration Form
                </h1>
                <form>
                  <div className="flex justify-between my-4  ">
                    <div className="w-4/5  h-auto flex flex-col    px-2">
                      {" "}
                      <div className="">
                        <div>
                          <label className="block text-sm  font-medium">
                            Employee Image
                          </label>
                          <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 h-[800px] border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span className="">Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full  h-full flex flex-col justify-center items-center px-2 space-y-4">
                      <div className="flex w-full space-x-4">
                        <div className="w-full">
                          <label
                            className=" dark:text-black"
                            htmlFor="passwordConfirmation"
                          >
                            possersor name
                          </label>
                          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled selected>
                              Unspecified
                            </option>
                            <option>Jakarta</option>
                            <option>Tangerang</option>
                            <option>Bandung</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <label
                            className=" dark:text-black"
                            htmlFor="passwordConfirmation"
                          >
                            sub city
                          </label>
                          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled selected>
                              Unspecified
                            </option>
                            <option>Jakarta</option>
                            <option>Tangerang</option>
                            <option>Bandung</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <label
                            className=" dark:text-black"
                            htmlFor="passwordConfirmation"
                          >
                            Former wereda
                          </label>
                          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled selected>
                              Unspecified
                            </option>
                            <option>Jakarta</option>
                            <option>Tangerang</option>
                            <option>Bandung</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex w-full space-x-4">
                        <div className="w-full">
                          <label
                            className=" dark:text-black"
                            htmlFor="passwordConfirmation"
                          >
                            Former Kebele
                          </label>
                          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled selected>
                              Unspecified
                            </option>
                            <option>Jakarta</option>
                            <option>Tangerang</option>
                            <option>Bandung</option>
                          </select>
                        </div>

                        <div className="w-full">
                          <label className="" htmlFor="username">
                            block Number
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="block number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            parcel Number
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="parcel number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className="flex w-full space-x-4">
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            House number
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="First Name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            plot Area
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="block number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            land grade
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="parcel number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className="flex w-full space-x-4">
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            Tittle Deed Number
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="First Name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            plot Area
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="block number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="w-full">
                          <label className="" htmlFor="birthday">
                            Carta issued date
                          </label>
                          {/* <ErrorMessage
                            name="birthday"
                            component="span"
                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                          /> */}
                          <input
                            id="birthday"
                            name="birthday"
                            type="date"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className="flex w-full space-x-4">
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            base map number
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="First Name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            Registration number
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="block number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            className=" dark:text-black"
                            htmlFor="passwordConfirmation"
                          >
                            Type of holding
                          </label>
                          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled selected>
                              Unspecified
                            </option>
                            <option>Jakarta</option>
                            <option>Tangerang</option>
                            <option>Bandung</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex w-full space-x-4">
                        <div className="w-full">
                          <label
                            className=" dark:text-black"
                            htmlFor="passwordConfirmation"
                          >
                            Planned land use
                          </label>
                          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled selected>
                              Unspecified
                            </option>
                            <option>Jakarta</option>
                            <option>Tangerang</option>
                            <option>Bandung</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <label
                            className=" dark:text-black"
                            htmlFor="passwordConfirmation"
                          >
                            permmited use
                          </label>
                          <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="" disabled selected>
                              Unspecified
                            </option>
                            <option>Jakarta</option>
                            <option>Tangerang</option>
                            <option>Bandung</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <label className="" htmlFor="username">
                            Staff number
                          </label>
                          <input
                            id="username"
                            type="text"
                            placeholder="First Name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                          />
                        </div>
                      </div>
                      <div className=" w-1/2    ">
                        <h1 className="pb-3 font-semibold text-lg">
                          coordiate
                        </h1>
                        <div className="flex flex-col border-2 rounded-md  border-black">
                          <div className="overflow-x-auto ">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                              <div className="overflow-hidden">
                                <table className="min-w-full">
                                  <thead className="border-b">
                                    <tr className="">
                                      <th
                                        scope="col"
                                        className="text-sm font-medium  text-gray-900 px-6 py-4 text-left"
                                      >
                                        X
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                      >
                                        Y
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b">
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                    </tr>
                                    <tr className="border-b">
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
                                      </td>
                                      <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <input
                                          className="w-full h-full p-4"
                                          type="text"
                                        />
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
                  </div>

                  <div className="flex justify-end   space-x-4">
                    <button
                      type="button"
                      className="hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Canel
                    </button>
                    <button
                      type="button"
                      className="  hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landreg;
