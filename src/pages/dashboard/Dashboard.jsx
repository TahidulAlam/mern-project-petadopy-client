/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CgMenuLeftAlt, CgClose } from "react-icons/cg";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import DashBoardHeader from "../../components/headers/DashBoardHeader";
import { FaSignOutAlt } from "react-icons/fa";
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(
    window.innerWidth > 768 // Set initial state based on screen size
  );
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(
    window.innerWidth <= 768
  );
  const { user, logOut } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsTabletOrMobile(isMobile);

      // Update state based on screen size
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
  return (
    <div className="lg:grid lg:grid-cols-12 grid-cols-none">
      <div className="lg:col-span-2">
        {isTabletOrMobile && (
          <button className="p-5 fixed" onClick={toggleSidebar}>
            {showSidebar ? (
              <CgClose className="text-3xl" />
            ) : (
              <CgMenuLeftAlt className="text-3xl" />
            )}
          </button>
        )}

        {showSidebar && (
          <div
            className={`fixed top-0 left-0 h-screen w-auto bg-white shadow-lg z-50 transition-transform transform duration-500 ease-in-out ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="px-6 py-4 top-0 left-0 h-screen bg-slate-100 sidebar-content">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-center">
                  {user?.displayName}
                </h2>
                {isTabletOrMobile && (
                  <button className="lg:hidden block" onClick={closeSidebar}>
                    <CgClose className="text-3xl" />
                  </button>
                )}
              </div>
              <div className="px-2 md:px-0 lg:py-6 py-3 space-y-2 md:space-y-0 md:space-x-2 lg:text-xl text-base font-medium text-black flex flex-col justify-between items-start">
                <ul className=" rounded-md text-black focus:outline-none focus:text-black focus:bg-gray-700 whitespace-nowrap  text-start">
                  {/* Sidebar content here */}
                  {/* <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                    <NavLink to={"userHome"}>User Home</NavLink>
                  </li> */}
                  <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                    <NavLink to={"addPet"}>Add Pet</NavLink>
                  </li>
                  <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                    <NavLink to={"adoptionReq"}>Adoption Request</NavLink>
                  </li>
                  <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                    <NavLink to={"myAddPet"}>My Add Pet</NavLink>
                  </li>
                  <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                    <NavLink to={"CreateDonation"}>Create Donation</NavLink>
                  </li>
                  <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                    <NavLink to={"myDonationCamp"}>
                      My Donation Campaign
                    </NavLink>
                  </li>
                  <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                    <NavLink to={"myDonation"}>My Donation</NavLink>
                  </li>

                  <br className="text-black w-full bg-black" />

                  {isAdmin ? (
                    <>
                      {/* <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                        <NavLink to={"adminHome"}>Admin Home</NavLink>
                      </li> */}
                      <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                        <NavLink to={"allUsers"}>All Users</NavLink>
                      </li>
                      <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                        <NavLink to={"allPets"}>All Pets</NavLink>
                      </li>
                      <li className="py-1 px-2 hover:bg-slate-300 rounded-lg">
                        <NavLink to={"allDonations"}>All Donations</NavLink>
                      </li>
                    </>
                  ) : (
                    " "
                  )}
                  {/* <>
              <li>
                <NavLink to={"adminHome"}>Admin Home</NavLink>
              </li>
              <li>
                <NavLink to={"addItems"}>Add Items</NavLink>
              </li>
              <li>
                <NavLink to={"manageItems"}>Manage Items</NavLink>
              </li>
              <li>
                <NavLink to={"manageBookings"}>Manage Bookings</NavLink>
              </li>
              <li>
                <NavLink to={"allUsers"}>All Users</NavLink>
              </li>
            </> */}
                </ul>
                <NavLink
                  to={"/"}
                  className="px-3 py-2 rounded-md text-black focus:outline-none focus:text-black focus:bg-gray-700 whitespace-nowrap text-start"
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/petlisting"}
                  className="px-3 py-2 rounded-md text-black focus:outline-none focus:text-black focus:bg-gray-700 whitespace-nowrap text-start"
                >
                  Pet listing
                </NavLink>
                <NavLink
                  to={"/donation"}
                  className="px-3 py-2 rounded-md text-black focus:outline-none focus:text-black focus:bg-gray-700 whitespace-nowrap text-start"
                >
                  Donation
                </NavLink>
                <button
                  className="btn flex justify-center items-center gap-5 bg-red-500 rounded-lg px-3 py-2"
                  onClick={() => logOut()}
                >
                  Sign Out <FaSignOutAlt />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="lg:col-span-10">
        {location.pathname === "/dashboard" && (
          <DashBoardHeader content={<h1>Dashboard</h1>} />
        )}

        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Dashboard;
