import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import IdContext from "../../Context/Context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "react-avatar-edit";

type Props = {
  Empreg: boolean;
  setEmpreg: Dispatch<SetStateAction<boolean>>;
};

const RegisterEmp = ({ Empreg, setEmpreg }: Props) => {
  const [imgBase64, setImgBase64] = useState("");
  //true: Active, false: Suspended
  const [accountStatus, setAccountStatus] = useState(true);
  const onClose = () => {
    setImgBase64("");
  };
  const onCrop = (view: string) => {
    console.log(`onCrop [data: string]`);
    setImgBase64(view);
  };

  const { user } = useContext(IdContext);
  const [_msg, setMsg] = useState({
    type: "",
    message: "",
  });
  const initialValues = {
    roleid: "",
    img: "",
    assignedBy: user.id,
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    password: "",
    accountStatus: "",
    email: "",
    phoneNumber: "",
    sex: "",
    birthday: "",
    residentAddress: "",
    lastChange: new Date().toISOString().substring(0, 10),
    joinedDate: new Date().toISOString().substring(0, 10),
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("*required"),
    middleName: Yup.string().required("*required"),
    lastName: Yup.string().required("*required"),
    username: Yup.string().required("*required"),
    password: Yup.string().required("*required"),
    sex: Yup.string().required("*required"),
    birthday: Yup.string().required("*required"),
    phoneNumber: Yup.string().required("*required"),
    email: Yup.string().required("*required"),
    residentAddress: Yup.string().required("*required"),
    roleid: Yup.string().required("*required"),
  });
  const onSubmit = (data: any) => {
    console.log(`FILE HERE: ${data.img}`);
    if (accountStatus) {
      data.accountStatus = "Active";
    } else {
      data.accountStatus = "Inactive";
    }
    //data.accountStatus=
    // const file = dataURLtoFile(imgBase64,"test");
    data.img = imgBase64;
    //data.file = imgBase64;
    //imgBase64
    console.log(`FILE HERE2: ${data.img}`);
    Axios.post("http://localhost:3001/AALHRIA/register", data, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(`Response: ${JSON.stringify(response.data)}`);
      if (response.data.status === "fail") {
        //errorcode
        //message
        setMsg({
          type: "error",
          message: response.data.message,
        });
      } else if (response.data.status === "success") {
        //affectedRows
        //message
        setMsg({
          type: "success",
          message: response.data.message,
        });
      }
    });
  };
  useEffect(() => {
    if (_msg.type) {
      if (_msg.type === "error") {
        toast.error(_msg.message);
      } else if (_msg.type === "success") {
        toast.success(_msg.message);
      }
      setMsg({
        type: "",
        message: "",
      });
    }
  }, [_msg]);

  return (
    <>
      <Transition appear show={Empreg} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setEmpreg}>
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
                <div className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                  <div className=" flex justify-between items-center p-3">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-semibold my-0">
                        Staff Registration
                      </h2>
                      <p className="text-sm font-light">
                        Staff Registration From
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={}
                      onClick={() => setEmpreg(false)}
                    >
                      Close
                    </button>
                  </div>
                  <div className="w-full h-auto ">
                    <div className="w-full h-full bg-white flex flex-col px-8 ">
                      <div className="flex items-center  max-h-min justify-between w-full">
                        <div className="flex"></div>
                      </div>

                      <div className=" mx- flex flex-col w-full justify-end">
                        <div className="w-full h-s ">
                          <section className=" w-full h-full items-start justify-center p-3 rounded-md   text-black">
                            <Formik
                              initialValues={initialValues}
                              onSubmit={onSubmit}
                              validationSchema={validationSchema}
                            >
                              <Form>
                                <div className="flex justify-between my-4  ">
                                  {/* IMAGE */}
                                  <div className="w-5/6  h- flex flex-col    px-2">
                                    {" "}
                                    <div className="">
                                      <div>
                                        <label className="block text-sm  font-medium">
                                          Staff Image
                                        </label>
                                        <Avatar
                                          width={400}
                                          height={400}
                                          imageWidth={400}
                                          imageHeight={400}
                                          exportAsSquare={true}
                                          onCrop={onCrop}
                                          onClose={onClose}
                                          // onFileLoad={onFileLoad}
                                          // onImageLoad={onImageLoad}
                                          // onBeforeFileLoad={onBeforeFileLoad}
                                          label={
                                            <>
                                              <div className="mt-1 flex justify-center  items-center px-6 pt-5 pb-6 h-96 ">
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
                                                      <span className="">
                                                        Upload a file
                                                      </span>
                                                      <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                      />
                                                    </label>
                                                    <p className="pl-1">
                                                      or drag and drop
                                                    </p>
                                                  </div>
                                                  <p className="text-xs">
                                                    PNG, JPG, GIF up to 10MB
                                                  </p>
                                                </div>
                                              </div>
                                            </>
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="w-full  h-full  px-2 ">
                                    <div className="col-span-1 w-full space-y-5">
                                      {" "}
                                      <div className="flex space-x-4 ">
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="firstName"
                                          >
                                            First Name
                                          </label>
                                          <ErrorMessage
                                            name="firstName"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            className=" is-invalid block w-full px-4 py-2 mt-2 placeholder:text-black text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="middleName"
                                          >
                                            Middle Name
                                          </label>
                                          <ErrorMessage
                                            name="middleName"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="middleName"
                                            name="middleName"
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="lastName"
                                          >
                                            Last Name
                                          </label>
                                          <ErrorMessage
                                            name="lastName"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                      </div>
                                      <div className=" flex w-full space-x-8">
                                        {" "}
                                        <div className="w-full">
                                          <label
                                            className=" dark:text-gray-900"
                                            htmlFor="sex"
                                          >
                                            Sex
                                          </label>
                                          <ErrorMessage
                                            name="sex"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            name="sex"
                                            as="select"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          >
                                            <option value="" disabled selected>
                                              Unspecified
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                              Female
                                            </option>
                                          </Field>
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=" dark:text-gray-900"
                                            htmlFor="roleid"
                                          >
                                            Role
                                          </label>
                                          <ErrorMessage
                                            name="roleid"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            name="roleid"
                                            as="select"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          >
                                            <option value="" disabled selected>
                                              Unspecified
                                            </option>
                                            <option value="1">Admin</option>
                                            <option value="2">Employee</option>
                                          </Field>
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="birthday"
                                          >
                                            Date of Birth
                                          </label>
                                          <ErrorMessage
                                            name="birthday"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="birthday"
                                            name="birthday"
                                            type="date"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex w-full space-x-8">
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="phoneNumber"
                                          >
                                            Phone number
                                          </label>
                                          <ErrorMessage
                                            name="phoneNumber"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="+251"
                                            type="tel"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor=" currentAddress"
                                          >
                                            Resident Address
                                          </label>
                                          <ErrorMessage
                                            name="residentAddress"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="residentAddress"
                                            name="residentAddress"
                                            placeholder="Bole"
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex w-full space-x-4">
                                        <div className="w-full">
                                          <label className="" htmlFor="email">
                                            Email
                                          </label>
                                          <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="johndoe@gmail.com"
                                            className="block w-full px-4 py-2 mt-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="username"
                                          >
                                            Username
                                          </label>
                                          <ErrorMessage
                                            name="username"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="johndoe"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="password"
                                          >
                                            Password
                                          </label>
                                          <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="ml-2 p-2 mb-2 text-sm text-red-700 "
                                          />
                                          <Field
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="********"
                                            className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex w-full space-x-4">
                                        <label>Account Status: </label>
                                        <div className="relative flex flex-col items-center justify-center overflow-hidden">
                                          <div className="flex">
                                            <label className="inline-flex relative items-center mr-5 cursor-pointer">
                                              <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={accountStatus}
                                                readOnly
                                              />
                                              <div
                                                onClick={() => {
                                                  setAccountStatus(
                                                    !accountStatus
                                                  );
                                                }}
                                                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                              ></div>
                                              <span className="ml-2 text-sm font-medium text-gray-900">
                                                {accountStatus && 'Active'}
                                                {!accountStatus && 'Inactive'}
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                  <button
                                    onClick={() => setEmpreg(false)}
                                    type="button"
                                    className="hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                  >
                                    Canel
                                  </button>
                                  <button
                                    type="submit"
                                    className=" dissabled hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                  >
                                    Save
                                  </button>
                                </div>
                              </Form>
                            </Formik>
                          </section>
                        </div>
                      </div>
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

export default RegisterEmp;
