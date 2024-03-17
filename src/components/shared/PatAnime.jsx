/* eslint-disable no-unused-vars */
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/RRSWboGarO.json";

const PatAnime = () => {
  const isSmallScreen = window.innerWidth <= 768; // Adjust the breakpoint as needed
  const animationStyle = {
    width: isSmallScreen ? "80px" : "120px",
    height: isSmallScreen ? "80px" : "120px",
  };

  return (
    <div>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={animationStyle}
      />
    </div>
  );
};

export default PatAnime;
