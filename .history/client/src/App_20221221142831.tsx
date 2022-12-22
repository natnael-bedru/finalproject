import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// import Navbar from "./componets/Wellcome/Navbar";
import Wellcomepage from "./Componets/Wellcome/WellcomePage";
import EmployeeHomePage from "./Pages/Employee/EmployeeHomePage";
import Axios from "axios";

import Signup from "./Componets/Wellcome/Signup";
import Navbar from "./Componets/Navbar/Navbar";
import Login from "./Componets/Wellcome/Login";
import Landreg from "./Pages/Employee/Landreg";
import AdminPage from "./Pages/Admin/AdminPage";
import ManageEmp from "./Pages/Admin/ManageEmp";
import RegisterEmp from "./Pages/Admin/RegisterEmp";
import StaffProfile from "./Pages/Profile/Staffprofile";

import Employee from "./Pages/Admin/Employee";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import Updateland from "./Pages/Employee/Updateland";
import Footer from "./Componets/Navbar/Footer";
import EmployeePage from "./Pages/Employee/EmployeePage";
import Ownerprofile from "./Pages/Employee/Ownerprofile";
import PasswrdPage from "./Pages/authentication/PasswrdPage";

import LandProfile from "./Pages/Employee/LandProfile";
import Landregistrated from "./Pages/Employee/Landregistrated";
import Ownerstable from "./Pages/Employee/Ownerstable";
import NotFound from "./Componets/Error/notFound";
import ViewActivity from "./Pages/Admin/ViewActivity";
function App() {
  // const [userid, setuserid] = useState([]);
  Axios.defaults.withCredentials = true;
  const [isOpen, setIsOpen] = useState(false);
  const [showOption, setShowOption] = useState(false);
  // const [userid, setuserid] = useState();
  const [reg, setreg] = useState(false);
  const [view, setView] = useState(false);
  const [sid, setSid] = useState(0);
  const [landshow, setLandshow] = useState(false);
  return (
    <>
      <div className="">
        {/* <IdContext.Provider value={{ userid, setuserid }}> */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Wellcomepage />} />
          <Route
            path="/staffprofile/:id"
            element={
              <StaffProfile
                empProfile={showOption}
                setempProfile={setShowOption}
              />
            }
          />
          <Route path="/not_found" element={<NotFound />} />
          <Route
            path="/viewactivity"
            element={
              <ViewActivity
                viewactvity={view}
                setViewactvity={setView}
                setid={sid}
              />
            }
          />
          <Route
            path="/landPorfile"
            element={
              <LandProfile showland={landshow} setShowland={setLandshow} />
            }
          />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/employeehomepage" element={<EmployeeHomePage />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordpage" element={<PasswrdPage />} />

          <Route path="/adminhomepage" element={<AdminHomePage />} />

          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/landregistration" element={<Landreg />} />
          <Route path="/updateland" element={<Updateland />} />
          <Route path="/manageEmployee" element={<ManageEmp />} />
          <Route
            path="/registerEmployee"
            element={<RegisterEmp Empreg={reg} setEmpreg={setreg} />}
          />
          <Route path="/EmployeePage" element={<EmployeePage />} />
          <Route path="/owners" element={<Ownerstable />} />
          {/*  this will decise which route it will take based on the role */}

          {/* Admin Route */}

          <Route path="/adminhomepage" element={<AdminHomePage />}>
            <Route index element={<AdminPage />} />
            <Route
              path="registerEmployee"
              element={<RegisterEmp Empreg={reg} setEmpreg={setreg} />}
            />
            <Route
              path="staffprofile/:id"
              element={
                <StaffProfile
                  empProfile={showOption}
                  setempProfile={setShowOption}
                />
              }
            />
            <Route path="employees" element={<Employee />} />
            <Route path="employees " element={<Employee />} />

            <Route path="manageEmployee" element={<ManageEmp />} />
            <Route path="lands" element={<Landregistrated />} />
          </Route>

          {/* Employye Route */}
          <Route path="/employeehomepage" element={<EmployeeHomePage />}>
            <Route index element={<EmployeePage />} />
            <Route
              path="staffprofile/:id"
              element={
                <StaffProfile
                  empProfile={showOption}
                  setempProfile={setShowOption}
                />
              }
            />
            <Route path="owners" element={<Ownerstable />} />
            <Route path="landregistration/:id" element={<Landreg />} />
            <Route path="lands" element={<Landregistrated />} />
            <Route
              path="landProfile"
              element={
                <LandProfile showland={landshow} setShowland={setLandshow} />
              }
            />
            <Route
              path="ownerprofile"
              element={<Ownerprofile show={isOpen} setShow={setIsOpen} />}
            />
          </Route>
        </Routes>
        {/* </IdContext.Provider> */}
      </div>
    </>
  );
}

export default App;
