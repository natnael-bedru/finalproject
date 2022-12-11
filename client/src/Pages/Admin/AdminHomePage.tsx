import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Componets/Navbar/Navbar";
import IdContext from "../../Context/Context";
type Props = {};

const HomePage = (props: Props) => {
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
