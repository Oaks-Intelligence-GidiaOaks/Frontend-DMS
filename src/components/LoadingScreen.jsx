import React from 'react'
import { FaSpinner } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[#cccc] bg-opacity-75 z-50">
      <FaSpinner className="animate-spin w-10 h-10 text-gray-600" />
    </div>
  );
}

export default LoadingScreen