/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../../components/shared/Container";
import { GrProjects } from "react-icons/gr";
import { FaHandsHelping } from "react-icons/fa";
import { MdOutlineVolunteerActivism, MdViewTimeline } from "react-icons/md";
// import logo from "../../../assets/petadopy.png";
const AboutUs = () => {
  return (
    <div>
      {/* <Container>
      </Container> */}
      <section className="py-10 lg:py-20 font-poppins rounded-lg ">
        <div className="w-full py-4 mx-auto lg:py-6">
          <div className="grid lg:grid-cols-2 grid-cols-1 ">
            <div className="w-full px-4 mb-10 lg:mb-0 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
              <div className="lg:max-w-md ">
                <div className="px-4 pl-4 mb-6 border-l-4 border-white">
                  <span className="text-sm text-white uppercase ">
                    Who we are?
                  </span>
                  <h1 className="mt-2 text-3xl font-black text-white md:text-5xl ">
                    About Us
                  </h1>
                </div>
                <p className="px-4 mb-10 text-base leading-7 text-white ">
                  Petadopy is a revolutionary pet adoption website that
                  celebrates its first-year milestone today. Connecting animal
                  lovers with furry friends in need, Petadopy has transformed
                  the adoption process into a seamless and heartwarming
                  experience. The platform boasts a user-friendly interface,
                  allowing prospective pet parents to browse through a diverse
                  array of adoptable pets, each accompanied by detailed
                  profiles.
                </p>
                {/* <div className="flex flex-wrap items-center">
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                        <span className="text-white ">
                          <h1>Icon</h1>
                        </span>
                        <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                          2097
                        </p>
                        <h2 className="text-sm text-white ">
                          Projects and Plans
                        </h2>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                        <span className="text-white ">
                          <h1>icon</h1>
                        </span>
                        <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                          3,590
                        </p>
                        <h2 className="text-sm text-white ">
                          Helped people
                        </h2>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                        <span className="text-white ">
                          <h1>icon</h1>
                        </span>
                        <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                          74
                        </p>
                        <h2 className="text-sm text-white ">Volunteer</h2>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                      <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                        <span className="text-white ">
                          <h1>icon</h1>
                        </span>
                        <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                          100
                        </p>
                        <h2 className="text-sm text-white ">Timing</h2>
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
            <div className="w-full flex justify-center items-center mb-10 lg:mb-0">
              <div className="grid grid-cols-2 w-full lg:mx-4 mx-0 gap-4">
                <div className="w-full mb-6 lg:mb-6">
                  <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                    <span className="text-white ">
                      <GrProjects className="text-3xl" />
                    </span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                      2097
                    </p>
                    <h2 className="text-sm text-white ">Projects and Plans</h2>
                  </div>
                </div>
                <div className="w-full mb-6 lg:mb-6">
                  <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                    <span className="text-white ">
                      <FaHandsHelping className="text-3xl" />
                    </span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                      3,590
                    </p>
                    <h2 className="text-sm text-white ">Helped people</h2>
                  </div>
                </div>
                <div className="w-full mb-6 lg:mb-6">
                  <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                    <span className="text-white ">
                      <MdOutlineVolunteerActivism className="text-3xl" />
                    </span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                      74
                    </p>
                    <h2 className="text-sm text-white ">Volunteer</h2>
                  </div>
                </div>
                <div className="w-full mb-6 lg:mb-6">
                  <div className="p-6 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                    <span className="text-white ">
                      <MdViewTimeline className="text-3xl" />
                    </span>
                    <p className="mt-4 mb-2 text-3xl font-bold text-white ">
                      100
                    </p>
                    <h2 className="text-sm text-white ">Timing</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
