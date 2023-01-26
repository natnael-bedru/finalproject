// tsrafce
import Axios from "axios";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { parseClassName } from "react-toastify/dist/utils";
import IdContext from "../../Context/Context";
import Updatestaff from "./Updatestaff";

type Props = {
  empProfile: boolean;
  setempProfile: Dispatch<SetStateAction<boolean>>;
};

const Employeeprofile = ({ empProfile, setempProfile }: Props) => {
  const [upd, setUpd] = useState(false);
  const { user } = useContext(IdContext);
  // staffId is used to hold and pass id
  const [staffId, setStaffId] = useState(0);
  const [staff, setStaff] = useState({
    img: "",
    assignedBy: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    accountStatus: "",
    email: "",
    phoneNumber: "",
    sex: "",
    birthday: "",
    residentAddress: "",
    joinedDate: "",
    lastChanged: "",
    adminName: "",
    roleName: "",
  });
  const param = useParams();

  useLayoutEffect(() => {
    Axios.get(`http://localhost:3001/AALHRIA/viewstaff/${param.id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      if (param.id) {
        setStaffId(parseInt(param.id.toString()));
      }
      console.log(response.data[0]);
      setStaff(response.data[0]);
    });
  }, [param.id]);
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
    Axios.get(`http://localhost:3001/AALHRIA/viewCarta/${param.id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((data) => {
      setCartaInfo(data.data.carta);
      setCitizen(data.data.citizenInfo);
    });
  }, [param.id]);

  return (
    <>
      <div className="w-full h-full bg-white flex flex-col px-8 py-4 font-poppins">
        <div className="flex  items-center max-h-min justify-between w-full ">
          <div className="flex flex-col">
            <h2 className=" text-2xl font-semibold my-0">{`Staff Details `}</h2>
            <p className="text-sm font-light">
              View Staff Details information and manage them here
            </p>
          </div>
        </div>
        {/* <!-- component --> */}

        <div className="drop-shadow-lg">
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
                      src={`/uploads/staffImages/${staff.img}`}
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {`${staff.firstName} ${staff.lastName} [${staff.roleName}]`}
                  </h1>
                  {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">
                    Owner at Her Company Inc.
                  </h3> */}
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit, eligendi dolorum sequi illum qui unde
                    aspernatur non deserunt
                  </p>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        {staff.accountStatus === "Active" ? (
                          <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                            {staff.accountStatus}
                          </span>
                        ) : staff.accountStatus === "Inactive" ? (
                          <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                            {staff.accountStatus}
                          </span>
                        ) : (
                          <></>
                        )}
                      </span>
                    </li>
                    {user.id === 1 && staff.assignedBy !== null ? (
                      <li className="flex items-center py-3">
                        <span>Assigned By</span>
                        <span className="ml-auto">{staff.adminName}</span>
                      </li>
                    ) : (
                      <></>
                    )}
                    <li className="flex items-center py-3">
                      <span>Member Since</span>
                      <span className="ml-auto">
                        {dateConverter(staff.joinedDate)}
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Last Modified</span>
                      <span className="ml-auto">
                        {dateConverter(staff.lastChanged)}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div className="my-4"></div>
                {/* <!-- Friends card --> */}
                {staff.username !== user.username ? (
                  <div className="bg-white p-3 hover:shadow">
                    <div className="flex items-center justify-between space-x-3 font-semibold text-gray-900 text-xl leading-8">
                      <button
                        onClick={() => setUpd(true)}
                        className="px-2 py-2 leading-5 text-xs text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
                      >
                        Update Profile
                      </button>

                      {/* <button className="px-2 py-2 leading-5 text-xs text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600">
                      Delete Profile
                    </button> */}
                    </div>
                  </div>
                ) : (
                  <></>
                )}

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
                        <div className="px-4 py-2">{staff.firstName}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Last Name</div>
                        <div className="px-4 py-2">{staff.lastName}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2">{staff.sex}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Contact No.
                        </div>
                        <div className="px-4 py-2">{staff.phoneNumber}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Username</div>
                        <div className="px-4 py-2">{staff.username}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">{staff.residentAddress}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email</div>
                        <div className="px-4 py-2">
                          <a
                            className="text-blue-800"
                            href="mailto:jane@example.com"
                          >
                            {staff.email}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Birthday</div>
                        <div className="px-4 py-2">
                          {dateConverter(staff.birthday)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                    Show Full Information
                  </button>
                </div>
                {/* <!-- End of about section --> */}
                {staff.roleName === "Employee" ? (
                  <>
                    <div className="my-4"></div>

                    <table className="w-full text-sm text-left border text-gray-500 dark:text-gray-400 mb-auto">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-black">
                        <tr>
                          
                          <th scope="col" className="px-12 py-3">
                            Full Name
                          </th>
                          <th scope="col" className="px-12 py-3">
                            Title Deed Number
                          </th>
                          <th scope="col" className="px-12 py-3">
                            Action
                          </th>

                          <th scope="col" className="px-12 py-3">
                            Date
                          </th>
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
                    {/* <!-- Pagination --> */}
                    <nav
                      aria-label="Page navigation example "
                      className=" flex justify-end mt-1 "
                    >
                      <ul className="inline-flex -space-x-px">
                        <li>
                          <a
                            href="/"
                            className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-gray-400  dark:hover:text-black"
                          >
                            Previous
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:bg-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {<Updatestaff updEmp={upd} setUpdEmp={setUpd} staffId={staffId} />}
    </>
  );
};

export default Employeeprofile;
