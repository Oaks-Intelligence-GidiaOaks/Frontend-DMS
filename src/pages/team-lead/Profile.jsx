import React, { useEffect, useState } from "react";
import { EditNote } from "@mui/icons-material";
import {
  DisplayInput,
  FormInput,
  FormMultipleSelect,
} from "../../components/form";
import axios from "axios";
import { useAuth } from "../../context";
import Select from "react-select";

const Profile = () => {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(user.email);
  const [states, setStates] = useState(user.states);
  const [lgas, setLgas] = useState(user.LGA);

  const handleStatesChange = (selectedOptions) => {
    setStates(selectedOptions.map((item) => item.value));
  };
  console.log(states);

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
          <FormInput
            placeholder="Maria"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label="First name"
          />
          <FormInput
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Grey"
            label="Last name"
          />
          <FormInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mariagrey@demo.com"
            label="Email"
          />
          <FormInput
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+234 81674***"
            label="Contact number"
          />

          {/* <FormMultipleSelect
            defaultValue={states}
            index="z-10"
            // data={states.map((item) => ({ label: item, value: item }))}
            label="State"
            onChange={handleStatesChange}
          /> */}

          <DisplayInput label="States" data={user.states} />
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
