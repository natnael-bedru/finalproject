import React from "react";

type Props = {};

const Erorrpage = (props: Props) => {
  return (
    <div className="w-full h-screen">
        <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                <span className="sr-only">Error</span>Error
              </h2>
              <p className="text-2xl font-semibold md:text-3xl">
                Sorry, Access to this page is deined
              </p>
              <p className="mt-4 mb-8 dark:text-gray-400">
                to accces the full information of this page plese scan the Qr
                code again
              </p>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Erorrpage;
