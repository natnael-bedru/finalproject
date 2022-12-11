import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();

  const [staus, setStatus] = useState(0);
  const [_path, setPath] = useState("");
  const [buttonMod, setButtonMod] = useState("");

  const goBack = () => {
    navigate(_path);
  };

  useLayoutEffect(() => {
    Axios.get("http://localhost:3001/AALHRIA/isloggedin", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then(
      (response) => {
        console.log(`fetch data login :${JSON.stringify(response)}`);

        if (response.status === 200) {
          // The 403 (Forbidden) status code indicates that the server understood the request
          // but refuses to authorize it...If authentication credentials were provided in the request,
          // the server considers them insufficient to  grant access.
          setStatus(403);
          setButtonMod(" to Homepage");
          if (response.data.roleName === "Admin") {
            setPath("/adminhomepage");
          } else if (response.data.roleName === "Employee") {
            console.log(`data ${JSON.stringify(response)}`);
            setPath("/employeehomepage");
          }
        } 
      },
      (error) => {
        //console.log(`data :${JSON.stringify(error)}`);
        setStatus(error.response.status);
        setPath("/");
      }
    );
  }, [setPath]);

  return (
    <div className="w-full h-screen ">
      <section className="flex items-center h-full p-16 dark:bg-white-900 dark:text-black">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>
              {staus}
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-black">
              Either something went wrong or the page does't exist anymore.
            </p>
            <button
              className="px-8 py-3 font-semibold rounded dark:bg-gray-700 dark:text-white"
              onClick={goBack}
            >
              Go back{buttonMod}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
