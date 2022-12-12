import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import EmpNavbar from "../../Componets/Navbar/EmpNavbar";
import Navbar from "../../Componets/Navbar/Navbar";
import IdContext from "../../Context/Context";
type Props = {};

const HomePage = (props: Props) => {
  const navigate = useNavigate();
  /**
   * [Context variables]
   * @param  {[int]} id [description]
   * @param  {[string]} username [description]
   * @param  {[string]} role [description]
   * @param  {[boolean]} status [description]
   * @return {[object]}      [These are set on user by setUser]
   */
  const [user, setUser] = useState({
    id: 0,
    username: "",
    role: "",
    status: false,
  });
  // Navigation Fix Here
  if (user.role !== "Employee") {
    navigate("/not_found");
  }
  return (
    <>
      <IdContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Outlet />
      </IdContext.Provider>
    </>
  );
};

export default HomePage;
