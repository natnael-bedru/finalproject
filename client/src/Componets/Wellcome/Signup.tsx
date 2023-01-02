import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Signup = (props: Props) => {
  const [_errMsg, setErrorMsg] = useState("");
  // useEffect(() => {

  // }, [_errMsg]);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  Axios.defaults.withCredentials = true;

  const onSubmit = (data: object) => {
    console.log(`DATA ${JSON.stringify(data)}`);
    // the data here is username and password
    Axios.post("http://localhost:3001/AALHRIA/login", data)
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
        }).then((response) => {
          console.log(response.data.accountStatus);
          // console.log(`fetch data login :${response.data.userId}`);
          if (response.data.loggedIn === true) {
            console.log(`Authentication Message: ${response.data.message}`);
            console.log(`Authentication User Id: ${response.data.userId}`);
            console.log(`Authentication Role Name: ${response.data.roleName}`);
            if(response.data.accountStatus === "Active"){
              switch (response.data.roleName) {
                case "Admin":
                  navigate("/adminhomepage");
                  break;
                case "Employee":
                  navigate("/employeehomepage");
                  break;
                default:
                  break;
              }
            }else if(response.data.accountStatus === "Inactive")
            {
              navigate("/suspended");
            }
          } else {
            console.log("something wrong!");
          }
        });
      });
  };
  useEffect(() => {
    if (_errMsg) {
      toast.error(_errMsg);
      setErrorMsg("");
    }
    //
  }, [_errMsg]);

  return (
    <>
      <div className=" ">
        <div className="bg-white dark:bg-gray-900">
          <div className="flex justify-center h-screen">
            {/* login */}

            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
              <>
                <div className="flex-1">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                      LRAS
                    </h2>

                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Sign in to access your account
                    </p>
                  </div>

                  <div className="mt-8">
                    <Formik
                      initialValues={initialValues}
                      onSubmit={onSubmit}
                      validationSchema={validationSchema}
                    >
                      <Form>
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                          >
                            Username
                          </label>
                          <Field
                            autoComplete="off"
                            type="text"
                            name="username"
                            id="text"
                            placeholder="Username"
                            required
                            className="block w-full px-4 py-2 mt-2  text-gray-700 placeholder-gray-900 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>

                        <div className="mt-6">
                          <div className="flex justify-between mb-2">
                            <label
                              htmlFor="password"
                              className="text-sm text-gray-600 dark:text-gray-200"
                            >
                              Password
                            </label>
                            {/* <a
                            href="/"
                            className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                          >
                            Forgot password?
                          </a> */}
                          </div>

                          <Field
                            autoComplete="off"
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Your Password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          />
                        </div>

                        <div className="mt-6">
                          <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                          >
                            Sign in
                          </button>
                        </div>

                        {/* <p className="mt-6 text-sm text-center text-gray-400">
                          Don&#x27;t have an account yet?{" "}
                          <button
                            // onClick={notify}
                            className="text-blue-500 focus:outline-none focus:underline hover:underline"
                          >
                            Sign up
                          </button>
                        </p> */}
                      </Form>
                    </Formik>
                  </div>
                </div>
              </>
            </div>

            <div className="hidden bg-cover lg:block lg:w-2/3 bg-meetimg">
              <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                  <h2 className="text-4xl font-bold text-white">LRAS</h2>

                  <p className="max-w-xl mt-3 text-gray-300">
                    The LRAS platform is the first to prioritize security,
                    accessibility, and authentication for all system users. Our
                    objective is to develop future technology and knowledge for
                    everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {<ToastContainer />}
    </>
  );
};

export default Signup;
