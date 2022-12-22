import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import IdContext from "../../Context/Context";

type Props = {};

const Navbar = (props: Props) => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const timeElasped = Date.now();
  const today = new Date(timeElasped);
  const defaultLogout: object = {
    id: 0,
    username: "",
    role: "",
    status: false,
  };
  const [nav, setNav] = useState(false);
  const { user, setUser } = useContext(IdContext);

  const handleClick = () => setNav(!nav); //?

  /*
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    role: "",
    status: false,
  });
  */
  const [showOption, setShowOption] = useState(false); //modal ui interface
  // const [signout, setSignOut] = useState(false);
  // const handlesignout = () => {
  //   setSignOut(!signout);
  // };
  // const handleclick = () => {
  //   setShowOption(!showOption);
  // };
  const logout = () => {
    localStorage.removeItem("token");
    //navigate("/signup");
    setUser({ ...defaultLogout});
    navigate("/");
    //setAuthState({ ...authState });
  };
  // const { userid, setuserid } = useContext(IdContext);

  // const [_username, setUserName] = useState({});
  // const [_name, setName] = useState("");
  // const [_email, setEmail] = useState("");
  // const [_phoneNumber, setPhoneNumber] = useState("");
  // const [_sex, setSex] = useState("");
  // const [_birthday, setBirthday] = useState("");
  // const [_assignedBy, setAssignedBy] = useState(0);

  useLayoutEffect(() => {
    Axios.get("http://localhost:3001/AALHRIA/isloggedin", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then(
      (response) => {
        console.log(`Output ${JSON.stringify(response)}`);
        /**
         * [response.data]
         * @param  {[boolean]} loggedIn [description]
         * @param  {[int]} userId [description]
         * @param  {[string]} username [description]
         * @param  {[int]} assignedBy [description]
         * @param  {[string]} adminName [Combination of the first name and the middle name]
         * @param  {[string]} roleName [description]
         * @param  {[string]} firstName [description]
         * @param  {[string]} middleName [description]
         * @param  {[string]} lastName [description]
         * @param  {[string]} email [description]
         * @param  {[string]} phoneNumber [description]
         * @param  {[string]} sex [description]
         * @param  {[string]} birthday [description]
         * @param  {[string]} message [description]
         * @return {[object]}      [returns a JSON object for these mentioned attributes]
         */
        if (response.status === 200) {
          // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
          // "status":200,"statusText":"OK" Successfull Token Authentication
          // Standard response for successful HTTP requests
          setUser({
            id: response.data.userId,
            img: response.data.img,
            username: response.data.username,
            role: response.data.roleName,
            status: true,
          });
        }
      },
      (error) => {
        console.log(`Nav error: ${JSON.stringify(error)}`);
        // 401 page here by using navigate(/)
        // 401 Unauthorized
        // Similar to 403 Forbidden, but specifically for use
        // when authentication is required and has failed or has not yet been provided.
        if (error.response.status === 401) {
          navigate("/not_found");
        }
        setUser({ ...defaultLogout });
      }
    );
    console.log(`Previous user: ${JSON.stringify(user)}`);
  }, []);

  return (
    <>
      <nav className="bg-gray-100 text-black ">
        <div className=" px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={handleClick}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white  z-20"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {/* this hook is used to see if the nav usestate is true is it is 
                    it set the humberger else the close sign is seen
                
                */}

                {!nav ? <FaBars /> : <FaTimes />}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className=" h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />

                {/* logo */}
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {user.role === "Admin" ? (
                    <>
                      <Link
                        to="/adminhomepage"
                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        HOME
                      </Link>
                      <Link
                        to="/adminhomepage/employees"
                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        Manage Employees
                      </Link>
                      <Link
                        to="/adminhomepage/employees"
                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        Archive
                      </Link>
                    </>
                  ) : user.role === "Employee" ? (
                    <>
                      <Link
                        to="/employeehomepage"
                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        HOME
                      </Link>

                      <Link
                        to="/employeehomepage/lands"
                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        Registered Lands
                      </Link>
                      <Link
                        to="/employeehomepage/landregistration"
                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        Register Land
                      </Link>
                      <Link
                        to="/employeehomepage/owners"
                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        aria-current="page"
                      >
                        Owners
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* 
               <Link to="/adminhomepage/manageEmployee"> ManagEmp </Link>
                <Link to="/adminhomepage/registerEmployee">RegisterEmp</Link>
              
              */}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <Menu as="div" className="relative ml-3">
                <div className="flex justify-center items-center">
                  <Menu.Button
                    type="button"
                    className="flex rounded-full bg-gray-100 text-sm focus:outline-none justify-center items-center "
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      // onClick={() => setShowOption(!showOption)}
                      className="h-8 w-8 rounded-full"
                      src={`/uploads/staffImages/${user.img}`}
                      alt=""
                    />
                    {/* the logined in usr name */}
                    <div className="pl-2 md:flex flex-col justify-start hidden ">
                      <h1>{user.username}</h1>
                      <p>{today.toDateString()}</p>
                    </div>
                  </Menu.Button>
                </div>
                {/* the Drop down for the profile icon */}

                <Menu.Items
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {user.role === "Admin" ? (
                    <>
                      <Link
                        to={`/adminhomepage/staffprofile/${user.id}`}
                        onClick={() => setShowOption(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                    </>
                  ) : user.role === "Employee" ? (
                    <>
                      <Link
                        to={`/employeehomepage/staffprofile/${user.id}`}
                        onClick={() => setShowOption(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                  <a
                    onClick={() => setShowOption(false)}
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    onClick={logout}
                    //onClick={() => setShowOption(false)}
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
        {/* Moble menu */}
        <div
          className={
            !nav
              ? "hidden"
              : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center z-10 md:hidden"
          }
        >
          <div className="space-y-6 px-2  pt-2 pb-3">
            <a
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md  font-medium text-4xl"
              aria-current="page"
            >
              Dashboard
            </a>

            <a
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-4xl font-medium"
            >
              Team
            </a>

            <a
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-4xl  font-medium"
            >
              Projects
            </a>

            <a
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-4xl ont-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
