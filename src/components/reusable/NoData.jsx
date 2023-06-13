import React from "react";

const NoData = ({ text }) => {
  return (
    <div className="grid place-items-center w-full p-5 border-t ">
      <p>{text}...</p>
    </div>
  );
};

export default NoData;
