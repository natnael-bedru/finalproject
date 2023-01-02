import React, {
  Dispatch,
  SetStateAction,
  Fragment,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import ReactToPrint, {
  PrintContextConsumer,
  useReactToPrint,
} from "react-to-print";

import { Dialog, Transition } from "@headlessui/react";
import Axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import notFound from "../../assets/notFound.png";

type Props = {
  showland: boolean;
  setShowland: Dispatch<SetStateAction<boolean>>;
  citizenId: number;
};

const LandProfile = ({ showland, setShowland, citizenId }: Props) => {
  // used to to print the Land data
  const componentRef = useRef(null);
  const handlePrintdata = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Land-data",
  });
  // Citizen preload BEGGINING
  const [currCitizen, setCurrCitizen] = useState<any>({
    fullName: null,
    img: null,
    sex: null,
    phoneNumber: null,
    dateOfBirth: null,
    woredaNumber: null,
    kebeleNumber: null,
    subCityName: null,
  });
  const [cartaInfo, setCartaInfo] = useState<any[]>([
    {
      cartaId: null,
      currentWoredaNumber: null,
      formerKebeleNumber: null,
      cartaSubCityName: null,
      cartaImage: null,
      cartaBlockNumber: null,
      cartaParcelNumber: null,
      cartaHouseNumber: null,
      cartaPlotArea: null,
      cartaBuiltUpArea: null,
      cartaLandGrade: null,
      cartaTitleDeedNo: null,
      cartaIssuedDate: null,
      cartaBasemapNo: null,
      cartaRegistrationNo: null,
      cartaTypeOfHolding: null,
      cartaPlannedLandUse: null,
      cartaPermittedUse: null,
      issuerStaffName: null,
      lastChanged: null,
      cartaCoordinateData: [
        {
          X1: null,
          Y1: null,
          X2: null,
          X3: null,
          Y3: null,
          X4: null,
          Y4: null,
          X5: null,
          Y5: null,
        },
      ],
    },
  ]);
  const [selectedCarta, setSelectedCarta] = useState(0);
  const onChangeDeedNo = (e: {
    target: { selectedIndex: React.SetStateAction<number> };
  }) => {
    setSelectedCarta(e.target.selectedIndex);
  };
  useLayoutEffect(() => {
    Axios.get(`http://localhost:3001/AALHRIA/viewAllCarta/${citizenId}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setCurrCitizen(response.data.citizenInfo[0]);

      setCartaInfo(response.data.carta);
    });
    console.log("Here");
    console.log(cartaInfo);
    //console.log(cartaCoordinateData);
  }, [showland]);
  const navigate = useNavigate();
  const updateLand = (citizenId: any) => {
    //let titleDeedNo = (document.getElementById("titleDeedNo") as HTMLInputElement).value;
    navigate("/employeehomepage/updateland", {
      state: { citizenId: citizenId },
    });
  };
  const dateConverter = (date: string) => {
    if (date) {
      var temp_date = new Date(date.substring(0, 10));
      var new_Date = new Date(
        temp_date.getTime() +
          Math.abs(temp_date.getTimezoneOffset() * 60000) * 12
      )
        .toISOString()
        .substring(0, 10);
      return new_Date;
    }
  };

  return (
    <>
      <Transition appear show={showland} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowland}>
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
                <div className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className=" flex justify-between p-3 items-center">
                    <h1 className="font-semibold text-2xl">Land Details</h1>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={}
                      onClick={() => setShowland(false)}
                    >
                      Close
                    </button>
                  </div>
                  <div ref={componentRef}>
                    {cartaInfo[selectedCarta] ? (
                      <>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 px-3 py-3 flex text-center justify-center items-center"
                        >
                          Addis Ababa City Goverment Land Adminstration <br />
                          and permit Authority permit Hold Certificate of Tittle
                          Deed
                        </Dialog.Title>

                        <div className="w-1/2 h-auto flex items-center ">
                          <label
                            className="font-bold text-xl font-poppins w-1/4 ml-3"
                            htmlFor="Landid"
                          >
                            Title Deed No:
                          </label>

                          <select
                            className="  form-select form-select-sm appearance-none  w-1/2 px-2 py-1 text-sm  font-normal  text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300 rounded  transition  ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label=".form-select-sm example"
                            onChange={onChangeDeedNo}
                          >
                            {(() => {
                              const options = [];
                              for (let x in cartaInfo) {
                                //TitleDeedNo
                                options.push(
                                  <option value={parseInt(x)}>
                                    {cartaInfo[parseInt(x)].cartaTitleDeedNo}
                                  </option>
                                );
                              }
                              return options;
                            })()}
                          </select>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="mt- px-3">
                      {/* <div className="w-full  flex justify-end font-semibold text-base">
                      <p>Date: current date</p>
                    </div> */}
                      <div className=" w-full flex justify-between  mt-2">
                        {cartaInfo[selectedCarta] ? (
                          <>
                            <div className="grid grid-cols-3  font-poppins space-y-3">
                              <div>
                                <label className="block text-sm  font-medium">
                                  Citizen Image
                                </label>
                                <div className="mt-1 mr-9 flex justify-center items-center px-1 pt-1 pb-1 border-2 h-[200px] w-[200px] border-gray-300 border-dashed rounded-md">
                                  <img
                                    src={`/uploads/citizenImages/${currCitizen.img}`}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm  font-medium">
                                  Citizen Detail
                                </label>
                                <p className=" dark:text-black">
                                  Full Name: {currCitizen.fullName}
                                </p>
                                <p className=" dark:text-black">
                                  Date of Birth:{" "}
                                  {dateConverter(currCitizen.dateOfBirth)}
                                </p>
                                <p className=" dark:text-black">
                                  Sex: {currCitizen.sex}
                                </p>
                                <p className=" dark:text-black">
                                  Phone Number: {currCitizen.phoneNumber}
                                </p>
                                <p className=" dark:text-black">
                                  Former Kebele: {currCitizen.kebeleNumber}
                                </p>
                                <p className=" dark:text-black">
                                  Current Woreda: {currCitizen.woredaNumber}
                                </p>
                                <p className=" dark:text-black">
                                  Subcity: {currCitizen.subCityName}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-3 px-4 font-semibold text-base">
                              {/* <h1>Date: current date</h1> */}
                              <h1>
                                Registration Number:
                                {cartaInfo[selectedCarta].cartaRegistrationNo}
                              </h1>
                              <h1>
                                House Number:
                                {cartaInfo[selectedCarta].cartaHouseNumber}
                              </h1>
                              <h1>
                                Type of Holding:
                                {cartaInfo[selectedCarta].cartaTypeOfHolding}
                              </h1>
                              <h1>
                                Planned Land Use:
                                {cartaInfo[selectedCarta].cartaPlannedLandUse}
                              </h1>
                              <h1>
                                Permitted Land Use:
                                {cartaInfo[selectedCarta].cartaPermittedUse}
                              </h1>
                              <h1>
                                Carta Issued date:
                                {dateConverter(
                                  cartaInfo[selectedCarta].cartaIssuedDate
                                )}
                              </h1>
                              <h1>
                                Issued By:
                                {cartaInfo[selectedCarta].issuerStaffName}
                              </h1>
                              {cartaInfo[selectedCarta].issuerStaffName !==
                              cartaInfo[selectedCarta].lastChanged ? (
                                <>
                                  <h1>
                                    Last Changed By:
                                    {cartaInfo[selectedCarta].lastChanged}
                                  </h1>
                                  <h1>
                                    Last Modified Date:
                                    {dateConverter(
                                      cartaInfo[selectedCarta].lastModifiedDate
                                    )}
                                  </h1>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-full justify-center flex">
                              <section className="flex items-center h-full sm:p-16 dark:bg-white dark:text-black">
                                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                                  <img src={notFound} />
                                  <p className="text-3xl font-poppins">
                                    Cadaster Information Not Found
                                  </p>
                                  {/* <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</a> */}
                                </div>
                              </section>
                            </div>
                          </>
                        )}
                      </div>
                      {/*  */}
                      {cartaInfo[selectedCarta] ? (
                        <>
                          <div className="w-full flex justify-between mt-4">
                            <div className="w-1/2 h-[450px] bg-black flex justify-center items-center text-white">
                              <img
                                className="w-full h-full"
                                src={`/uploads/cartaImages/${cartaInfo[selectedCarta].cartaImage}`}
                                alt="cartaImg"
                              />
                            </div>
                            <div className="w-1/2  p-4   ">
                              {/* table section */}
                              <h1 className="text-center">COORDINATES</h1>
                              <div className="flex flex-col">
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
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].X1
                                              }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].Y1
                                              }
                                            </td>
                                          </tr>
                                          <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].X2
                                              }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].Y2
                                              }
                                            </td>
                                          </tr>
                                          <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].X3
                                              }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].Y3
                                              }
                                            </td>
                                          </tr>
                                          <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].X4
                                              }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].Y4
                                              }
                                            </td>
                                          </tr>
                                          <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].X5
                                              }
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                              {
                                                cartaInfo[selectedCarta]
                                                  .cartaCoordinateData[0].Y5
                                              }
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col mt-">
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
                                          Current Woreda
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Former Kebele
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Sub City
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Block Number
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Parcel Number
                                        </th>

                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Plot Area
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Built Up Area
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          land Grade
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Tittle Deed Number
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Base Map Number
                                        </th>
                                        {/* <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Type of holding
                                        </th> */}
                                        {/* <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Land use
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Planned Land Use
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4"
                                        >
                                          Permitted Land Use
                                        </th> */}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="bg-white border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {
                                            cartaInfo[selectedCarta]
                                              .currentWoredaNumber
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .formerKebeleNumber
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaSubCityName
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaBlockNumber
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaParcelNumber
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaPlotArea
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaBuiltUpArea
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaLandGrade
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaTitleDeedNo
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaBasemapNo
                                          }
                                        </td>
                                        {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaTypeOfHolding
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaPlannedLandUse
                                          }
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                          {
                                            cartaInfo[selectedCarta]
                                              .cartaPermittedUse
                                          }
                                        </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-3">
                            {/* <Link to="/employeehomepage/updateland"> */}
                            <button
                              type="button"
                              onClick={() => {
                                updateLand(citizenId);
                              }}
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Update
                            </button>

                            <button
                              onClick={handlePrintdata}
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              print land details
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
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

export default LandProfile;
