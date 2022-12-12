import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import IdContext from "../../Context/Context";

type Props = {
  Empreg: boolean;
  setEmpreg: Dispatch<SetStateAction<boolean>>;
};

const RegisterEmp = ({ Empreg, setEmpreg }: Props) => {
  const { user } = useContext(IdContext);

  const initialValues = {
    roleid: 2,
    assignedBy: user.id,
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phonenumber: "",
    sex: "",
    birthday: "",
    currnetAddress: "",
  };
  const validationSchema = Yup.object().shape({
    // firstName: Yup.string().required(),
    // middleName: Yup.string().required(),
    // lastName: Yup.string().required(),
    // username: Yup.string().required(),
    // password: Yup.string().required(),
    // sex: Yup.string().required(),
    // birthday: Yup.string().required(),
    // phonenumber: Yup.string().required(),
    // email: Yup.string().required(),
    //email: Yup.string().required('Email id is mendatory').email(),
    // currnetAddress: Yup.string().required(),
    // roleid: Yup.string().required(),
  });

  const [date, setdate] = useState("");

  //const formOptions = { resolver: yupResolver(validationSchema) };
  const onSubmit = (data: object) => {
    console.log(`DATA ${JSON.stringify(data)}`);
  };
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
                                          Employee Image
                                        </label>
                                        <div className="mt-1 flex justify-center  items-center px-6 pt-5 pb-6 border-2 h-96 border-gray-300 border-dashed rounded-md">
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
                                          <Field
                                            id="lastName"
                                            name="lasteName"
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
                                          <Field
                                            name="sex"
                                            as="select"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          >
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
                                          <Field
                                            name="roleid"
                                            as="select"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          >
                                            <option value="1">Admin</option>
                                            <option value="2" selected>
                                              Employee
                                            </option>
                                          </Field>
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor="birthday"
                                          >
                                            Date of Birth
                                          </label>
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
                                          <Field
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            placeholder="+251"
                                            placeholderTextColor="#808080"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                        <div className="w-full">
                                          <label
                                            className=""
                                            htmlFor=" currnetAddress"
                                          >
                                            Currnet Address
                                          </label>
                                          <Field
                                            id="currnetAddress"
                                            name="currnetAddress"
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 placeholder:text-black text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex w-full space-x-4">
                                        <div className="w-full">
                                          <label className="" htmlFor="email">
                                            Email
                                          </label>
                                          <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="johndoe@gmail.com"
                                            placeholderTextColor="#808080"
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
                                          <Field
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="johndoe"
                                            placeholderTextColor="#808080"
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
                                          <Field
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="********"
                                            placeholderTextColor="#808080"
                                            className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                          />
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
                                    className="  hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
