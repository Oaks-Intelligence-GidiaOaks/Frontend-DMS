import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "Abia", label: "Abia" },
  { value: "Adamawa", label: "Adamawa" },
  { value: "Akwa-Ibom", label: "Akwa-Ibom" },
  { value: "Bauchi", label: "Bauchi" },
  { value: "Bayelsa", label: "Bayelsa" },
];

const FormInputDropDown = ({ label, data, index, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (selectedOption) => {
    setValue(selectedOption);
    onChange(selectedOption.value);
  };

  return (
    <div className="flex flex-col gap-2 py-3 px-2 text-sm">
      <label htmlFor="">{label}</label>

      <div
        className={`w-full ${index} bg-white text-xs rounded drop-shadow-sm`}
      >
        <Select options={data} value={value} setValue={setValue} onChange={handleChange} />
      </div>
    </div>
  );
};

export default FormInputDropDown;
