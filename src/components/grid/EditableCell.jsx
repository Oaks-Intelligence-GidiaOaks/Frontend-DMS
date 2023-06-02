import React, { useState, useEffect } from "react";

const EditableCell = (
  { value: initialValue, row: { index }, column: { id }, updateMyData, edit },
  props
) => {
  const [value, setValue] = useState(initialValue);

  const [allHeaders, setAllHeaders] = useState([]);
  const [isDisabled, setIsDisabled] = useState("");

  const arrayHeaders = [
    { name: "email" },
    { name: "identityType" },
    { name: "identity" },
    { name: "state" },
    { name: "LGA" },
    { name: "id" },
  ];

  useEffect(() => {
    setAllHeaders(id);
    if (
      arrayHeaders.some((item) => {
        if (item.name === id) {
          setIsDisabled(item.name);
        }
      })
    );
  }, []);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
    setIsEditing(false);
    setEditedRow(null);
    setSelectedRow(null);
  };

  return (
    <input
      readOnly={value === "id"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-1 py-1 ${
        id !== isDisabled ? "border border-gray-300" : "border-none"
      }  rounded bg-transparent`}
      disabled={id === isDisabled}
    />
  );
};

export default EditableCell