import React, { useState } from "react";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const FormInputEditable = ({ label, data, readOnly, onChange }) => {
  const [value, setValue] = useState(data);

  // console.log(data);

  const handleChange = (selectedOption) => {
    setValue(selectedOption.target.value);
    onChange(selectedOption.target.value);
  };

  const editField = () => {
    readOnly = false;
  };

  return (
    <div className="p-2 flex flex-col text-sm">
      <label className="my-2" htmlFor="">
        {label}
      </label>

      <div className="bg-white rounded drop-shadow-sm flex border items-center">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="bg-transparent outline-none  text-xs px-3 p-3 xs:w-5/6 flex-1 "
          readOnly={false}
        />

        <div onClick={editField}>
          <IconButton>
            <Edit />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default FormInputEditable;
