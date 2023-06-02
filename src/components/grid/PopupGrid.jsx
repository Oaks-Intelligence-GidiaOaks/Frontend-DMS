import React, { useState } from "react";
import { usePopper } from "react-popper";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaKey } from "react-icons/fa";

const PopUpGrid = ({
  selectedRow,
  deleteRow,
  closeModal,
  setPopperElement,
  popperStyles,
  popperAttributes,
  handleEditRow,
  row,
  selectedRowInfo,
  resetPassword,
}) => {
  const handleEditClick = () => {
    closeModal();
    handleEditRow(row.original);
  };

  const cancelDelete = () => {
    closeModal();
    setPopperElement(null);
  };

  const handleSeeMoreClick = (row) => {
    closeModal();
    console.log(row);
    // Perform any necessary actions with the selectedRowInfo data
  };

  const handleResetPasswordClick = () => {
    const { email } = row.original;
    console.log("Reset password for email:", email);
    closeModal();
    resetPassword(email);
  };

  return (
    <div className="" style={popperStyles.popper} {...popperAttributes.popper}>
      <div className="bg-gray-200 p-1 rounded shadow">
        <div className="flex flex-col w-[90px]">
          <button
            onClick={handleEditClick}
            className="text-[10px] leading-[12px] font-medium whitespace-nowrap flex items-center justify-center"
          >
            Edit
            <HiOutlinePencilAlt />
          </button>
          <button
            onClick={handleResetPasswordClick}
            className="text-[10px] leading-[24px] font-medium flex items-center justify-center"
          >
            Reset password
            {/* <FaKey /> */}
          </button>

          {/* <button
            onClick={() => handleSeeMoreClick(row.original)}
            className="text-[10px] leading-[24px] font-medium text-[#00BCD4]"
          >
            See more
          </button> */}
          <button
            onClick={deleteRow}
            className="text-[#FA0D0D] text-[10px] leading-[24px] font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpGrid;
