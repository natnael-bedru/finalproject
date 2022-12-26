import React, {
  Dispatch,
  SetStateAction,
  Fragment,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Axios from "axios";

type Props = {
  showland: boolean;
  setShowland: Dispatch<SetStateAction<boolean>>;
  citizenId: number;
};

const LandProfile = ({ showland, setShowland, citizenId }: Props) => {
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

  useLayoutEffect(() => {
    Axios.get(`http://localhost:3001/AALHRIA/viewAllLand/${citizenId}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      //console.log(response.data.citizenInfo[0]);
      //console.log(response.data.carta[0]);
      //console.log(response.data.carta[0].cartaCoordinateData[0]);
      setCurrCitizen(response.data.citizenInfo[0]);
      setCartaInfo(response.data.carta);
      //setCartaCoordinateData(response.data.carta[0].cartaCoordinateData[0])
      //console.log(`Response ${JSON.stringify(response.data[0].roleid)}`);
      //setStaff(response.data[0]);
    });
    console.log("Here");
    console.log(cartaInfo);
    //console.log(cartaCoordinateData);
  }, [showland]);
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 px-3 py-3 flex text-center justify-center items-center"
                  >
                    Addis Ababa City Goverment Land Adminstration <br />
                    and permit Authority permit Hold Certificate of Tittle Deed
                  </Dialog.Title>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div> */}

                  <div className="mt- px-3">
                    {/* <div className="w-full  flex justify-end font-semibold text-base">
                      <p>Date: current date</p>
                    </div> */}
                    <div className=" w-full flex  mt-2">
                      <div className="grid grid-cols-3 divide-x">
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
                        <div>
                          <label className="block text-sm  font-medium">
                            Citizen Detail
                          </label>
                          <p className=" dark:text-black">
                            Full Name: {currCitizen.fullName}
                          </p>
                          <p className=" dark:text-black">
                            Date of Birth:{" "}
                            {currCitizen.dateOfBirth &&
                              currCitizen.dateOfBirth.substring(0, 10)}
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
                      {cartaInfo[0] ? <>
                      <div className="flex flex-col space-y-3 px-4 font-semibold text-base">
                        {/* <h1>Date: current date</h1> */}
                        <h1>House Number:{  cartaInfo[0].cartaHouseNumber}</h1>
                        <h1>
                          Registration Number:{ cartaInfo[0].cartaRegistrationNo}
                        </h1>
                        <h1>Permmit Use:{cartaInfo[0].cartaPlannedLandUse}</h1>
                        <h1>
                          Carta Issue date:
                          { cartaInfo[0].cartaIssuedDate &&
                            cartaInfo[0].cartaIssuedDate.substring(0, 10)}
                        </h1>
                        <h1>Issued By:{ cartaInfo[0].issuerStaffName}</h1>
                      </div>
                      </>:<>
                      <p> This User Doesnt have a carta registered!</p>
                      </>}
                    </div>
                    {/*  */}
                    {cartaInfo[0] ? <>
                    <div className="w-full flex justify-between mt-4">
                      <div className="w-1/2 h-[450px] bg-black flex justify-center items-center text-white">
                        <img
                        className="w-full h-full"
                          src={`/uploads/cartaImages/${cartaInfo[0].cartaImage}`}
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
                                        {cartaInfo[0].cartaCoordinateData[0].X1}
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {cartaInfo[0].cartaCoordinateData[0].Y1}
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {cartaInfo[0].cartaCoordinateData[0].X2}
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {cartaInfo[0].cartaCoordinateData[0].Y2}
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {cartaInfo[0].cartaCoordinateData[0].X3}
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {cartaInfo[0].cartaCoordinateData[0].Y3}
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {cartaInfo[0].cartaCoordinateData[0].X4}
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {cartaInfo[0].cartaCoordinateData[0].Y4}
                                      </td>
                                    </tr>
                                    <tr className="bg-white border-b">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {cartaInfo[0].cartaCoordinateData[0].X5}
                                      </td>
                                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {cartaInfo[0].cartaCoordinateData[0].Y5}
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
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4"
                                  >
                                    Type of holding
                                  </th>
                                  <th
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
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {cartaInfo[0].currentWoredaNumber}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].formerKebeleNumber}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaSubCityName}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaBlockNumber}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaParcelNumber}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaPlotArea}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaBuiltUpArea}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaLandGrade}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaTitleDeedNo}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaBasemapNo}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaTypeOfHolding}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaPlannedLandUse}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {cartaInfo[0].cartaPermittedUse}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Update
                      </button>
                    
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        print land details
                      </button>
                    </div>
                    </>:<></>}
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
