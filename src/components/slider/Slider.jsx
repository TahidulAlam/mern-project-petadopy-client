/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useCallback, useEffect, useState } from "react";

const Slider = ({ sliderImages }) => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? sliderImages.length - 1 : currentSlider - 1
    );
  const nextSlider = useCallback(
    () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === sliderImages.length - 1 ? 0 : currentSlider + 1
      ),
    [sliderImages.length]
  );

  // if you don't want to change the slider automatically then you can just remove the useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <div>
      <div className="h-[240px] w-full md:h-[370px] lg:h-[500px] rounded-lg relative overflow-hidden">
        {/* arrow left */}
        <button
          onClick={prevSlider}
          className="absolute top-1/2 left-3 z-50 flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        >
          <svg
            className="w-4 h-4 md:w-6 md:h-6 icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#0095FF"
                d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
              ></path>
            </g>
          </svg>
        </button>
        {/* arrow right */}
        <button
          onClick={nextSlider}
          className="absolute top-1/2 z-50 right-3  flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        >
          <svg
            className="w-4 h-4 md:w-6 md:h-6 icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            transform="rotate(180)"
          >
            <g strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#0095FF"
                d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
              ></path>
            </g>
          </svg>
        </button>
        {/* dots */}
        <div className="flex justify-center items-center rounded-full z-50 absolute bottom-4 w-full gap-1">
          {sliderImages.map((_, inx) => (
            <button
              key={_}
              onClick={() => setCurrentSlider(inx)}
              className={`rounded-full duration-300 bg-white ${
                currentSlider === inx ? "w-8" : "w-2"
              } h-2`}
            ></button>
          ))}
        </div>
        {/* Carousel container */}
        <div
          className="ease-linear duration-300 flex transform-gpu"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {/* sliders */}
          {sliderImages.map((slide, inx) => (
            <img
              key={slide}
              src={slide}
              className="min-w-full h-[240px] w-full md:h-[370px] lg:h-[500px] object-cover "
              alt={`Slider - ${inx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
