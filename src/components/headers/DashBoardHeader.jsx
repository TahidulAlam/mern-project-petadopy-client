/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const DashBoardHeader = ({ content }) => {
  return (
    <div>
      <div className="flex justify-center items-center font-bold text-5xl p-10 w-fill bg-slate-100 text-violet-900">
        <h1>{content}</h1>
      </div>
    </div>
  );
};

export default DashBoardHeader;
