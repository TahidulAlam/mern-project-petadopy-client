/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

import React, { useState } from "react";

const Animation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = (event) => {
    const scrollPercentage =
      (event.target.scrollTop /
        (event.target.scrollHeight - event.target.clientHeight)) *
      100;

    setScrollPosition(scrollPercentage);

    if (event.target.scrollTop > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const roundDiv1Style = {
    position: "fixed",
    left: "50%", // Stay centered
    top: "50px", // Adjust as needed
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "red",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.3s ease", // Added a transition for a smooth hide effect
  };

  const roundDiv2Style = {
    position: "fixed",
    left: `${scrollPosition / 2}%`, // Move from left to right based on scroll
    top: "50px", // Adjust as needed
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "blue",
    transition: "left 0.3s ease", // Added a transition for a smooth move effect
  };

  return (
    <div>
      <div
        className="z-50"
        style={{ height: 500, overflowY: "scroll" }}
        onScroll={handleScroll}
      >
        {/* Placeholder content to allow scrolling */}
        <div style={{ height: "1000px" }}></div>

        <div style={roundDiv1Style}></div>
        <div style={roundDiv2Style}></div>
      </div>
    </div>
  );
};

export default Animation;
