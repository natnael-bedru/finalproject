import Axios from "axios";
import React, {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useParams } from "react-router-dom";
import IdContext from "../../Context/Context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Landreg = (props: Props) => {
  // *fetching the employee id
  const { user } = useContext(IdContext);

  const param = useParams();
  // Citizen preload BEGGINING
  const [currCitizen, setCurrCitizen] = useState({
    id: 0,
    img: "",
    fullName: "",
    dateofbirth: "",
    sex: "",
    phonenumber: "",
    woredaNumber: "",
    kebeleNumber: "",
    subCityName: "",
  });
  useLayoutEffect(() => {
    Axios.get(`http://localhost:3001/AALHRIA/viewCitizen/${param.id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response.data[0]);
      setCurrCitizen(response.data[0]);
    });
  }, []);
  // Citizen preload END
  // Woreda Kebele preload dropdown fetch and map BEGINING
  const [woredaInfo, setWoredaInfo] = useState<any[]>([
    {
      woredaNumber: 0,
      kebeleNumber: 0,
      subCityName: "",
    },
  ]);
  useLayoutEffect(() => {
    Axios.get(`http://localhost:3001/AALHRIA/retriveAllWoredaInfo`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((data) => {
      setWoredaInfo(data.data);
    });
  }, []);
  // MAPING DROPDOWN TO EACHOTHER BEGGINING
  const dropdownWoreda = useRef<HTMLSelectElement>(null);
  const dropdownKebele = useRef<HTMLSelectElement>(null);
  const onChangeWoreda = (e: {
    target: { selectedIndex: React.SetStateAction<number> };
  }) => {
    if (dropdownKebele && dropdownKebele.current) {
      dropdownKebele.current.selectedIndex = parseInt(
        e.target.selectedIndex.toString()
      );
    }
  };
  const onChangeKebele = (e: {
    target: { selectedIndex: React.SetStateAction<number> };
  }) => {
    if (dropdownWoreda && dropdownWoreda.current) {
      dropdownWoreda.current.selectedIndex = parseInt(
        e.target.selectedIndex.toString()
      );
    }
  };
  // MAPING DROPDOWN TO EACHOTHER END
  // Woreda Kebele preload dropdown fetch and map END

  // Image preview BEGINING
  var imgRef = useRef<HTMLInputElement | null>(null);
  const imageFieldReference = document.getElementById(
    "file-upload"
  ) as HTMLInputElement;
  imgRef.current = imageFieldReference!;
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(undefined);
    }
  }, [image]);
  // Image preview END

  // *Setting Toast message Handler
  const [_msg, setMsg] = useState({
    type: "",
    message: "",
  });

  // Register Land Form Submit BEGINING
  const initialValues = {
    citizenId: 0,
    img: null,
    currentWoreda: null,
    formerKebele: null,
    blockNumber: null,
    parcelNumber: null,
    houseNumber: null,
    plotArea: null,
    builtUpArea: null,
    landGrade: "",
    titleDeedNo: "",
    cartaIssuedDate: new Date().toISOString().substring(0, 10),
    basemapNo: null,
    registrationNo: null,
    typeOfHolding: "",
    plannedLandUse: "",
    permittedUse: "",
    staffId: user.id,
    lastModifiedBy: user.id,
    lastModifiedDate: new Date().toISOString().substring(0, 10),
    x1: null,
    x2: null,
    x3: null,
    x4: null,
    x5: null,
    y1: null,
    y2: null,
    y3: null,
    y4: null,
    y5: null,
  };
  const onSubmit = (data: any) => {
    data.img = preview;
    data.citizenId = currCitizen.id;
    data.currentWoreda = dropdownWoreda.current
      ? dropdownWoreda.current.value
      : 0;
    data.formerKebele = dropdownKebele.current
      ? dropdownKebele.current.value
      : 0;
    Axios.post("http://localhost:3001/AALHRIA/registerLand", data, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
    //  console.log(`Response: ${JSON.stringify(response.data)}`);
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
  // *TOAST MESSAGE
  useEffect(() => {
    if (_msg.type) {
      if (_msg.type === "error") {
        // dangerouslySetInnerHTML={{__html: _msg.message}}
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
      <div className="w-full h-screen ">
        {<ToastContainer />}
        <div className="w-full h-full bg-white flex flex-col px-8 py-4">
          <div className="flex items-center max-h-min justify-between w-full">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold my-0">
                Land Registration Form
              </h2>
              {/* <p className="text-sm font-light">
                View Sales information and manage them here
              </p> */}
            </div>
            <div className="flex"></div>
          </div>

          <div className="mt-10 mx-auto flex flex-col w-full jsu">
            <div className="grid grid-cols-3 divide-x">
              <div>
                <label className="block text-sm  font-medium">
                  Citizen Image
                </label>
                <div className="mt-1 flex justify-center items-center px-1 pt-1 pb-1 border-2 h-[200px] w-[200px] border-gray-300 border-dashed rounded-md">
                  <img src={`/uploads/citizenImages/${currCitizen.img}`} />
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
                  Date of Birth:{dateConverter(currCitizen.dateofbirth)}

                </p>
                <p className=" dark:text-black">Sex:{currCitizen.sex}</p>
                <p className=" dark:text-black">
                  Phone Number:{currCitizen.phonenumber}
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
            <div className="w-full ">
              <section className="p-3 rounded-md shadow-md  text-black">
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  <Form>
                    <div className="flex justify-between my-4  ">
                      <div className="w-full  h-full flex flex-col justify-center items-center px-2 space-y-4">
                        <div className="flex w-full space-x-4">
                          <div className="w-full">
                            <label className="" htmlFor="username">
                              Title Deed Number
                            </label>
                            <Field
                              required
                              name="titleDeedNo"
                              type="text"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>

                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="passwordConfirmation"
                            >
                              Current Woreda
                            </label>
                            <select
                              required
                              name="currentWoreda"
                              //as="select"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              ref={dropdownWoreda}
                              onChange={onChangeWoreda}
                            >
                              <option value="" disabled selected>
                                Unspecified
                              </option>
                              {woredaInfo.map((item, key) => {
                                return (
                                  <option
                                    key={key}
                                    value={item.woredaNumber}
                                  >{`${item.woredaNumber} | ${item.subCityName}`}</option>
                                );
                              })}
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
                              required
                              name="formerKebele"
                              //as="select"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                              ref={dropdownKebele}
                              onChange={onChangeKebele}
                            >
                              <option value="" disabled selected>
                                Unspecified
                              </option>
                              {woredaInfo.map((item, key) => {
                                return (
                                  <option
                                    key={key}
                                    value={item.kebeleNumber}
                                  >{`${item.kebeleNumber} | ${item.subCityName}`}</option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="username">
                              House Number
                            </label>
                            <Field
                              required
                              id="houseNumber"
                              name="houseNumber"
                              type="numeric"
                              placeholder=""
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                        </div>

                        <div className="flex w-full space-x-4">
                          <div className="w-full">
                            <label className="" htmlFor="username">
                              Block Number
                            </label>
                            <Field
                              required
                              name="blockNumber"
                              id="blockNumber"
                              type="numeric"
                              placeholder=""
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="parcelNumber">
                              Parcel Number
                            </label>
                            <Field
                              required
                              name="parcelNumber"
                              id="parcelNumber"
                              type="numeric"
                              placeholder=""
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="basemapNo">
                              Base-Map Number
                            </label>
                            <Field
                              required
                              name="basemapNo"
                              id="basemapNo"
                              type="numeric"
                              placeholder=""
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-900 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                        </div>
                        <div className="flex w-full space-x-4">
                          <div className="w-full">
                            <label className="" htmlFor="landGrade">
                              Land Grade
                            </label>
                            <Field
                              required
                              name="landGrade"
                              id="landGrade"
                              type="text"
                              placeholder=""
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="plotArea">
                              Plot Area <small>(&#x33A1;)</small>
                            </label>
                            <Field
                              required
                              name="plotArea"
                              id="plotArea"
                              type="numeric"
                              placeholder=""
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="builtUpArea">
                              Built Up Area <small>(&#x33A1;)</small>
                            </label>
                            <Field
                              required
                              name="builtUpArea"
                              id="builtUpArea"
                              type="numeric"
                              placeholder=""
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="w-full">
                            <label className="" htmlFor="registrationNo">
                              Registration Number
                            </label>
                            <Field
                              required
                              name="registrationNo"
                              id="registrationNo"
                              type="numeric"
                              placeholder=""
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
                            <Field
                              required
                              as="select"
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
                            </Field>
                          </div>
                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="plannedLandUse"
                            >
                              Planned Land use
                            </label>
                            <Field
                              required
                              as="select"
                              name="plannedLandUse"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="" disabled selected>
                                Unspecified
                              </option>
                              <option value={"Mixed"}>Mixed</option>
                              <option value={"Residence"}>Residence</option>
                              <option value={"Business"}>Business</option>
                            </Field>
                          </div>
                          <div className="w-full">
                            <label
                              className=" dark:text-black"
                              htmlFor="permittedUse"
                            >
                              Permmited use
                            </label>
                            <Field
                              required
                              as="select"
                              name="permittedUse"
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                              <option value="" disabled selected>
                                Unspecified
                              </option>
                              <option value={"Mixed"}>Mixed</option>
                              <option value={"Residence"}>Residence</option>
                              <option value={"Business"}>Business</option>
                            </Field>
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
                                    {" "}
                                    <div
                                      className=" bg-gray-50 drop-shadow-xl rounded-md p-2"
                                      color="gray"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        imgRef.current!.click();
                                      }}
                                    >
                                      Click To Change
                                    </div>
                                  </div>{" "}
                                  <img
                                    className="p-2 w-full h-full object-cover rounded-lg mt-3"
                                    src={preview}
                                    // alt="cartaImage"
                                  />
                                  {/* <img
                                    className="w-full h-full object-cover rounded-lg mt-3"
                                    src="https://placeimg.com/400/400/any"
                                    alt="logo"
                                  /> */}
                                </div>
                                :
                                <Field
                                  required
                                  ref={imgRef}
                                  id="file-upload"
                                  value={undefined}
                                  name="img"
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(event: {
                                    target: { files: any[] };
                                  }) => {
                                    const file = event.target.files[0];
                                    if (
                                      file &&
                                      file.type.substr(0, 5) === "image"
                                    ) {
                                      //setFieldValue('img', event.target.files[0]);
                                      setImage(file);
                                    } else {
                                      setImage(undefined);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            {/* <input value="Certificate Image" /> */}
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
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="x1"
                                            name="x1"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="y1"
                                            name="y1"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="x2"
                                            name="x2"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="y2"
                                            name="y2"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="x3"
                                            name="x3"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="y3"
                                            name="y3"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="x4"
                                            name="x4"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            required
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="y4"
                                            name="y4"
                                          />
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b">
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="x5"
                                            name="x5"
                                          />
                                        </td>
                                        <td className="  w-1/2 whitespace-nowrap text-sm font-medium text-gray-900">
                                          <Field
                                            className="w-full h-full p-4"
                                            type="numeric"
                                            placeholder="y5"
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

                    <div className="flex justify-end   space-x-4">
                      <Link to="/employeehomepage/owners">
                        <button
                          type="button"
                          className="hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                          Canel
                        </button>
                      </Link>
                      <button
                        type="submit"
                        className="  hidden md:flex   px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                </Formik>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landreg;
