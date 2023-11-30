/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import Menu from "./Menu";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import navBng from "../../assets/navBg2.png";
import logo from "../../assets/petadopyWhite.png";
import Container from "../shared/Container";
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div>
      <Container newClass={"fixed top-0 left-0 right-0"}>
        <div className="relative">
          <img
            src={navBng}
            width="100%"
            className=" max-w-fit lg:h-auto md:h-20 h-14"
            alt=""
          />
          <nav className="absolute top-0 left-0 w-[98%]  lg:ml-3 lg:mr-3 lg:mt-2 mt-0 ">
            <div className="max-w-7xl mx-auto flex items-center justify-between lg:px-10 px-2 text-white ">
              <div className="flex-shrink-0 font-bold tracking-wider">
                <img src={logo} className="lg:w-40 md:w-20 w-20" alt="" />
              </div>
              <div className="hidden md:block">
                <Menu />
              </div>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md  focus:outline-none transition delay-300 duration-300 ease-in-out"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {!showMobileMenu ? (
                  <CgMenuRightAlt className="text-3xl transition-transform duration-300 ease-in-out" />
                ) : (
                  <RxCross2 className="text-3xl transition-transform duration-300 ease-in-out" />
                )}
              </button>
            </div>
            <div className="md:hidden absolute bg-violet-700 rounded-lg lg:mt-0 mt-4 w-full delay-300 duration-500">
              {showMobileMenu && <Menu />}
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
