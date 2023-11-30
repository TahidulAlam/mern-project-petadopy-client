/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import navBng from "../../assets/navBg2.png";
import logo from "../../assets/petadopyWhite.png";
import Container from "../shared/Container";
import PatAnime from "../shared/PatAnime";

const NewNab = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollFactor = 1.3;

  const handleScroll = () => {
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
      100;
    setScrollPosition(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Container newClass={"fixed top-0 left-0 right-0 z-50"}>
        <div className="relative z-50">
          <img
            src={navBng}
            width="100%"
            className="max-w-fit lg:h-auto md:h-20 h-14"
            alt=""
          />
          {scrollPosition > 0 && (
            <div
              className="lg:-mt-[125px] -mt-20"
              style={{
                position: "fixed",
                left: `calc(${scrollPosition / scrollFactor}%)`,
                transition: "left 0.3s ease",
              }}
            >
              <PatAnime />
            </div>
          )}
          <nav className="absolute top-0 left-0 w-[98%] lg:ml-3 lg:mr-3 lg:mt-2 mt-0 pt-1">
            <div
              className="max-w-7xl mx-auto flex items-center justify-between lg:px-10 px-2 text-white"
              style={{ position: "relative" }}
            >
              <div className="flex-shrink-0 font-bold tracking-wider">
                <img src={logo} className="lg:w-40 md:w-28 w-28 pl-2" alt="" />
              </div>

              <div className="hidden md:block">
                <Menu />
              </div>

              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition delay-300 duration-300 ease-in-out"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {!showMobileMenu ? (
                  <CgMenuRightAlt className="text-3xl transition-transform duration-300 ease-in-out" />
                ) : (
                  <RxCross2 className="text-3xl transition-transform duration-300 ease-in-out" />
                )}
              </button>
            </div>
            <div
              className="md:hidden absolute bg-violet-700 rounded-lg lg:mt-0 mt-4 w-full delay-300 duration-500"
              style={{
                transition: "opacity 0.3s ease",
                opacity: showMobileMenu ? 1 : 0,
              }}
            >
              {showMobileMenu && <Menu />}
            </div>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default NewNab;
