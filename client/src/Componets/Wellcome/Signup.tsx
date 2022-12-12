import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";

type Props = {};

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const [_errMsg, setErrorMsg] = useState("");
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
          } else {
            // 401 page here by using navigate(/)
            // 401 Unauthorized
            // Similar to 403 Forbidden, but specifically for use
            // when authentication is required and has failed or has not yet been provided.
            console.log("something wrong!");
          }
        });
      });
  };
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
                      Brand
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
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-900 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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

                        <p className="mt-6 text-sm text-center text-gray-400">
                          Don&#x27;t have an account yet?{" "}
                          <button
                            //onClick={Signup}
                            className="text-blue-500 focus:outline-none focus:underline hover:underline"
                          >
                            Sign up
                          </button>
                          .
                        </p>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </>
            </div>

            <div className="hidden bg-cover lg:block lg:w-2/3 bg-meetimg">
              <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                  <h2 className="text-4xl font-bold text-white">Brand</h2>

                  <p className="max-w-xl mt-3 text-gray-300">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                    autem ipsa, nulla laboriosam dolores, repellendus
                    perferendis libero suscipit nam temporibus molestiae
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
