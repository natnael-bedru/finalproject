import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import IdContext from "../../Context/Context";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
//import { Outlet } from "react-router-dom";

type Props = {};

const RegisterEmp = (props: Props) => {
  const { user } = useContext(IdContext);
  const navigate = useNavigate();
  const [_errMsg, setErrorMsg] = useState("");
  /*
  const [initialValues, setInitialValues] = useState({});
  useLayoutEffect(()=>{
  if(user){
    setInitialValues({
      role: 2, // Dropdown but the value to be
      assignedBy: user.id,
      firstName: "",
      middleName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      sex: "",
      birthday: "",
    });
  }
    
 },[]);    
 */



    const initialValues = {
      roleid: 0, // Dropdown but the value to be
      assignedBy: user.id,
      firstName: "",
      middleName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      sex: "",
      birthday: "",
    };

  const validationSchema = Yup.object().shape({
    /*
    firstName:Yup.string().required(),
    middleName: Yup.string().required(),
    lastName: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber:Yup.string().required(),
    //sex:Yup.string().required(),
    birthday:Yup.string().required(),
    */
  });
  const onSubmit = (data: object) => {
    console.log(`Assigned by Value: ${JSON.stringify(user.id)}`);
    console.log(`User Value: ${JSON.stringify(data)}`);
    // the data here is username and password
    /*
    Axios.post("http://localhost:3001/AALHRIA/registerStaff", data)
      .then((response) => {
        if (response.data.auth) {
          localStorage.setItem("token", response.data.token);
          return response.data.token;
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .then((response) => {
        Axios.get("http://localhost:3001/AALHRIA/isloggedin", {
          headers: {
            "x-access-token": response,
          },
        });
      });
      */
  };
  return (
    <>
      {/* <Outlet /> */}
      <div className="w-full h-screen ">
        <div className="w-full h-full  flex flex-col px-8 py-4">
          <div className="flex items-center max-h-min justify-between w-full">
            {/*
              <div className="flex flex-col">
              <h2 className="text-2xl font-semibold my-0">
                Empyee Registration 
              </h2>
              <p className="text-sm font-light">
                View Sales information and manage them here
              </p>
            </div>
            <div className="flex"></div>
            */}
          </div>
          <div className="mx-auto flex flex-col  w-full">
            <div className="w-full">
              <section className="p-3 rounded-md shadow-sm dark:bg-gray-00 text-black">
                <h1 className="text-xl font-bold capitalize ">
                  Staff Registration Form
                </h1>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  <Form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                      <div>
                        <label className="" htmlFor="firstName">
                          First Name
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="firstName"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="lastName">
                          Last Name
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="lastName"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="middleName">
                          Middle Name
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="middleName"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="username">
                          Username
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="username"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>

                      <div>
                        <label className="" htmlFor="phoneNumber">
                          Phone number
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="phoneNumber"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="email">
                          Email
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="email"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="password">
                          Password
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="password"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="sex">
                          Sex
                        </label>
                        <Field name="sex" as="select" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Field>
                      </div>
                      <div>
                        <label className="" htmlFor="birthday">
                          Date
                        </label>
                        <Field
                          autoComplete="off"
                          type="text"
                          name="birthday"
                          id="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="roleid">
                          Role
                        </label>
                        <Field name="roleid" as="select"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                          <option value="1">Admin</option>
                          <option value="2" selected>Employee</option>
                        </Field>
                      </div>
                      {/*
                       <div>
                       <label
                         className="dark:text-gray-200"
                         htmlFor="passwordConfirmation"
                       >
                         Registred by
                       </label>
                       <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                         <option>Surabaya</option>
                         <option>Jakarta</option>
                         <option>Tangerang</option>
                         <option>Bandung</option>
                       </select>
                     </div>
                     */}

                      <div>
                        <label className="block text-sm font-medium">
                          Image
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
                      <button
                        type="submit"
                        className="hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
      {/* <div className="w-full h-screen ">
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
              <section className="p-3 rounded-md shadow-md dark:bg-gray-100 text-black">
                <h1 className="text-xl font-bold capitalize ">
                  Sales Registration Form
                </h1>
                <form>
                  <div className="flex justify-between my-4  ">
                  
                    <div className="w-3/5  h-auto flex flex-col    px-2">
                      {" "}
                      <div className="">
                        <div>
                          <label className="block text-sm  font-medium">
                            Employee Image
                          </label>
                          <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 h-64 border-gray-300 border-dashed rounded-md">
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

                    <div className="w-full  h-full grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 px-2">
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
                          First Name
                        </label>
                        <input
                          id="username"
                          type="text"
                          placeholder="First Name"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
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
      </div> */}
    </>
  );
};

export default RegisterEmp;
