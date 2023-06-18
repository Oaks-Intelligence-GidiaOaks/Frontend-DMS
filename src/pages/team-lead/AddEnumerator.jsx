import React, { useEffect, useState } from "react";
import {
  FormInput,
  FormInputDropDown,
  FormInputNumber,
  FormMultipleSelect,
} from "../../components/form";
import { IdTypes } from "../../data/form/others";
import axios from "axios";
import { useAuth } from "../../context";
import { useLocation } from "react-router-dom";
import { RingsCircle } from "../../components/reusable";

const AddEnumerator = () => {
  const { user } = useAuth();

  const location = useLocation();

  let totalEnumerators = location.state?.totalEnumerators;
  let recentlyAdded = location.state?.newlyAdded;

  const teamLeadStates = user.states.map((st) => ({ label: st, value: st }));
  const teamLeadLgas = user.LGA.map((st) => ({ label: st, value: st }));

  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    idNo: "",
    idType: "",
  });

  const [state, setState] = useState(null);
  const [lga, setLga] = useState(null);

  const [image, setImage] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let fileReader,
      isCancel = false;

    if (image) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        const { result } = e.target;

        if (result && !isCancel) {
          setFileDataUrl(result);
        }
      };

      fileReader.readAsDataURL(image);
    }
  }, [image]);

  const resetForm = () => {
    setFormFields({
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      idNo: "",
      idType: "",
    });

    setState(null);
    setLga(null);
    setImage(null);
    setFileDataUrl(null);
    setUserCreated(true);
    setIsLoading(false);
  };

  const handleStateChange = (selectedValue) => {
    setState(selectedValue);
    setLga(null);
  };

  const handleLgaChange = (selectedValue) => {
    setLga(selectedValue.map((item) => item.value));
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

    setImage(file);
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
      !fileDataUrl ||
      !state ||
      !lga
    ) {
      setError("Error in form fields, please input all fields");

      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber: tel,
      identityType: idType,
      identity: idNo,
      state: state,
      LGA: lga,
      identityImage: fileDataUrl,
    };

    let bodyFormData = new FormData();

    bodyFormData.append("firstName", newUser.firstName);
    bodyFormData.append("lastName", newUser.lastName);
    bodyFormData.append("email", newUser.email);
    bodyFormData.append("phoneNumber", newUser.phoneNumber);
    bodyFormData.append("identityType", newUser.identityType);
    bodyFormData.append("identity", newUser.identity);
    bodyFormData.append("state", newUser.state);
    bodyFormData.append("LGA", newUser.LGA);
    bodyFormData.append("identityImage", newUser.identityImage);

    // console.log(newUser);

    try {
      setIsLoading(true);
      axios
        .post(`enumerator/new`, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          resetForm();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="lg:w-4/5 mx-auto py-6 text-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center text-xs gap-6 bg-white p-2 rounded">
          <p>Total Enumerators</p>
          <p className="p-2 bg-gray-100 rounded">{totalEnumerators}</p>
        </div>

        {/* recently added */}
        <div className="flex items-center text-xs gap-6 bg-white p-2 rounded">
          <p>Recently added</p>
          <p className="p-2 bg-gray-100 rounded">{recentlyAdded}</p>
        </div>
      </div>

      <div className="mt-6 mb-4 ">
        <p className="text-base font-bold">Create new Enumerator profile</p>
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
          type="email"
          label="Email address"
          value={formFields.email}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <FormInputNumber
          placeholder="090 26******"
          label="Contact number"
          value={formFields.tel}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, tel: e.target.value }))
          }
        />

        <FormInputDropDown
          label="State"
          data={teamLeadStates}
          index="z-30"
          onChange={handleStateChange}
        />

        <FormMultipleSelect
          label="LGA"
          onChange={handleLgaChange}
          data={teamLeadLgas}
          index="z-20"
        />

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
          value={formFields.idNo}
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

        <div className="h-24 w-full rounded-lg bg-white drop-shadow-md">
          {fileDataUrl && (
            <img
              src={fileDataUrl}
              alt="file data url"
              className="h-full w-full bg-black"
            />
          )}
        </div>

        {userCreated && (
          <p className="p-2 my-3 flex items-center justify-between rounded bg-green-500">
            <span className="text-white text-xs">
              Enumerator created successfully..
            </span>

            <span
              onClick={() => setUserCreated(false)}
              className="rounded-full w-6 h-6 text-center bg-white "
            >
              x
            </span>
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-4 grid place-items-center text-white p-3 rounded bg-oaksgreen"
        >
          {isLoading ? <RingsCircle /> : `Submit`}
        </button>
      </form>
    </div>
  );
};

export default AddEnumerator;
