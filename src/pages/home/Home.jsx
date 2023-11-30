/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../../components/shared/Container";
import Banner from "./Banner/Banner";
import Category from "./category/Category";
import CalltoAction from "./callToAction/CalltoAction";
import AboutUs from "./AboutUs/AboutUs";
import Counter from "./counter/Counter";
import Review from "./review/Review";

const Home = () => {
  return (
    <div>
      <Container>
        <div className="mt-36 -z-10 relative">
          <Banner />
        </div>
        <div className="mt-5 -z-10 relative">
          <Category />
        </div>
        <div className="mt-5 -z-10 relative">
          <CalltoAction />
        </div>
        <div className="mt-5 -z-10 relative">
          <AboutUs />
        </div>
        <div className="mt-5 -z-10 relative">
          <Counter />
        </div>
        <div className="mt-5 -z-10 relative">
          <Review />
        </div>
      </Container>
    </div>
  );
};

export default Home;
