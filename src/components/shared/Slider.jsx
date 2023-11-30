/* eslint-disable no-unused-vars */
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import "@splidejs/react-splide/css";
import useCategory from "../../hooks/useCategory";

const Slider = () => {
  const categoryData = useCategory();
  const data = categoryData?.categoryData;
  return (
    <Splide
      options={{
        type: "loop",
        gap: "50px",
        drag: "free",
        arrows: false,
        pagination: false,
        perPage: 3,
        autoScroll: {
          pauseOnHover: false,
          pauseOnFocus: false,
          rewind: true,
          speed: 1,
        },
      }}
      extensions={{ AutoScroll }}
      className="lg:p-10 p-3 rounded-lg"
    >
      {data?.map((dd) => (
        <SplideSlide key={dd._id}>
          <img src={dd.image_fill} alt="Image 1" />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Slider;
