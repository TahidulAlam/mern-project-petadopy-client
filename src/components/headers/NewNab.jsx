/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import navBng from "../../assets/navBg3.png";
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
      <Container newClass={"fixed top-0 left-0 right-0 my-2 z-50"}>
        <div className="relative ">
          {/* <img
            src={navBng}
            width="100%"
            className="max-w-full lg:h-auto md:h-20 h-14"
            alt=""
          /> */}
          {scrollPosition > 0 && (
            <div
              className="lg:-mt-[26px] -mt-20 z-10"
              style={{
                position: "fixed",
                left: `calc(${scrollPosition / scrollFactor}%)`,
                transition: "left 0.3s ease",
              }}
            >
              <PatAnime />
            </div>
          )}
          <div className="absolute top-1 left-0 w-[98%] lg:ml-3 lg:mr-3  rounded-full">
            <div
              className="max-w-7xl mx-auto flex items-center justify-between lg:px-10 px-2 "
              style={{ position: "relative" }}
            >
              <div className="flex-shrink-0 font-bold tracking-wider z-50">
                <img src={logo} className="lg:w-40 md:w-28 w-28 pl-2" alt="" />
              </div>

              <div className="hidden md:block z-50">
                <Menu />
              </div>

              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition delay-300 duration-300 ease-in-out text-white"
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
              className="md:hidden absolute backdrop-blur-3xl bg-white/30 rounded-lg w-full delay-300 duration-500 mt-1"
              style={{
                transition: "opacity 0.3s ease-in-out",
                opacity: showMobileMenu ? 1 : 0,
              }}
            >
              {showMobileMenu && <Menu />}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewNab;
