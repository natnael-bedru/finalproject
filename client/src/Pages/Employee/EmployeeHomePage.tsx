import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
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
  if(user.role !== "Employee" ){
    navigate("/not_found");
  }
  // Navigation Fix Here
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
