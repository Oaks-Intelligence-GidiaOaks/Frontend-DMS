import React from "react";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const FormInputEditable = ({ label, value }) => {
  return (
    <div className="p-2 flex flex-col text-sm">
      <label className="my-2" htmlFor="">
        {label}
      </label>

      <div className="bg-white rounded drop-shadow-sm flex border items-center">
        <input
          type="text"
          value={value}
          className="bg-transparent outline-none  text-xs px-3 p-3 xs:w-5/6 flex-1 "
          readOnly={true}
        />

        <div>
          <IconButton>
            <Edit />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default FormInputEditable;
