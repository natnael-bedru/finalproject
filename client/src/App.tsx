import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Axios from "axios";

import Wellcomepage from "./Componets/Wellcome/WellcomePage";
import EmployeeHomePage from "./Pages/Employee/EmployeeHomePage";
import Signup from "./Componets/Wellcome/Signup";
import Navbar from "./Componets/Navbar/Navbar";
import Login from "./Componets/Wellcome/Login";
import Landreg from "./Pages/Employee/Landreg";
import AdminPage from "./Pages/Admin/AdminPage";
import ManageEmp from "./Pages/Admin/ManageEmp";
import RegisterEmp from "./Pages/Admin/RegisterEmp";
import Employeeprofile from "./Pages/Employee/Employeeprofile";
import Employee from "./Pages/Admin/Employee";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import Updateland from "./Pages/Employee/Updateland";
import Footer from "./Componets/Navbar/Footer";
import EmployeePage from "./Pages/Employee/EmployeePage";
import Ownerprofile from "./Pages/Employee/Ownerprofile";
import PasswrdPage from "./Pages/authentication/PasswrdPage";
import Landregistrated from "./Pages/Employee/Landregistrated";
import Ownerstable from "./Pages/Employee/Ownerstable";

function App() {
  Axios.defaults.withCredentials = true;
  const [isOpen, setIsOpen] = useState(false);
  const [showOption, setShowOption] = useState(false);

  return (
    <>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Wellcomepage />} />
          
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/employeehomepage" element={<EmployeeHomePage />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passwordpage" element={<PasswrdPage />} />
            <Route
              path="/employeeprofile"
              element={
                <Employeeprofile
                  empProfile={showOption}
                  setempProfile={setShowOption}
                />
              }
            />
            <Route path="/adminhomepage" element={<AdminHomePage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/landregistration" element={<Landreg />} />
            <Route path="/updateland" element={<Updateland />} />
            <Route path="/manageEmployee" element={<ManageEmp />} />
            <Route path="/registerEmployee" element={<RegisterEmp />} />
            <Route path="/EmployeePage" element={<EmployeePage />} />
            <Route path="/owners" element={<Ownerstable />} />
            {/*  this will decise which route it will take based on the role */}

            {/* Admin Route */}

            <Route path="/adminhomepage" element={<AdminHomePage />}>
              <Route index element={<AdminPage />} />
              <Route path="registerEmployee" element={<RegisterEmp />} />
              <Route path="employees" element={<Employee />} />
              <Route path="manageEmployee" element={<ManageEmp />} />
              <Route path="lands" element={<Landregistrated />} />
            </Route>

            {/* Employye Route */}
            <Route path="/employeehomepage" element={<EmployeeHomePage />}>
              <Route index element={<EmployeePage />} />
              <Route
                path="employeeprofile"
                element={
                  <Employeeprofile
                    empProfile={showOption}
                    setempProfile={setShowOption}
                  />
                }
              />
              <Route path="owners" element={<Ownerstable />} />
              <Route path="landregistration" element={<Landreg />} />
              <Route path="lands" element={<Landregistrated />} />
              <Route
                path="ownerprofile"
                element={<Ownerprofile show={isOpen} setShow={setIsOpen} />}
              />
            </Route>
            {/* <Route path="/viewmodal" element={<Viewmodal />}>
            <Route index element={<Modal />} />
            <Route path="setmodal" element={<Setmodal />} />
          </Route> */}
          
        </Routes>
    </>
  );
}

export default App;
