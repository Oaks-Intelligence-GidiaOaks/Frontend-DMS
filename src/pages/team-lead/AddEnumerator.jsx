import React, { useEffect, useState } from "react";
import { FormInput, FormInputDropDown } from "../../components/form";
import { AllStates, lgasByState } from "../../data/form/states";
import { IdTypes } from "../../data/form/others";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { base_url } from "../../lib/paths";
import { base_url_local } from "../../lib/paths";

const AddEnumerator = () => {
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

  let lgaOptions = state ? lgasByState[state] : [];

  useEffect(() => {
    let fileReader,
      isCancel = false;

    if (image) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        const { result } = e.target;

        if (result && !isCancel) {
          setFileDataUrl(result);
          // console.log(result);
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
    setFileDataUrl(null);

    setUserCreated(true);
  };

  const handleStateChange = (selectedValue) => {
    setState(selectedValue);
    setLga(null);
  };

  const handleLgaChange = (selectedValue) => {
    setLga([selectedValue]);
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

    console.log(formFields);

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
      console.log("Error in form fields, please input all fields");

      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      phoneNumber: tel,
      identityType: idType,
      identity: idNo,
      // identityNumber: idNo,
      state,
      LGA: lga,
    };

    console.log(newUser);

    axios
      .post("enumerator/new", newUser)
      .then((user) => {
        if (!user) {
          console.log("error while creating user");
        } else {
          resetForm();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="lg:w-4/5 mx-auto py-6 text-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center text-xs gap-6 bg-white p-2 rounded">
          <p>Total Enumerators</p>
          <p className="p-2 bg-gray-100 rounded">584</p>
        </div>

        {/* recently added */}
        <div className="flex items-center text-xs gap-6 bg-white p-2 rounded">
          <p>Recently added</p>
          <p className="p-2 bg-gray-100 rounded">52</p>
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
          label="Email address"
          value={formFields.email}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <FormInput
          placeholder="090 26******"
          label="Contact number"
          value={formFields.tel}
          onChange={(e) =>
            setFormFields((prev) => ({ ...prev, tel: e.target.value }))
          }
        />

        <FormInputDropDown
          label="State"
          data={AllStates}
          index="z-30"
          onChange={handleStateChange}
        />

        {state && (
          <FormInputDropDown
            label="LGA"
            onChange={handleLgaChange}
            data={lgaOptions.map((i) => ({ value: i, label: i }))}
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

        <FormInput
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

        <input
          type="submit"
          className="w-full mt-4 text-white p-3 rounded bg-oaksgreen"
        />
      </form>
    </div>
  );
};

export default AddEnumerator;
