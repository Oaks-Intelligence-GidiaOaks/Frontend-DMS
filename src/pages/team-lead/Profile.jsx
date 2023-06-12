import React, { useEffect, useRef, useState } from "react";
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

  const avaterRef = useRef(null);

  const [submissionRate, setSubmissionRate] = useState(null);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [identityType, setIdentityType] = useState(user.identityType);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(user.email);
  const [states, setStates] = useState(user.states);
  const [lgas, setLgas] = useState(user.LGA);
  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState(user.avarter.url);

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  let submitted = submissionRate ? submissionRate.submited : 0;
  let noResponse = submissionRate ? submissionRate.notSubmited : 0;

  useEffect(() => {
    axios
      .get(`team_lead_dashboard/submission_rate`)
      .then((res) => {
        setSubmissionRate(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let fileReader,
      isCancel = false;

    if (image) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageUrl(result);
        }
      };

      fileReader.readAsDataURL(image);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: user.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      identity,
      identityImage,
      avatar: imageUrl,
      states: states,
      LGA: lgas,
      role: "team_lead",
    };

    let bodyFormData = new FormData();

    bodyFormData.append("firstName", newUser.firstName);
    bodyFormData.append("lastName", newUser.lastName);
    bodyFormData.append("email", newUser.email);
    bodyFormData.append("phoneNumber", newUser.phoneNumber);
    bodyFormData.append("identityType", newUser.identityType);
    bodyFormData.append("identity", newUser.identity);
    bodyFormData.append("identityImage", newUser.identityImage);

    bodyFormData.append("state", newUser.state);
    bodyFormData.append("LGA", newUser.LGA);
    bodyFormData.append("avarter", newUser.avarter);
  };

  const handlePhotoClick = () => {
    avaterRef.current.click();
  };

  const handleAvaterSelect = (e) => {
    let selectedFile = e.target.files[0];

    if (!selectedFile.type.match(imageMimeType)) {
      alert("image mime type is not valid");
      return;
    }

    setImage(selectedFile);
  };

  return (
    <div className="h-full sm:mx-6 mt-6 lg:mx-auto lg:w-[90%]">
      <div className="flex items-center gap-6">
        <div className="rounded bg-white p-3 flex items-center gap-3 text-xs">
          <p className="">Total submissions</p>
          <p className="rounded p-1  bg-white">{submitted}</p>
        </div>

        <div className="rounded bg-white p-3 flex items-center gap-3 text-xs">
          <p className="">No response</p>
          <p className="rounded p-1  bg-white">{noResponse}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6 text-sm">
        <div className="mx-auto">
          <img
            src={imageUrl}
            alt="avarter Img"
            className="h-44 w-44 rounded-full bg-green-500"
          />

          <p
            onClick={handlePhotoClick}
            className="flex justify-center cursor-pointer items-center py-3"
          >
            <input
              type="file"
              name=""
              className="hidden"
              ref={avaterRef}
              onChange={handleAvaterSelect}
              id=""
              accept="image/*"
            />
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
