import React from "react";

const FormInput = ({ placeholder, label, value, onChange }) => (
  <div className="flex flex-col gap-2 py-3">
    <label htmlFor="">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="p-3 active:outline-none border-none outline-none rounded bg-white drop-shadow-sm text-gray-500"
    />
  </div>
);

export default FormInput;
