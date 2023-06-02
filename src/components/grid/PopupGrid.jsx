
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import axios from "axios";

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
  toggleDisable,
}) => {
  const handleEditClick = () => {
    closeModal();
    handleEditRow(row.original);
    console.log(row.original);
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

  const handleToggleDisable = () => {
    toggleDisable(row.original._id);
  };


  return (
    <div className="" style={popperStyles.popper} {...popperAttributes.popper}>
      <div className="bg-gray-200 p-1 rounded shadow">
        <div className="flex flex-col w-[90px]">
          <button
            onClick={handleEditClick}
            className="text-[10px] leading-[24px] font-medium whitespace-nowrap flex items-center justify-center"
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

          <button
            onClick={() => handleToggleDisable(row.original._id)}
            className="text-[#FA0D0D] text-[10px] leading-[24px] font-medium"
          >
            {row.original.disabled ? "Enable" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpGrid;
