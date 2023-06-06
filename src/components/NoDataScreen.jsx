import React from "react";
import { ImCross } from "react-icons/im";

const NoDataScreen = ({ title }) => {
  return (
    <div className=" flex flex-col gap-4 items-center justify-center bg-opacity-75 z-50">
      <ImCross className=" w-8 h-8 text-gray-600" />
      <span>{title}</span>
    </div>
  );
};

export default NoDataScreen;
