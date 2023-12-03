/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../components/shared/Container";
import Banner from "./Banner/Banner";
import Category from "./category/Category";
import CalltoAction from "./callToAction/CalltoAction";
import AboutUs from "./AboutUs/AboutUs";
import Review from "./review/Review";
import logo from "../../assets/petadopy.png";
const Home = () => {
  return (
    <div>
      <Container>
        <div className="lg:mt-36 mt-16 -z-10 relative">
          <Banner />
        </div>
        <div>
          <img className="w-96 mt-5 mx-auto p-10" src={logo} alt="" />
        </div>
        <div className="mt-5 -z-10 relative">
          <Category />
        </div>
        <div className="lg:mt-20 md:mt-10 mt-5  -z-10 relative">
          <CalltoAction />
        </div>
        <div className="mt-10 -z-10 relative">
          <AboutUs />
        </div>
        <div className="mt-5 -z-10 relative">
          <Review />
        </div>
      </Container>
    </div>
  );
};

export default Home;
