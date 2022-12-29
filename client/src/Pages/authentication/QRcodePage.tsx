import React, { Dispatch, Fragment, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReactDOM from "react-dom";

import ReactToPrint, {
  PrintContextConsumer,
  useReactToPrint,
} from "react-to-print";
import QRCode from "react-qr-code";
type Props = {
  QRcode: boolean;
  setQRcode: Dispatch<SetStateAction<boolean>>;
};

const QRcodePage = ({ QRcode, setQRcode }: Props) => {
  // used to to print the QRcode
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "QR-data",
  });
  return (
    <div>
      <Transition appear show={QRcode} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setQRcode}>
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
                <div
                  ref={componentRef}
                  className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div className=" flex justify-between items-center p-3">
                    <h1 className="">Generate QR Code </h1>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={}
                      onClick={() => setQRcode(false)}
                    >
                      Close
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-center"
                  >
                    LARS
                  </Dialog.Title>
                  {/* <div className="mt-2">
              <p className="text-sm text-gray-500">
                Your payment has been successfully submitted. We’ve sent
                you an email with all of the details of your order.
              </p>
            </div> */}
                  <div className="flex h-full">
                    <div className="w-full h-full pt-4 flex flex-col justify-center items-center  bg-gray-00">
                      <h1>Scan the following QR to access full information</h1>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div
                      // style={{
                      //   height: "auto",
                      //   margin: "0 auto",
                      //   maxWidth: 680,
                      //   width: "100%",
                      // }}
                      className="w-full h-full"
                    >
                      <QRCode
                        className="w-full h-full p-20"
                        size={256}
                        // style={{
                        //   height: "auto",
                        //   maxWidth: "100%",
                        //   width: "100%",
                        // }}
                        value="https://laras123.netlify.app/signup"
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      className="inline-flex  text-lg justify-center rounded-md border border-transparent bg-blue-100 w-44 px-4 py-2  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handlePrint}
                    >
                      Print as PDF
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default QRcodePage;
