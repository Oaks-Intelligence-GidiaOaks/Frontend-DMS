import React, { useEffect, useRef, useState } from "react";
import {
  FormInput,
  FormInputDropDown,
  FormInputNumber,
} from "../../components/form";
import { AllStates, lgasByState } from "../../data/form/states";
import { allLgasByState } from "../../data/form/allLgasByState";
import { IdTypes } from "../../data/form/others";
import axios from "axios";
import FormMultipleSelect from "../../components/form/FormMultipleSelect";
import { useAuth } from "../../context";
import { EditNote, Email } from "@mui/icons-material";
import { RingsCircle } from "../../components/reusable";

const AddTeamLead = () => {
  const { user } = useAuth();
  let avaterRef = useRef(null);

  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    idNo: "",
    idType: "",
  });
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [identityImage, setIdentityImage] = useState(null);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(null);
  const [lgaRoutes, setLgaRoutes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stateValues, setStateValues] = useState([]);

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  useEffect(() => {
    axios
      .get(`lga_routes`)
      .then((res) => setLgaRoutes(res.data.data))
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
          setAvatar(result);
        }
      };

      fileReader.readAsDataURL(image);
    }

    if (file) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setIdentityImage(result);
        }
      };

      fileReader.readAsDataURL(file);
    }
  }, [image, file]);

  let coveredLgas = lgaRoutes && lgaRoutes.map((it) => it.lga);

  let lgasArr = [];

  states.length > 0 &&
    states.map((item) => {
      allLgasByState[item.value]
        .filter((item) => !coveredLgas.includes(item.value))
        .map((i) => lgasArr.push(i));
    });

  const resetForm = () => {
    setFormFields({
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      idNo: "",
      idType: "",
    });

    setStates([]);
    lgasArr = [];
    setLgas([]);
    setStateValues([]);
    setIdentityImage(null);
    setAvatar(null);
    setUserCreated(true);
    setIsLoading(false);
  };

  const handleStateChange = (selectedOptions) => {
    setStates(selectedOptions);
    setLgas([]);
  };

  const handleLgaChange = (selectedOptions) => {
    setLgas(selectedOptions);
  };

  const handleIdTypeChange = (selectedValue) => {
    setFormFields((prev) => ({ ...prev, idType: selectedValue }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file.type.match(imageMimeType)) {
      alert("image mime type is not valid");
      return;
    }

    setFile(file);
  };

  const handleAvaterSelect = (e) => {
    let selectedFile = e.target.files[0];

    if (!selectedFile.type.match(imageMimeType)) {
      alert("image mime type is not valid");
      return;
    }

    setImage(selectedFile);
  };

  const handlePhotoClick = () => {
    avaterRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, tel, idNo, idType } = formFields;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !tel ||
      !idNo ||
      !idType ||
      !identityImage ||
      !avatar ||
      !states ||
      !lgas
    ) {
      setError("Please input all fields");

      return;
    }

    let transformedStates = states.map((st) => st.value);

    let transformedLgas = lgas.map((l) => l.value);

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", tel);
    formData.append("identityType", idType);
    formData.append("identity", idNo);
    formData.append("identityImage", identityImage);
    formData.append("avatar", avatar);
    formData.append("role", "team_lead");

    // Append list items to form data
    transformedLgas.forEach((lga) => formData.append("LGA", lga));
    transformedStates.forEach((state) => formData.append("states", state));

    try {
      setIsLoading(true);
      axios
        .post("user/new", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((user) => {
          if (!user) {
            console.log("error while creating user");
          } else {
            resetForm();
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setError("could not complete registration, try again...");
        });
    } catch (err) {
      setError("Error occured, Please check your network connection");
    }
  };

  return (
    <div className="lg:w-4/5 mx-auto py-6 text-sm">
      <div className="mt-3 mb-4 ">
        <p className="text-base font-bold">Create new Team Lead profile</p>
      </div>

      <div className="mx-auto w-fit">
        <img
          src={avatar}
          alt="img"
          className="h-44 w-44 rounded-full bg-green-200"
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
          <span className="">Add photo</span>
          <EditNote />
        </p>
      </div>

      <form action="" className="lg:w-5/6" onSubmit={handleSubmit}>
        <FormInput
          placeholder="First name"
          label="First name"
          value={formFields.firstName}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <FormInput
          placeholder="Last name"
          label="Last name"
          value={formFields.lastName}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <FormInput
          placeholder="Email"
          label="Email address"
          value={formFields.email}
          type={Email}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <FormInputNumber
          label="Contact number"
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, tel: e.target.value }))
          }
          placeholder="090 26***"
          value={formFields.tel}
        />

        <FormMultipleSelect
          label="States"
          data={AllStates}
          index="z-30"
          onChange={handleStateChange}
        />

        {states.length > 0 && (
          <FormMultipleSelect
            label="LGAs"
            onChange={handleLgaChange}
            data={lgasArr}
            index="z-20"
          />
        )}

        <FormInputDropDown
          label="Identification(ID) type"
          data={IdTypes}
          index="z-10"
          value={formFields.idType}
          onChange={handleIdTypeChange}
        />

        <FormInputNumber
          placeholder="ID number"
          label="Identification(ID) Number"
          value={formFields.image}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, idNo: e.target.value }))
          }
        />

        <input
          type="file"
          name=""
          id=""
          onChange={handleImageSelect}
          accept="image/*"
        />

        <div className="h-32 w-full rounded-lg bg-white drop-shadow-md">
          {identityImage && (
            <img
              src={identityImage}
              alt="file data url"
              className="h-full w-full bg-black"
            />
          )}
        </div>

        {userCreated && (
          <p className="p-2 my-3 flex items-center justify-between rounded bg-green-500">
            <span className="text-white text-xs">
              Team lead created successfully..
            </span>

            <span
              onClick={() => setUserCreated(false)}
              className="rounded-full w-6 h-6 text-center bg-white cursor-pointer"
            >
              x
            </span>
          </p>
        )}

        {error && (
          <p className="p-2 my-3 flex items-center justify-between rounded bg-white">
            <span className="text-red-500 text-xs">{error}</span>

            <span
              onClick={() => setError(null)}
              className="rounded-full w-6 h-6 text-center bg-white cursor-pointer"
            >
              x
            </span>
          </p>
        )}

        <button className="w-full mt-4 text-white grid place-items-center p-3 rounded bg-oaksgreen">
          {isLoading ? <RingsCircle /> : "Submit"}
        </button>
      </form>
    </div>
  );
  ``;
};

export default AddTeamLead;
