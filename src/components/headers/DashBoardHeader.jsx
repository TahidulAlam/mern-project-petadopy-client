/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const DashBoardHeader = ({ content }) => {
  return (
    <div>
      <div className="flex justify-center items-center font-bold lg:text-5xl text-xl lg:p-10 p-5 w-fill bg-slate-100 text-violet-900">
        <h1>{content}</h1>
      </div>
    </div>
  );
};

export default DashBoardHeader;
