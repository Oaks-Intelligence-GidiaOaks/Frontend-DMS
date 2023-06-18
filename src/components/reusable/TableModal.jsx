import React from "react";

const TableModal = ({ text, closeModal }) => {
  return (
    <div className="">
      <div className="w-[12rem] border my-auto h-32 p-4 bg-white rounded">
        <p className="p-2 py-4">{text}</p>

        <div
          className="bg-blue-500 ml-auto cursor-pointer rounded p-2 w-12 text-white"
          onClick={closeModal}
        >
          <span>close</span>
        </div>
      </div>
    </div>
  );
};

export default TableModal;
