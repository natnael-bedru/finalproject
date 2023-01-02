import React from "react";
import { Link } from "react-router-dom";
import close from "../../assets/close.png";
type Props = {};

const Accountsuspend = (props: Props) => {
  return (
    <>
      <div className="w-full h-screen font-poppins">
        {/* <div className="w-full flex justify-center items-center flex-col">
          <img className="w-32 h-32" src={close} alt="" />
          <h1>dsadsa</h1>
        </div> */}
        <section className="flex  items-center h-full sm:p-16 dark:bg-white-900 dark:text-black-100">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-3xl d">
            <img className="w-32 h-32" src={close} alt="" />
            <p className="text-3xl">
              Your Account has been suspended! <br /> Please contact your administrator for further
              information.
            </p>
            <Link
              rel="noopener noreferrer"
              to="/"
              className="px-8 py-3 font-semibold rounded dark:bg-black dark:text-white border-white"
            >
              Back to Wellcomepage
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Accountsuspend;
