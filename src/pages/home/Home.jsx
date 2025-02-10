/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../components/shared/Container";
import Banner from "./Banner/Banner";
import Category from "./category/Category";
import CalltoAction from "./callToAction/CalltoAction";
import AboutUs from "./AboutUs/AboutUs";
import Review from "./review/Review";
import logo from "../../assets/petadopyWhite.png";
import ReviewSlider from "./reviewSlider/ReviewSlider";
const Home = () => {
  return (
    // <div className="bg-slate-50">
    <div>
      <Container>
        <div className="relative ">
          <Banner />
        </div>
      </Container>
      {/* <Container>
        <div>
          <img className="lg:w-96 w-60 mx-auto px-10 py-7" src={logo} alt="" />
        </div>
      </Container> */}
      <Container>
        <div className="mt-5 rounded-lg flex flex-col w-[100%]  lg:p-10 p-2">
          <Category />
          {/* <div className="flex justify-center items-center lg:m-10 m-2">
            <button className=" text-center lg:w-40 p-2 text-black rounded-md bg-white font-poppins text-base">
              See All
            </button>
          </div> */}
        </div>
      </Container>
      <Container>
        <div className="lg:mt-20 md:mt-10 mt-5 h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
          <CalltoAction />
        </div>
      </Container>
      <Container>
        <div className="mt-10  relative">
          <AboutUs />
        </div>
      </Container>
      <Container>
        <div className="mt-5 ">
          <ReviewSlider />
        </div>
      </Container>
      <Container>
        <div className="mt-5">
          <Review />
        </div>
      </Container>
    </div>
  );
};

export default Home;
