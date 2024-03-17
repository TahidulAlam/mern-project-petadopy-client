/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const { user, logOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  // console.log(user);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="relative block md:inline-block" ref={dropdownRef}>
      <button className=" w-12 rounded-full" onClick={toggleDropdown}>
        <img
          className="rounded-full"
          src={user?.photoURL ? user?.photoURL : user?.displayName.slice(0, 1)}
          alt={user?.displayName.slice(0, 1)}
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white transition-all duration-300 ease-in-out opacity-100 transform translate-y-0 z-50 font-poppins text-base font-medium">
          <ul className="p-3 ">
            {location.pathname === "/dashboard/userHome" ? (
              ""
            ) : (
              <li className="py-2 text-black hover:bg-slate-200 rounded-lg px-2">
                <Link to={"dashboard/userHome"}>Dashboard</Link>
              </li>
            )}

            <li className="py-2 text-black hover:bg-slate-200 rounded-lg px-2">
              <button className="btn" onClick={() => logOut()}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
