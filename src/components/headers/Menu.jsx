/* eslint-disable no-unused-vars */

import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MenuDrop from "./MenuDrop";
const Menu = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="px-2 lg:px-2 md:px-0 py-6 space-y-2 md:space-y-0 md:space-x-2 lg:text-xl text-base font-medium text-white w-[98%] lg:w-[100%] flex justify-between items-center">
        <NavLink
          to={"/"}
          className="px-3 py-2 rounded-md text-white focus:outline-none focus:text-white focus:bg-gray-700 whitespace-nowrap"
        >
          Home
        </NavLink>
        <NavLink
          to={"/petlisting"}
          className="px-3 py-2 rounded-md text-white focus:outline-none focus:text-white focus:bg-gray-700 whitespace-nowrap"
        >
          Pet listing
        </NavLink>
        <NavLink
          to={"/donation"}
          className="px-3 py-2 rounded-md text-white focus:outline-none focus:text-white focus:bg-gray-700 whitespace-nowrap"
        >
          Donation
        </NavLink>
        {user?.email ? (
          <MenuDrop />
        ) : (
          <NavLink
            to={"/login"}
            className="px-3 py-2 rounded-md text-white focus:outline-none focus:text-white focus:bg-gray-700 whitespace-nowrap"
          >
            Log In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Menu;
