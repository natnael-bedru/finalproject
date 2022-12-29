import React, {
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import Graph from "../../assets/Graph.png";
import Ownerprofile from "./Ownerprofile";
import { Dialog, Transition } from "@headlessui/react";
import Aos from "aos";
import "aos/dist/aos.css";
import Graphcharts from "../../Charts/Graphchart";
import Piechart from "../../Charts/Piechart";
import Barchart from "../../Charts/Barchart";
import Colchart from "../../Charts/Colchart";
import IdContext from "../../Context/Context";

type Props = {
  // show: boolean;
  // setShow: Dispatch<SetStateAction<boolean>>;
};

const EmployeePage = (Props: Props) => {
  const { user } = useContext(IdContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="     ">
        {/* <!-- This is an example component --> */}
        <div>
          <div className="flex flex-col w-full h-screen   ">
            {/* <div
              className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
              id="sidebarBackdrop"
            ></div> */}
            <div
              id="main-content"
              className="h-full w-full bg-gray- relative font-poppins  "
            >
              <main>
                <div className="pt-9 px-4 font-poppins">
                  <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                            {/* {user.username} */}
                            5,385
                          </span>
                          <h3 className="text-base font-normal text-gray-500">
                            Authication this week
                          </h3>
                        </div>
                        <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                          12.5%
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
                        </div>{" "}
                      </div>
                      <div id="main-chart">
                        <Graphcharts />
                        {/* <Barchart /> */}
                      </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Latest Registration
                          </h3>
                          <span className="text-base font-normal text-gray-500">
                            This is a list of latest Registration
                          </span>
                        </div>
                        <Link to="/employeehomepage/lands">
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
                                      Payment from{" "}
                                      <span className="font-semibold">
                                        Bonnie Green
                                      </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      Apr 23 ,2021
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      $2300
                                    </td>
                                  </tr>
                                  <tr className="bg-gray-50">
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                      Payment refund to{" "}
                                      <span className="font-semibold">
                                        #00910
                                      </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      Apr 23 ,2021
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      -$670
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      Payment failed from{" "}
                                      <span className="font-semibold">
                                        #087651
                                      </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      Apr 18 ,2021
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      $234
                                    </td>
                                  </tr>
                                  <tr className="bg-gray-50">
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                      Payment from{" "}
                                      <span className="font-semibold">
                                        Lana Byrd
                                      </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      Apr 15 ,2021
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      $5000
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      Payment from{" "}
                                      <span className="font-semibold">
                                        Jese Leos
                                      </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      Apr 15 ,2021
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      $2300
                                    </td>
                                  </tr>
                                  <tr className="bg-gray-50">
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                      Payment from{" "}
                                      <span className="font-semibold">
                                        THEMESBERG LLC
                                      </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      Apr 11 ,2021
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      $560
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                      Payment from{" "}
                                      <span className="font-semibold">
                                        Lana Lysle
                                      </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      Apr 6 ,2021
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                      $1437
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
                          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
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
                            Authication this week
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
                  </div>
                </div>
              </main>
              <div className="w-full lg:flex flex-row h-auto ">
                <div className="lg:w-1/2  w-full ">
                  <div className="max-w-4xl mx-auto p-5">
                    {/* <Barchart /> */}
                    <Colchart />
                  </div>
                </div>
                <div className="lg:w-1/2 w-full bg te">
                  <div className=" ">
                    {/* this should go to the welcome page */}
                    <section className=" dark:text-gray-100 font-poppins">
                      <div className="container max-w-5xl px-4 py-12 mx-auto">
                        <div className="grid gap-4 mx-4 sm:grid-cols-12">
                          <div className="col-span-12 sm:col-span-3">
                            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-blue-400">
                              <h3 className="text-3xl font-semibold text-black">
                                LRAS
                              </h3>
                              <span className="text-sm font-bold tracking-wider uppercase dark:text-black">
                                Fast,Secure and Relaiable
                              </span>
                            </div>
                          </div>
                          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
                              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-blue-400">
                                <h3 className="text-xl font-semibold tracking-wide text-black">
                                  Donec porta enim vel{" "}
                                </h3>
                                <time className="text-xs tracking-wide uppercase dark:text-black">
                                  Dec 2020
                                </time>
                                <p className="mt-3 text-black">
                                  Pellentesque feugiat ante at nisl efficitur,
                                  in mollis orci scelerisque. Interdum et
                                  malesuada fames ac ante ipsum primis in
                                  faucibus.
                                </p>
                              </div>
                              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-blue-400">
                                <h3 className="text-xl font-semibold tracking-wide text-black">
                                  Aliquam sit amet nunc ut
                                </h3>
                                <time className="text-xs tracking-wide uppercase dark:text-black">
                                  Jul 2019
                                </time>
                                <p className="mt-3 text-black">
                                  Morbi vulputate aliquam libero non dictum.
                                  Aliquam sit amet nunc ut diam aliquet
                                  tincidunt nec nec dui. Donec mollis turpis
                                  eget egestas sodales.
                                </p>
                              </div>
                              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-400">
                                <h3 className="text-xl font-semibold tracking-wide text-black">
                                  Pellentesque habitant morbi
                                </h3>
                                <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                                  Jan 2016
                                </time>
                                <p className="mt-3 text-black">
                                  Suspendisse tincidunt, arcu nec faucibus
                                  efficitur, justo velit consectetur nisl, sit
                                  amet condimentum lacus orci nec purus. Mauris
                                  quis quam suscipit, vehicula felis id,
                                  vehicula enim.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              {/* <Link to="/employeehomepage/landregistration"> Landreg </Link>
              <Link to="/employeehomepage/employeeprofile">empprofile</Link> */}
              {/* <div className="">
                <button
                  onClick={() => setIsOpen(true)}
                  //onClick={() => setOwner(true)}
                  className=" top-0 px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600  focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
                >
                  open modal
                </button>
              </div> */}
              <div className="md:w-full    bg-white   lg:flex-col flex-row pb-20 overflow-hidden  font-poppins">
                <div className=" mt-10 md:ml- ml- flex flex-col  px-4  mb-6">
                  <h1 className=" py-4 font-semibold text-2xl  ">News Feed</h1>

                  <p> new information and updates </p>
                </div>
                {/* cards */}
                <div className="w-full flex flex-row bg-white ">
                  <div className="md:w-2/3 w-full  px-4 flex">
                    <div className="flex flex-col py-4">
                      <div className=" w-[712px] h-80  cursor-pointer text-black hover:text-white transition duration-300 ease-in-out relative object-fill rounded-lg ">
                        <img
                          alt=""
                          className="bg-cover w-full h-80 bg-newsimg bg-no-repeat rounded-lg  "
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                        <span className="absolute bottom-0 left-0 px-7 my-7  ">
                          <h1>What is Lorem Ipsum? box1</h1>
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
                            <h1>What is Lorem Ipsum? box2</h1>
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
                            <h1>What is Lorem Ipsum? box2</h1>
                            <p>Lorem Ipsum is simply dummy text</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" md:flex-col w-full px-4 py-4 ">
                      <div className="space-y-3 h-auto">
                        <div className="w-full h-60  text-black hover:text-white transition duration-300 ease-in-out relative object-fill  rounded-lg  ">
                          <img
                            alt=""
                            className="bg-cover w-full h-60 bg-newsimg4 bg-no-repeat rounded-lg  "
                          />
                          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full rounded-lg  overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-black/75 hover:text-white"></div>
                          <span className="absolute bottom-0 left-0 px-7 my-7  ">
                            <h1>What is Lorem Ipsum? box4</h1>
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
                            <h1>What is Lorem Ipsum? box5</h1>
                            <p>Lorem Ipsum is simply dummy text</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3 md:flex md:flex-col hidden  border-l-2 px-3 py-4 space-y-2">
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
            </div>{" "}
          </div>{" "}
        </div>
      </div>
      {<Ownerprofile show={isOpen} setShow={setIsOpen} />}
    </>
  );
};

export default EmployeePage;
