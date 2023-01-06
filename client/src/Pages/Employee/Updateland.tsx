import Axios from "axios";
import React, {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useParams } from "react-router-dom";
import IdContext from "../../Context/Context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import arrow from "../../assets/arrow-right.png";
import arrow from "../../assets/arrow-left.png";
//arrow-left.png

type Props = {};
const Updateland = (props: Props) => {
  // *fetching the employee id
  const { user } = useContext(IdContext);

  // Value passed by this variable
  // Variables : >  location.state.citizenId
  const location = useLocation();
  //  Citizen & Carta preload BEGGINING
  const [currCitizen, setCurrCitizen] = useState<any>({
    // id:null,
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
  useLayoutEffect(() => {
    Axios.get(
      `http://localhost:3001/AALHRIA/viewAllCarta/${parseInt(
        location.state.citizenId
      )}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      setCurrCitizen(response.data.citizenInfo[0]);
      setCartaInfo(response.data.carta);
    });
  }, [location.state.citizenId]);
  // Citizen & Carta preload END
  const [ownersList, setOwnersList] = useState<any>([
    {
      id: null,
      fullName: null,
      img: null,
      sex: null,
      phoneNumber: null,
      dateOfBirth: null,
      woredaNumber: null,
      kebeleNumber: null,
      subCityName: null,
    },
  ]);
  const [ownersName, setOwnersName] = useState<string[]>([]);
  useLayoutEffect(() => {
    var ownersName: string[] = [];
    // /viewallowner
    Axios.get(`http://localhost:3001/AALHRIA/viewAllCitizen`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      for (let x in response.data) {
        // this removes the current owner from the search list
        var result = response.data[x].fullName
          .toString()
          .localeCompare(currCitizen.fullName);
        if (parseInt(result) !== 0) {
          ownersName.push(response.data[x].fullName);
        }
      }
      setOwnersName(ownersName);
      setOwnersList(response.data);
    });
  }, [currCitizen]);

  // The dropdown to change the carta information BEGINNING
  const [selectedCarta, setSelectedCarta] = useState(0);
  const onChangeDeedNo = (e: {
    target: { selectedIndex: React.SetStateAction<number> };
  }) => {
    setSelectedCarta(e.target.selectedIndex);
  };
  // The dropdown to change the carta information END
  // Search Dropdown BEGINNING
  const [options, setOptions] = useState<string[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInputChange = (event: any) => {
    setOptions(
      ownersName
        .filter((option) => option.includes(event.target.value))
        .slice(0, 5)
    );
  };
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.addEventListener("click", (event) => {
      event.stopPropagation();
      ulRef.current!.style.display = "flex";
      onInputChange(event);
    });
    document.addEventListener("click", (event) => {
      ulRef.current!.style.display = "none";
    });
  }, [onInputChange]);
  //Search Dropdown END
  // The new Citizen Filler BEGINNING
  const [newCitizen, setNewCitizen] = useState<any>({
    id: null,
    fullName: null,
    img: null,
    sex: null,
    phoneNumber: null,
    dateOfBirth: null,
    woredaNumber: null,
    kebeleNumber: null,
    subCityName: null,
  });
  const updateCitizen = (citizenFullName: string) => {
    for (let x in ownersList) {
      var result = ownersList[x].fullName
        .toString()
        .localeCompare(citizenFullName);
      // [0 if equal]
      if (parseInt(result) === 0) {
        // console.log(ownersList[x]);
        setNewCitizen(ownersList[x]);
      }
    }
    console.log(newCitizen);
  };
  // The new Citizen Filler END
  // Register Land Form Submit BEGINING
  const initialValues = {
    currentOwner: location.state.citizenId,
    newOwnerName: null,
    newOwner: null,
    issuedBy: user.id, // state variable here
    cartaTitleDeedNo: null,
    lastModifiedDate: new Date().toISOString().substring(0, 10),
  };
  const onSubmit = (data: any) => {
    data.currentOwner = location.state.citizenId;
    data.newOwnerName = newCitizen.fullName;
    data.newOwner = newCitizen.id;
    data.issuedBy = user.id;
    data.cartaTitleDeedNo = cartaInfo[selectedCarta].cartaTitleDeedNo;
    data.lastModifiedDate = new Date().toISOString().substring(0, 10);
    Axios.post("http://localhost:3001/AALHRIA/updateCartaOwnership", data, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(`Response: ${JSON.stringify(response.data)}`);
      if (response.data.status === "fail") {
        //errorcode
        //message
        setMsg({
          type: "error",
          message: response.data.message,
        });
      } else if (response.data.status === "success") {
        //affectedRows
        //message
        setMsg({
          type: "success",
          message: response.data.message,
        });
      }
    });
  };
  // Register Land Form Submit END

  // *Setting Toast message Handler
  const [_msg, setMsg] = useState({
    type: "",
    message: "",
  });
  // *TOAST MESSAGE
  useEffect(() => {
    if (_msg.type) {
      if (_msg.type === "error") {
        toast.error(_msg.message);
      } else if (_msg.type === "success") {
        toast.success(_msg.message);
      }
      setMsg({
        type: "",
        message: "",
      });
    }
  }, [_msg]);
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
      <div className="w-full h-screen font-poppins ">
        {<ToastContainer />}
        <div className="w-full h-full bg-white flex flex-col px-8 py-4">
          <div className="flex items-center max-h-min justify-between w-full">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold my-0">
                Land Ownership Transfer Form
              </h2>
              {/* <p className="text-sm font-light">
                View Sales information and manage them here
              </p> */}
            </div>
            <div className="flex"></div>
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              <div className="mt-10 mx-auto flex flex-col w-full jsu">
                <div className="flex w-full justify-between items-center">
                  <div className="w-full flex items-center justify-start ">
                    <div className="flex relative bg-gray-50 items-center p-2 rounded-md  w-1/3  border-2 mb-4 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <input
                        id="search-bar"
                        type="text"
                        className="bg-gray-50 outline-none ml-1 block w-full text-lg"
                        placeholder="Search here . . ."
                        autoComplete="off"
                        ref={inputRef}
                        onChange={onInputChange}
                      />
                      <ul
                        id="results"
                        className="absolute w-full p-3 top-10 left-0 border-none flex-col py-1 text-sm text-gray-700 bg-gray-50 rounded-lg dark:text-gray-200"
                        ref={ulRef}
                      >
                        {options.map(
                          (
                            option:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | React.ReactFragment
                              | React.ReactPortal
                              | null
                              | undefined,
                            index: React.Key | null | undefined
                          ) => {
                            return (
                              <button
                                className="block py-2 text-lg p-7 px-4 border-none hover:bg-gray-800 dark:hover:bg-gray-200  dark:hover:text-black text-black border-b-2"
                                type="button"
                                key={index}
                                onClick={(e) => {
                                  inputRef.current!.value = option as string;
                                  updateCitizen(option as string);
                                }}
                              >
                                {option}
                              </button>
                            );
                          }
                        )}
                      </ul>
                    </div>
                    {/* <SearchbarDropdown
                      options={options}
                      onInputChange={onInputChange}
                    />  */}
                  </div>
                </div>
                <div className="w-full grid grid-cols-5 gap-4">
                  <div className="flex items-center w-full justify-between col-span-2 p-3 rounded-lg shadow-xl">
                    <div>
                      <label className="block text-sm  font-medium">
                        Citizen Image
                      </label>
                      <div className="mt-1 flex justify-center items-center px-1 pt-1 pb-1 border-2 h-[200px] w-[200px] border-gray-300 border-dashed rounded-md">
                        <img
                          src={`/uploads/citizenImages/${
                            newCitizen && newCitizen.img
                          }`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm  font-medium">
                        Citizen Detail
                      </label>
                      <p className=" dark:text-black">
                        Full Name: {newCitizen && newCitizen.fullName}
                      </p>
                      <p className=" dark:text-black">
                        Date of Birth:
                        {dateConverter(newCitizen.dateofbirth)}
                      </p>
                      <p className=" dark:text-black">
                        Sex:{newCitizen && newCitizen.sex}
                      </p>
                      <p className=" dark:text-black">
                        Phone Number:{newCitizen && newCitizen.phonenumber}
                      </p>
                      <p className=" dark:text-black">
                        Former Kebele:{newCitizen && newCitizen.kebeleNumber}
                      </p>
                      <p className=" dark:text-black">
                        Current Woreda:{newCitizen && newCitizen.woredaNumber}
                      </p>
                      <p className=" dark:text-black">
                        Subcity:{newCitizen && newCitizen.subCityName}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center">
                    Ownership Transfer to
                    <img src={arrow} alt="" />
                  </div>

                  <div className="flex items-center w-full justify-between col-span-2 p-3 rounded-lg shadow-xl">
                    <div>
                      <label className="block text-sm  font-medium font-poppins">
                        Citizen Image
                      </label>
                      <div className="mt-1 flex justify-center items-center px-1 pt-1 pb-1 border-2 h-[200px] w-[200px] border-gray-300 border-dashed rounded-md">
                        <img
                          src={`/uploads/citizenImages/${
                            currCitizen && currCitizen.img
                          }`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm  font-medium">
                        Citizen Detail
                      </label>
                      <p className=" dark:text-black">
                        Full Name: {currCitizen && currCitizen.fullName}
                      </p>
                      <p className=" dark:text-black">
                        Date of Birth:
                        {dateConverter(currCitizen.dateOfBirth)}
                      </p>
                      <p className=" dark:text-black">Sex:{currCitizen.sex}</p>
                      <p className=" dark:text-black">
                        Phone Number:{currCitizen.phoneNumber}
                      </p>
                      <p className=" dark:text-black">
                        Former Kebele:{currCitizen.kebeleNumber}
                      </p>
                      <p className=" dark:text-black">
                        Current Woreda:{currCitizen.woredaNumber}
                      </p>
                      <p className=" dark:text-black">
                        Subcity:{currCitizen.subCityName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <section className="p-3 mt-7  text-black">
                    {/* <div className="w-1/2 h-auto flex items-center ">
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
                    </div> */}
                    <div className="flex justify-between my-4  ">
                      <div className="w-full  h-full flex flex-col justify-center items-center px-2 space-y-4">
                        <div className="flex w-full space-x-4">
                          <div className="w-full">
                            <label className="" htmlFor="username">
                              Title Deed Number
                            </label>
                            <select
                              //disabled //was input
                              name="titleDeedNo"
                              //value={cartaInfo[selectedCarta].cartaTitleDeedNo}
                              //type="text"
                              onChange={onChangeDeedNo}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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

                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="passwordConfirmation"
                            >
                              Current Woreda
                            </label>
                            <select
                              disabled
                              name="currentWoreda"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="" disabled selected>
                                {cartaInfo[selectedCarta].currentWoredaNumber}
                                {" | "}
                                {cartaInfo[selectedCarta].cartaSubCityName}
                              </option>
                            </select>
                          </div>
                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="passwordConfirmation"
                            >
                              Former Kebele
                            </label>
                            <select
                              disabled
                              name="formerKebele"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="" disabled selected>
                                {cartaInfo[selectedCarta].formerKebeleNumber}
                                {" | "}
                                {cartaInfo[selectedCarta].cartaSubCityName}
                              </option>
                            </select>
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="username">
                              House Number
                            </label>
                            <input
                              disabled
                              id="houseNumber"
                              name="houseNumber"
                              type="numeric"
                              value={cartaInfo[selectedCarta].cartaHouseNumber}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                        </div>

                        <div className="flex w-full space-x-4">
                          <div className="w-full">
                            <label className="" htmlFor="username">
                              Block Number
                            </label>
                            <input
                              disabled
                              name="blockNumber"
                              id="blockNumber"
                              type="numeric"
                              value={cartaInfo[selectedCarta].cartaBlockNumber}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="parcelNumber">
                              Parcel Number
                            </label>
                            <input
                              disabled
                              name="parcelNumber"
                              id="parcelNumber"
                              type="numeric"
                              value={cartaInfo[selectedCarta].cartaParcelNumber}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="basemapNo">
                              Base-Map Number
                            </label>
                            <input
                              disabled
                              name="basemapNo"
                              id="basemapNo"
                              type="numeric"
                              value={cartaInfo[selectedCarta].cartaBuiltUpArea}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                        </div>
                        <div className="flex w-full space-x-4">
                          <div className="w-full">
                            <label className="" htmlFor="landGrade">
                              Land Grade
                            </label>
                            <input
                              disabled
                              name="landGrade"
                              id="landGrade"
                              type="text"
                              value={cartaInfo[selectedCarta].cartaLandGrade}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="plotArea">
                              Plot Area <small>(&#x33A1;)</small>
                            </label>
                            <input
                              disabled
                              name="plotArea"
                              id="plotArea"
                              type="numeric"
                              value={cartaInfo[selectedCarta].cartaPlotArea}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="builtUpArea">
                              Built Up Area <small>(&#x33A1;)</small>
                            </label>
                            <input
                              disabled
                              name="builtUpArea"
                              id="builtUpArea"
                              type="numeric"
                              value={cartaInfo[selectedCarta].cartaBuiltUpArea}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="registrationNo">
                              Registration Number
                            </label>
                            <input
                              disabled
                              name="registrationNo"
                              id="registrationNo"
                              type="numeric"
                              value={
                                cartaInfo[selectedCarta].cartaRegistrationNo
                              }
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                        </div>
                        <div className="flex w-full space-x-4">
                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="typeOfHolding"
                            >
                              Type of holding
                            </label>
                            <select
                              disabled
                              value={
                                cartaInfo[selectedCarta].cartaTypeOfHolding
                              }
                              name="typeOfHolding"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="" disabled selected>
                                Unspecified
                              </option>
                              <option value={"Permits hold"}>
                                Permits hold
                              </option>
                              <option value={"Permits new"}>Permits new</option>
                              {/* <option value={'Bandung'}>Bandung</option> */}
                            </select>
                          </div>
                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="plannedLandUse"
                            >
                              Planned Land use
                            </label>
                            <select
                              disabled
                              value={
                                cartaInfo[selectedCarta].cartaPlannedLandUse
                              }
                              name="plannedLandUse"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="" disabled selected>
                                Unspecified
                              </option>
                              <option value={"Mixed"}>Mixed</option>
                              <option value={"Residence"}>Residence</option>
                              <option value={"Business"}>Business</option>
                            </select>
                          </div>
                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="permittedUse"
                            >
                              Permmited use
                            </label>
                            <select
                              disabled
                              value={cartaInfo[selectedCarta].cartaPermittedUse}
                              name="permittedUse"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="" disabled selected>
                                Unspecified
                              </option>
                              <option value={"Mixed"}>Mixed</option>
                              <option value={"Residence"}>Residence</option>
                              <option value={"Business"}>Business</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex w-full space-x-4"></div>
                        <div className=" flex space-x-4 ">
                          <div className="space-y-     h-[400px] items-center w-[400px] flex flex-col ">
                            <div className="flex justify-center items-center w-full h-full">
                              <label
                                htmlFor="image"
                                className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-700 border-dashed cursor-pointer    hover:bg-gray-100 "
                              >
                                <div className=" relative w-full h-full">
                                  {" "}
                                  <div className="absolute bottom-3 right-3">
                                    {/* the button for fetching the image from the user */}
                                    {/* <div
                                      className=" bg-gray-50 drop-shadow-xl rounded-md p-2"
                                      color="gray"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        imgRef.current!.click();
                                      }}
                                    >
                                      Click To Change
                                    </div> */}
                                  </div>{" "}
                                  <img
                                    className="p-2 w-full h-full object-cover rounded-lg mt-3"
                                    // value={cartaInfo[0].cartaHouseNumber}
                                    src={`/uploads/cartaImages/${cartaInfo[selectedCarta].cartaImage}`}
                                    alt="cartaImage"
                                  />
                                  {/* <img
                                    className="w-full h-full object-cover rounded-lg mt-3"
                                    src="https://placeimg.com/400/400/any"
                                    alt="logo"
                                  /> */}
                                </div>
                                :
                                <input
                                  disabled
                                  id="file-upload"
                                  value={undefined}
                                  name="img"
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          </div>
                          <div className=" border-2 rounded-md  border-black">
                            <h1 className="pl-3 pb-3 font-semibold text-lg">
                              Co-ordiates
                            </h1>
                            <div className="overflow-x-auto ">
                              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                  <table className="min-w-full">
                                    <thead className="border-b">
                                      <tr className="">
                                        <th
                                          scope="col"
                                          className="text-sm font-medium  text-gray-900 px-6 py-4 text-left"
                                        >
                                          X
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                          Y
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].X1
                                            }
                                            name="x1"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].Y1
                                            }
                                            name="y1"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].X2
                                            }
                                            name="x2"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].Y2
                                            }
                                            name="y2"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].X3
                                            }
                                            name="x3"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].Y3
                                            }
                                            name="y3"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].X4
                                            }
                                            name="x4"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].Y4
                                            }
                                            name="y4"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].X5
                                            }
                                            name="x5"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <input
                                            disabled
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            value={
                                              cartaInfo[selectedCarta]
                                                .cartaCoordinateData[0].Y5
                                            }
                                            name="y5"
                                          />
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
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        className="hidden md:flex px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Canel
                      </button>
                      <button
                        disabled={!newCitizen.id}
                        type="submit"
                        className=" hidden md:flex px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Transfer
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Updateland;
