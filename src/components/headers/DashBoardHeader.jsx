/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import MenuDrop from "./MenuDrop";
const DashBoardHeader = () => {
  return (
    <div>
      <div className="fixed w-full h-16 py-1 font-bold lg:text-5xl text-xl p-2 w-fill backdrop-blur-md bg-white/30 text-white">
        <div className="flex w-[80%] justify-end">
          <MenuDrop />
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
