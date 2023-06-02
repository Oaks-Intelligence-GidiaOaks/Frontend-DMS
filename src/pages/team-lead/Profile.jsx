import React from "react";
import { EditNote } from "@mui/icons-material";
import { DisplayInput, FormInput } from "../../components/form";

const Profile = () => {
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-full sm:mx-6 mt-6 lg:mx-auto lg:w-[90%]">
      <div className="flex items-center gap-6">
        <div className="rounded bg-white p-3 flex items-center gap-3 text-xs">
          <p className="">Total submissions</p>
          <p className="rounded p-1  bg-white">585</p>
        </div>

        <div className="rounded bg-white p-3 flex items-center gap-3 text-xs">
          <p className="">No response</p>
          <p className="rounded p-1  bg-white">52</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6 text-sm">
        <div className="mx-auto">
          <img src="" alt="" className="h-44 w-44 rounded-full bg-green-500" />

          <p className="border flex justify-center items-center py-3">
            <span className="">Edit photo</span>
            <EditNote />
          </p>
        </div>

        <form action="" className="flex-1 lg:pr-16">
          <FormInput placeholder="Maria" label="First name" />
          <FormInput placeholder="Grey" label="Last name" />
          <FormInput placeholder="mariagrey@demo.com" label="Email" />
          <FormInput placeholder="+234 81674***" label="Contact number" />
          <FormInput placeholder="" label="State" />
          <FormInput placeholder="Maria" label="LGA" />
          <DisplayInput label="State" data={["Lagos", "Delta", "Abia"]} />
          <DisplayInput
            label="LGA"
            data={["Eti-osa", "Isoko North", "Arochukwu"]}
          />

          <input
            type="submit"
            value="Update"
            className="w-full mt-4 text-white p-3 rounded bg-oaksgreen cursor-pointer"
            onClick={handleClick}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
