// tsrafce
import  Axios  from "axios";
import React, { Dispatch, SetStateAction, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { parseClassName } from "react-toastify/dist/utils";

type Props = {
  empProfile: boolean;
  setempProfile: Dispatch<SetStateAction<boolean>>;
};

const Employeeprofile = ({ empProfile, setempProfile }: Props) => {

  useLayoutEffect(() => {
    Axios.get(`http://localhost:3001/AALHRIA//viewstaff/${param.id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then(
      (response) => {
        console.log(`Response ${JSON.stringify(response)}`);
      })});

  const param = useParams();
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col px-8 py-4">
        <div className="flex  items-center max-h-min justify-between w-full ">
          <div className="flex flex-col">
            <h2 className=" text-2xl font-semibold my-0">
              {`Sale Employee Details ${param.id}`}
            </h2>
            <p className="text-sm font-light">
              View Sales information and manage them here
            </p>
          </div>
        </div>
        {/* <!-- component --> */}

        <div className="bg-gray-100">
          {/* <!-- End of Navbar --> */}

          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              {/* <!-- Left Side --> */}
              <div className="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-white p-3 border-t-4 border-green-400">
                  <div className="image overflow-hidden">
                    <img
                      className="h-auto w-full mx-auto"
                      src="https://plus.unsplash.com/premium_photo-1663050629719-83e16832a804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    Jane Doe
                  </h1>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6">
                    Owner at Her Company Inc.
                  </h3>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit, eligendi dolorum sequi illum qui unde
                    aspernatur non deserunt
                  </p>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">Nov 07, 2016</span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div className="my-4"></div>
                {/* <!-- Friends card --> */}
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center justify-between space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <button className="px-2 py-2 leading-5 text-xs text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                      Update Profile
                    </button>

                    <button className="px-2 py-2 leading-5 text-xs text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                      Delete Profile
                    </button>
                  </div>
                </div>
                {/* <!-- End of friends card --> */}
              </div>
              {/* <!-- Right Side --> */}
              <div className="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab --> */}
                {/* <!-- About Section --> */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">About</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          First Name
                        </div>
                        <div className="px-4 py-2">Jane</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Last Name</div>
                        <div className="px-4 py-2">Doe</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2">Female</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Contact No.
                        </div>
                        <div className="px-4 py-2">+11 998001001</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">
                          Beech Creek, PA, Pennsylvania
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Permanant Address
                        </div>
                        <div className="px-4 py-2">
                          Arlington Heights, IL, Illinois
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                          <a
                            className="text-blue-800"
                            href="mailto:jane@example.com"
                          >
                            jane@example.com
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Birthday</div>
                        <div className="px-4 py-2">Feb 06, 1998</div>
                      </div>
                    </div>
                  </div>
                  <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                    Show Full Information
                  </button>
                </div>
                {/* <!-- End of about section --> */}

                <div className="my-4"></div>

                <table className="w-full text-sm text-left border text-gray-500 dark:text-gray-400 mb-auto">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sales ID
                      </th>
                      <th scope="col" className="px-12 py-3">
                        Sales Name
                      </th>
                      <th scope="col" className="px-12 py-3">
                        Driver Name
                      </th>

                      <th scope="col" className="px-12 py-3">
                        Driver Phone Number
                      </th>

                      <th scope="col" className="px-9 py-3">
                        Registration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      ></th>
                      <td className="px-12 py-4"></td>
                      <td className="px-7 py-4"></td>

                      <td className="px-12 py-4"></td>

                      <td className="px-9 py-4">
                        <div className="inline-flex space-x-1.5 items-center justify-center py-0.5 pl-1.5 pr-2 bg-green-50 rounded-full">
                          <p className="text-xs font-medium leading-none text-center text-green-700">
                            Succseful
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- Pagination --> */}
                <nav
                  aria-label="Page navigation example "
                  className=" flex justify-end mt-1 "
                >
                  <ul className="inline-flex -space-x-px">
                    <li>
                      <a
                        href="/"
                        className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Previous
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        2
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-current="page"
                        className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      >
                        3
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        4
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        5
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employeeprofile;
