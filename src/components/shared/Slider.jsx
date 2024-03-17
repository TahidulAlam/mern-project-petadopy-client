/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import "@splidejs/react-splide/css";
import useCategory from "../../hooks/useCategory";

const Slider = () => {
  const categoryData = useCategory();
  const [perPage, setPerPage] = useState(3);
  const [pergap, setPergap] = useState("50px");
  const data = categoryData?.categoryData?.result;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPerPage(3);
        setPergap("10px");
      } else {
        setPerPage(3);
        setPergap("50px");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Splide
      options={{
        type: "loop",
        gap: pergap,
        drag: "free",
        arrows: false,
        pagination: false,
        perPage: perPage,
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
          <img
            src={dd.image_fill}
            alt="Image 1"
            className="w-full lg:w-auto"
            style={{ maxWidth: "100%" }}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Slider;
