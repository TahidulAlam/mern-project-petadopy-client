/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProbider";

const useAuth = () => {
  const allAuth = useContext(AuthContext);
  return allAuth;
};

export default useAuth;
