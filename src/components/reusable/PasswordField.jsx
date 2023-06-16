import React from "react";

const PasswordField = ({ onChange, label, value }) => {
  return (
    <div className="flex flex-col mt-4">
      <label htmlFor="password" className="text-[14px]">
        {label}
      </label>
      <div className="flex border-[1px] border-solid border-gray-300 mt-1 rounded-[4px] overflow-visible">
        <input
          id="password"
          // type={true ? "text" : "password"}
          placeholder=""
          className="flex-1 p-2 rounded-tl-[4px] rounded-bl-[4px] outline-[#72a247]"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PasswordField;
