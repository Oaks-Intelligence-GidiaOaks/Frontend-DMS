import React, { useEffect, useState } from "react";
import { EditNote } from "@mui/icons-material";
import { FormInput, FormMultipleSelect } from "../../components/form";
import axios from "axios";
import { useAuth } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { allLgasByState } from "../../data/form/allLgasByState";

const TeamLeadProfile = () => {
  const { user } = useAuth();
  let location = useLocation();
  const navigate = useNavigate();
  let formData = location.state;

  const [lgaRoutes, setLgaRoutes] = useState(null);
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [email, setEmail] = useState(formData.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [states, setStates] = useState(formData.states);
  const [lgas, setLgas] = useState([]);

  let lgaOptions = [];
  let allLgaOptions = [];
  let coveredLgas = lgaRoutes && lgaRoutes.map((it) => it.lga);

  useEffect(() => {
    axios
      .get(`lga_routes`)
      .then((res) => setLgaRoutes(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  states && states.map((st) => console.log(allLgasByState[st]));

  if (states) {
    // console.log(states);
  }
  if (lgaOptions.length > 0) {
    console.log(lgaOptions);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleStatesChange = (selectedOptions) => {
    setStates(selectedOptions.states);
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

        <div
          onClick={() => navigate(-1)}
          className="rounded cursor-pointer  lg:ml-auto bg-oaksGreen p-3 flex items-center gap-3 text-xs"
        >
          <p className="">Back</p>
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
            label="First name"
            value={firstName}
            onChange={(selectedOption) => setFirstName(selectedOption)}
          />
          <FormInput
            placeholder="Grey"
            label="Last name"
            value={lastName}
            onChange={(selectedOption) => setLastName(selectedOption)}
          />
          <FormInput
            value={email}
            onChange={(selectedOption) => setEmail(selectedOption)}
            placeholder="mariagrey@demo.com"
            label="Email"
          />
          <FormInput placeholder="+234 81674***" label="Contact number" />

          <FormMultipleSelect
            defaultValue={formData.states.map((item) => ({
              value: item,
              label: item,
            }))}
            label="State"
            index="z-10"
            onChange={handleStatesChange}
            data={formData.states.map((item) => ({ value: item, label: item }))}
          />

          <FormMultipleSelect label="LGA" data={user.LGA} />

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

export default TeamLeadProfile;
