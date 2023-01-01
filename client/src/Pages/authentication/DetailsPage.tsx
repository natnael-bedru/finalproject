import React from "react";

type Props = {};

const DetailsPage = (props: Props) => {
  return (
    <>
      <div className="w-full h-screen font-poppins">
        <div className="w-full h-auto flex justify-center items-center p-5">
          <h1 className="text-center font-bold font-poppins md:text-lg text-sm">
            Addis Ababa City Goverment Land Adminstration <br />
            and permit Authority permit Hold Certificate of Tittle Deed
          </h1>
        </div>
        <div className="w-full  flex justify-end font-semibold text-base px-6">
          <p>Date: current date</p>
        </div>
        {/* info  */}
        <div className="w-full h-auto flex md:flex-row flex-col justify-between px-6 mt-4">
          <div className="flex flex-col space-y-3 font-semibold md:text-base text-sm">
            <h1>Posserors Full Name:</h1>
            <h1>Partners Full Name:</h1>
          </div>
          <div className="flex flex-col space-y-3  md:mt-0 mt-2 font-semibold md:text-base text-sm">
            <h1>House Number:</h1>
            <h1>Registration Number:</h1>
            <h1>Permmit Use:</h1>
            <h1>Carta Issue date:</h1>
            <h1>Staff member:</h1>
          </div>
        </div>
        {/* land info */}
        <div className=" w-full  flex justify-between md:flex-row  flex-col  px-6   mt-4">
          <div className="md:w-1/2 w-full h-[650px] bg-black"></div>
          <div className="md:w-1/2 w-full   p-4 flex flex-col  ">
            {/* table section */}
            <h1 className="text-center mt-10 md:mt-5">COORDINATES</h1>
            <div className=" flex flex-col ">
              <div className="overflow-x-auto  ">
                <div className="py-4 inline-block w-full ">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center">
                      <thead className="border-b bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            X
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4"
                          >
                            Y
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            1
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            Mark
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            2
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            Jacob
                          </td>
                        </tr>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            3
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                            Larry the Bird
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* map deatils */}
            <div className="container p-2  md:mt-10 mt-0 rounded-md sm:p-4 dark:text-black dark:bg-white">
              <div className="overflow-x-auto">
                <table className=" text-xs">
                  <thead className="rounded-t-lg dark:bg-white text-black">
                    <tr className="text-right">
                      <th title="Ranking" className="p-3 text-left">
                        Former werda
                      </th>
                      <th title="Team name" className="p-3 text-left">
                        Former Kebele
                      </th>
                      <th title="Wins" className="p-3">
                        Sub City
                      </th>
                      <th title="Losses" className="p-3">
                        block number
                      </th>
                      <th title="Win percentage" className="p-3">
                        parcel Number
                      </th>
                      <th title="Games behind" className="p-3">
                        Plot Area
                      </th>
                      <th title="Home games" className="p-3">
                        built Up Area
                      </th>
                      <th title="Home games" className="p-3">
                        Land Grade
                      </th>
                      <th title="Away games" className="p-3">
                        Tittle Deed Number
                      </th>
                      <th title="Last 10 games" className="p-3">
                        Base Map number
                      </th>
                      <th title="Current streak" className="p-3">
                        Type of holding
                      </th>
                      <th title="Current streak" className="p-3">
                        Land use
                      </th>
                      <th title="Current streak" className="p-3">
                        Permmit use
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-right  dark:border-gray-700  dark:bg-white">
                      <td className="px-3 py-2 text-left">
                        <span>1</span>
                      </td>
                      <td className="px-3 py-2 text-left">
                        <span>MIA</span>
                      </td>
                      <td className="px-3 py-2">
                        <span>31</span>
                      </td>
                      <td className="px-3 py-2">
                        <span>17</span>
                      </td>
                      <td className="px-3 py-2">
                        <span>.646</span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <span>0</span>
                      </td>
                      <td className="px-3 py-2">
                        <span>17-5</span>
                      </td>
                      <td className="px-3 py-2">
                        <span>14-12</span>
                      </td>
                      <td className="px-3 py-2">
                        <span>8-2</span>
                      </td>
                      <td className="px-3 py-2">
                        <span>W2</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* owners info */}
        <div className="w-full  px-6 p-5">
          <div className="md:max-w-7xl rounded-lg w-full mx-auto bg-white p-4 flex flex-col">
            <div className="w-full flex md:flex-row flex-col-reverse   justify-between">
              <div className="w-full">
                <div className="flex flex-col my- ">
                  <div className="grid grid-cols-2 gap-1 mx-4  mt-14">
                    <div className=" my-4">
                      <h1 className="font-semibold text-lg">First name</h1>
                      <p>jane doe</p>
                    </div>
                    <div className="my-4 ">
                      <h1 className="font-semibold text-lg">Middle name</h1>
                      <p>jane doe</p>
                    </div>
                    <div className=" my-4">
                      <h1 className="font-semibold text-lg">Last name</h1>
                      <p>jane doe</p>
                    </div>
                    <div className="my-4 ">
                      <h1 className="font-semibold text-lg">Phone Number</h1>
                      <p>0991222</p>
                    </div>
                    <div className=" my-4">
                      <h1 className="font-semibold text-lg">Nationality</h1>
                      <p>0991222</p>
                    </div>
                    <div className="my-4 ">
                      <h1 className="font-semibold text-lg">Email</h1>
                      <p>0991222</p>
                    </div>
                    <div className="my-4 ">
                      <h1 className="font-semibold text-lg">sex</h1>
                      <p>0991222</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 w-full h-[400px]  ">
                <div className=" w-full h-full bg-red-300 flex justify-center items-center">
                  heloo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
