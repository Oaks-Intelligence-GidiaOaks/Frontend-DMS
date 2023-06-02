import React from "react";

const DisplayInput = ({ label, data }) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      <label htmlFor="">{label}</label>
      <div className="p-3 flex items-center gap-2  bg-white drop-shadow-sm rounded">
        {data?.map((item) => (
          <input
            key={item}
            type="text"
            value={item}
            readOnly
            className="p-1 text-xs w-24 outline-none cursor-pointer  bg-oaksyellow active:outline-none text-white"
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayInput;
