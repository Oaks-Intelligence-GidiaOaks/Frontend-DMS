import React, { useEffect, useRef, useState } from "react";
import { EditNote } from "@mui/icons-material";
import { FormInput } from "../../components/form";
import { useAuth } from "../../context";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const avaterRef = useRef(null);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(user.avarter.url);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phoneNumber) {
      setError("Please fill all form fields...");
      return;
    }

    const updatedUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      id: user.id,
      role: user.role,
      states: [],
      LGA: [],
    };

    console.log(updatedUser);

    // try {
    //   axios
    //     .put(`me/update`, updatedUser)
    //     .then((res) => {
    //       if (res.data) {
    //         console.log(res.data);
    //         setSuccess("Successfully updated profile");
    //       } else {
    //         setSuccess("Error updating profile");
    //       }
    //     })
    //     .catch((err) => console.error(err));
    // } catch (err) {
    //   console.error(err);
    // }
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
      <div className="flex flex-col lg:flex-row gap-6 mt-6 text-sm">
        <div className="mx-auto">
          <img
            src={imageUrl}
            alt="avatar img"
            className="h-44 w-44 rounded-full bg-green-500"
          />

          <p
            onClick={handlePhotoClick}
            className="flex cursor-pointer justify-center items-center py-3"
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

        <form action="" onSubmit={handleSubmit} className="flex-1 lg:pr-16">
          <FormInput
            readOnly
            value={user.firstName}
            placeholder="Maria"
            label="First name"
          />
          <FormInput
            readOnly
            value={user.lastName}
            placeholder="Grey"
            label="Last name"
          />
          <FormInput
            readOnly
            value={user.email}
            placeholder="mariagrey@demo.com"
            label="Email"
          />
          <FormInput
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+234 81674***"
            label="Contact number"
          />

          {error && (
            <div className="p-2 px-4 rounded flex items-center justify-between bg-white">
              <span className="text-red-500">{error}</span>

              <span
                onClick={() => setError(null)}
                className="h-6 w-6 bg-gray-400 rounded-full text-white cursor-pointer grid place-items-center"
              >
                x
              </span>
            </div>
          )}

          {success && (
            <div className="p-2 px-4 rounded flex items-center justify-between bg-white">
              <span className="text-green-500">{success}</span>

              <span
                onClick={() => setSuccess(null)}
                className="h-6 w-6 bg-gray-400 rounded-full text-white cursor-pointer grid place-items-center"
              >
                x
              </span>
            </div>
          )}

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
