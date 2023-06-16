import React, { useEffect, useState } from "react";
import { EditNote } from "@mui/icons-material";
import { IoIosArrowBack } from "react-icons/io";
import { FormInput, FormMultipleSelect } from "../../components/form";
import axios from "axios";
import { useAuth } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { allLgasByState } from "../../data/form/allLgasByState";
import { AllStates } from "../../data/form/allStates";
import { Rings } from "react-loader-spinner";

const TeamLeadProfile = () => {
  const { user } = useAuth();
  let location = useLocation();
  const navigate = useNavigate();
  let formData = location.state;

  console.log(formData);

  const [lgaRoutes, setLgaRoutes] = useState(null);
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [email, setEmail] = useState(formData.email);
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [states, setStates] = useState(formData.states);
  const [lgas, setLgas] = useState([]);

  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let allLgaOptions = [];
  let coveredLgas = lgaRoutes && lgaRoutes.map((it) => it.lga);

  useEffect(() => {
    axios
      .get(`lga_routes`)
      .then((res) => setLgaRoutes(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  states.length > 0 &&
    coveredLgas &&
    states.map((state) =>
      allLgasByState[state].map((l) => allLgaOptions.push(l))
    );

  const resetForm = () => {
    setErrors(null);
    setSuccess(true);
    setFirstName(formData.firstName);
    setLastName(formData.lastName);
    setLgas(formData.lgas);
    setPhoneNumber("");
    setEmail(formData.email);
    setStates(formData.states);
    // setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phoneNumber || !states || !lgas) {
      return setErrors("please fill all form fields...");
    }

    const updatedTeamLead = {
      firstName,
      lastName,
      email,
      phoneNumber,
      states,
      LGA: lgas,
      id: formData.id,
      role: formData.role,
    };

    try {
      setIsLoading(true);

      axios
        .put(`admin/user/${formData._id}`, updatedTeamLead)
        .then((res) => resetForm())
        .catch((err) => console.log(err));
    } catch (err) {
      setErrors("error occured, please check your network..");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatesChange = (selectedOptions) => {
    setStates(selectedOptions.map((it) => it.value));
    setLgas([]);
  };

  const handleLgasChange = (selectedOption) => {
    setLgas(selectedOption.map((it) => it.value));
  };

  return (
    <div className="h-full sm:mx-6 mt-6 lg:mx-auto lg:w-[90%]">
      <div className="flex items-center gap-6">
        <div
          onClick={() => navigate(-1)}
          className="rounded cursor-pointer ml-auto border bg-oaksgreen px-6  lg:ml-auto bg-oaksGreen p-3 flex items-center gap-3 text-xs"
        >
          <div className="p-1 bg-white text-ecnter rounded">
            <IoIosArrowBack />
          </div>
          <p className="text-white">Back</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6 text-sm">
        <div className="mx-auto">
          <img
            src={formData.avatar.url}
            alt=""
            className="h-44 w-44 rounded-full bg-green-500"
          />
        </div>

        <form action="" className="flex-1 lg:pr-16" onSubmit={handleSubmit}>
          <FormInput
            placeholder="Maria"
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormInput
            placeholder="Grey"
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mariagrey@demo.com"
            label="Email"
          />
          <FormInput
            placeholder="+234 81674***"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Contact number"
          />
          <FormMultipleSelect
            defaultValue={formData.states.map((item) => ({
              value: item,
              label: item,
            }))}
            label="State"
            index="z-10"
            onChange={handleStatesChange}
            data={AllStates}
          />
          <FormMultipleSelect
            label="LGA"
            data={allLgaOptions}
            defaultValue={formData.LGA.map((item) => ({
              value: item,
              label: item,
            }))}
            onChange={handleLgasChange}
          />
          {success && (
            <p className="w-full flex items-center  p-3 rounded bg-white px-4 justify-between ">
              <span className="text-green-500 text-xs">
                credential updated successfully...
              </span>

              <span
                className="cursor-pointer h-6 w-6 text-center rounded-full bg-gray-400 text-white"
                onClick={() => setSuccess(null)}
              >
                x
              </span>
            </p>
          )}
          {errors && (
            <p className="w-full flex items-center  p-3 rounded bg-white px-4 justify-between ">
              <span className="text-red-500 text-xs">
                please fill all form fields...
              </span>

              <span
                className="cursor-pointer h-6 w-6 text-center rounded-full bg-gray-400 text-white"
                onClick={() => setErrors(null)}
              >
                x
              </span>
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-4 text-white p-3 rounded bg-oaksgreen cursor-pointer"
          >
            {isLoading ? (
              <Rings
                height="36"
                width="36"
                color="#ffffff"
                radius="6"
                wrapperStyle={{ backgoundColor: "yellow" }}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            ) : (
              " Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamLeadProfile;
