/* eslint-disable no-unused-vars */

import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MenuDrop from "./MenuDrop";
const Menu = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="py-3 px-2 lg:px-2 md:px-0 md:space-y-0 md:space-x-2 lg:text-lg text-base font-normal text-white w-[100%] flex justify-between items-center">
        <NavLink
          to={"/"}
          className="z-50 px-3 py-1 rounded-md whitespace-nowrap"
        >
          Home
        </NavLink>
        <NavLink
          to={"/petlisting"}
          className="z-50 px-3 py-1 rounded-md whitespace-nowrap"
        >
          Pet list
        </NavLink>
        <NavLink
          to={"/vetDoctor"}
          className="z-50 px-3 py-1 rounded-md whitespace-nowrap"
        >
          Vet Doctor
        </NavLink>
        <NavLink
          to={"/donation"}
          className="z-50 px-3 py-1 rounded-md whitespace-nowrap"
        >
          Donation
        </NavLink>
        {user?.email ? (
          <MenuDrop />
        ) : (
          <NavLink
            to={"/login"}
            className="px-3 py-1 rounded-md whitespace-nowrap"
          >
            Log In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Menu;
