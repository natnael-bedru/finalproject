import React, {
  Dispatch,
  SetStateAction,
  Fragment,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import Axios from "axios";
import { Route, useLocation, useParams } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import console from "console";
type Props = {};

const DetailsPage = (props: Props) => {
  const location = useLocation();
  const [currCitizen, setCurrCitizen] = useState<any>({
    //fullName: null,
    firstName: null,
    middleName: null,
    lastName: null,
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
      generatedPassword: null,
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
    Axios.get(
      `http://localhost:3001/AALHRIA/viewAuthLand/${parseInt(
        location.state.citizenId
      )}/${parseInt(location.state.cartaId)}`
    ).then((response) => {
      setCurrCitizen(response.data.citizenInfo[0]);

      setCartaInfo(response.data.carta);
    });
  }, []);
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
      {cartaInfo[0] ? (
        <>
          <div className="w-full h-screen font-poppins">
            <div className="w-full h-auto flex flex-col justify-center items-center p-5">
              <div>
                <img src={logo} className="w-32 h-32 mb-4" alt="" />
              </div>
              <h1 className="text-center font-bold font-poppins md:text-lg text-sm">
                Addis Ababa City Goverment Land Adminstration <br />
                and permit Authority permit Hold Certificate of Tittle Deed
              </h1>
            </div>

            <div className="w-full  flex justify-end font-semibold text-base px-6">
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
            {/* info  */}
            <div className="w-full h-auto flex md:flex-row flex-col justify-between px-6 mt-4">
              {/* <div className="flex flex-col space-y-3 font-semibold md:text-base text-sm">
            <h1>Posserors Full Name:</h1>
            <h1>Partners Full Name:</h1>
          </div> */}
              <div className="flex flex-col space-y-3  md:mt-0 mt-2 font-semibold md:text-base text-sm">
                <h1>
                  Carta Issue date:{dateConverter(cartaInfo[0].cartaIssuedDate)}
                </h1>
                <h1>House Number:{cartaInfo[0].cartaHouseNumber}</h1>
                <h1>Registration Number:{cartaInfo[0].cartaRegistrationNo}</h1>
                <h1>Tittle deed Number:{cartaInfo[0].cartaTitleDeedNo}</h1>

                <h1>Staff member:{cartaInfo[0].issuerStaffName}</h1>
              </div>
            </div>
            {/* land info */}
            <div className=" w-full  flex justify-between md:flex-row  flex-col  px-6   mt-4">
              <div className="md:w-1/2 w-full h-[650px] flex justify-center items-center bg-slate-300">
                <img
                  className="w-full h-full flex justify-center items-center"
                  src={`/uploads/cartaImages/${cartaInfo[0].cartaImage}`}
                  alt="cartaImg"
                />
              </div>
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
                {/* map deatils */}
                <div className="container p-2  md:mt-10 mt-0 rounded-md sm:p-4 dark:text-black dark:bg-white">
                  <div className="overflow-x-auto">
                    <table className=" text-xs">
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
            <div className="p-4 px-6 flex md:justify-center justify-start items-center ">
              <h1 className="font-bold md:text-xl">Citizen Profile </h1>
            </div>
            {/* owners info */}
            <div className="w-full   px-6 p-5">
              <div className="md:max-w-7xl rounded-lg w-full mx-auto bg-white p-4 flex flex-col">
                <div className="w-full flex md:flex-row flex-col-reverse justify-start  ">
                  <div className="w-full">
                    <div className="flex flex-col my- ">
                      <div className="grid grid-cols-2 gap-1 mx-4  mt-14">
                        <div className=" my-4">
                          <h1 className="font-semibold text-lg">First name</h1>
                          <p>{currCitizen.firstName}</p>
                        </div>
                        <div className="my-4 ">
                          <h1 className="font-semibold text-lg">Middle name</h1>
                          <p>{currCitizen.middleName}</p>
                        </div>
                        <div className=" my-4">
                          <h1 className="font-semibold text-lg">Last name</h1>
                          <p>{currCitizen.lastName}</p>
                        </div>
                        <div className="my-4 ">
                          <h1 className="font-semibold text-lg">
                            Phone Number
                          </h1>
                          <p>{currCitizen.phoneNumber}</p>
                        </div>
                        <div className=" my-4">
                          <h1 className="font-semibold text-lg">Nationality</h1>
                          <p>0991222</p>
                        </div>
                        <div className="my-4 ">
                          <h1 className="font-semibold text-lg">Email</h1>
                          <p>To be removed</p>
                        </div>
                        <div className="my-4 ">
                          <h1 className="font-semibold text-lg">sex</h1>
                          <p>{currCitizen.sex}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 w-full h-[404px]  ">
                    <div className=" w-full h-full bg-red-300 flex justify-center items-center">
                      <img src={`/uploads/citizenImages/${currCitizen.img}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DetailsPage;
