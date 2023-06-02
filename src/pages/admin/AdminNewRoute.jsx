import React, { useState } from "react";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FormInputDropDown, FormInputEditable } from "../../components/form";

const AdminNewRoute = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="lg:w-3/5 lg:pl-16">
      <div className="my-6">
        <h2 className="text-sm font-bold ">Create New LGA Route</h2>
      </div>

      <form
        action=""
        className="border w-full px-2"
        onSubmit={handleFormSubmit}
      >
        <FormInputDropDown label="State" options={[]} index="z-20" />

        <FormInputDropDown label="LGA" options={[]} index="z-10" />

        <FormInputEditable label="Route 1 (Start)" value="Oshodi" />

        <FormInputEditable label="Route 1 (End)" value="Ibeju Lekki" />

        <FormInputEditable label="Route 2 (Start)" value="Dangote refinery" />
        <FormInputEditable label="Route 2 (End)" value="Munshin" />
        <FormInputEditable label="Route 3 (Start)" value="Unilag" />
        <FormInputEditable label="Route 3 (End)" value="MyTwo" />

        <button
          className="bg-oaksgreen w-full text-xs mx-2 text-white p-3 
        my-6 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AdminNewRoute;
