/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CgMenuLeftAlt, CgClose } from "react-icons/cg";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import DashBoardHeader from "../../components/headers/DashBoardHeader";
import { FaSignOutAlt } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { GrUploadOption } from "react-icons/gr";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { SiDatadog } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { PiDogFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import logo from "../../assets/petadopyWhite.png";
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(
    window.innerWidth <= 768
  );
  const { user, logOut } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsTabletOrMobile(isMobile);
      if (isMobile) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", checkScreenSize);

    checkScreenSize(); // Check initial size

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  // const isAdmin = true;
  // console.log(isAdmin);
  return (
    <div className="flex">
      <div className="lg:w-[17%]">
        {isTabletOrMobile && (
          <button className="p-5 fixed z-50" onClick={toggleSidebar}>
            {showSidebar ? (
              <CgClose className="text-3xl text-white" />
            ) : (
              <CgMenuLeftAlt className="text-3xl text-white" />
            )}
          </button>
        )}

        {showSidebar && (
          <div
            className={`fixed top-0 left-0  inset-y-0 z-50 flex-shrink-0 w-64 ease-in-out duration-500 overflow-y-auto bg-indigo-950 text-white ${
              !showSidebar ? "-translate-x-full" : "translate-x-0 "
            }`}
          >
            <div className="py-3 px-5  top-0 left-0 h-screen bg-indigo-950  sidebar-content">
              <div className="flex justify-between items-center">
                {isTabletOrMobile && (
                  <button
                    className="lg:hidden block text-white"
                    onClick={closeSidebar}
                  >
                    <CgClose className="text-3xl text-white" />
                  </button>
                )}
              </div>
              <div className="lg:px-3 px-1 md:px-0 space-y-2 md:space-y-0 md:space-x-2 lg:text-base text-base font-medium text-white flex flex-col justify-between h-[95%]">
                <div>
                  <div className="flex justify-start flex-col">
                    <img src={logo} className="w-36 pb-1" alt="" />
                    <hr className="bg-white text-white w-full" />
                  </div>
                  <ul className=" rounded-md text-white whitespace-nowrap  text-start flex flex-col ">
                    <li>
                      <NavLink
                        to={"/"}
                        className="rounded-md text-white whitespace-nowrap text-start flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center"
                      >
                        <FaHome className="text-xl" />
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/petlisting"}
                        className="rounded-md text-white whitespace-nowrap text-start flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center"
                      >
                        <SiDatadog className="text-xl" />
                        Pet listing
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/donation"}
                        className="rounded-md text-white whitespace-nowrap text-start flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center "
                      >
                        <FaDonate className="text-xl" />
                        Donation
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"addPet"}
                        className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                      >
                        {" "}
                        <IoCreate className="text-xl" /> Add Pet
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"adoptionReq"}
                        className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                      >
                        <GrUploadOption className="text-xl" />
                        Adoption Request
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"myAddPet"}
                        className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                      >
                        <MdOutlinePets className="text-xl" />
                        My Add Pet
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"CreateDonation"}
                        className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                      >
                        <GiReceiveMoney className="text-xl" />
                        Create Donation
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"myDonationCamp"}
                        className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                      >
                        <BiSolidDonateHeart className="text-xl" />
                        My Donation Campaign
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"myDonation"}
                        className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                      >
                        <GiPayMoney className="text-xl" />
                        My Donation
                      </NavLink>
                    </li>

                    {isAdmin ? (
                      <>
                        <li>
                          <NavLink
                            to={"allUsers"}
                            className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                          >
                            <FaUsers className="text-xl" />
                            All Users
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={"allPets"}
                            className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                          >
                            <PiDogFill className="text-xl" />
                            All Pets
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to={"allDonations"}
                            className="flex gap-2 lg:px-2 lg:py-1 lg:my-1 p-[6px] items-center hover:bg-indigo-200 rounded-lg hover:text-indigo-950"
                          >
                            <GiTakeMyMoney className="text-xl" />
                            All Donations
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      " "
                    )}
                  </ul>
                </div>
                <div>
                  <button
                    className="btn flex justify-center items-center gap-5 bg-white text-indigo-950 rounded-lg px-3 py-2"
                    onClick={() => logOut()}
                  >
                    Sign Out <FaSignOutAlt />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <main className=" scroll-smooth lg:w-[83%] w-[100%]">
        <div className="">
          <DashBoardHeader />
        </div>
        <div className="pt-10  h-screen bg-indigo-100">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
