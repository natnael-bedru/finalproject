import { useContext } from "react";
import AuthContext from "../Helpers/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
