import React, { useEffect, useState } from "react";
import { EditNote } from "@mui/icons-material";
import { DisplayInput, FormInput } from "../../components/form";
import axios from "axios";
import { useAuth } from "../../context";

const Profile = () => {
  const { user } = useAuth();

  console.log(user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("me")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
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

        <form action="" className="flex-1 lg:pr-16" onSubmit={handleSubmit}>
          <FormInput placeholder="Maria" label="First name" />
          <FormInput placeholder="Grey" label="Last name" />
          <FormInput placeholder="mariagrey@demo.com" label="Email" />
          <FormInput placeholder="+234 81674***" label="Contact number" />

          <DisplayInput label="State" data={user.state} />
          <DisplayInput label="LGA" data={user.LGA} />

          <input
            type="submit"
            value="Update"
            className="w-full mt-4 text-white p-3 rounded bg-oaksgreen cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
