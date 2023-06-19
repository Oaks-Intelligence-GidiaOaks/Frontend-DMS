import axios from "axios";
import React, { useState } from "react";
import { Rings } from "react-loader-spinner";
import PasswordField from "./PasswordField";

const UpdatePassword = () => {
  const [passwordForm, setPasswordForm] = useState({
    old: "",
    password: "",
    confirm: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const Logout = () => {
    // code for logout
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("oressed");

    const { old, password, confirm } = passwordForm;

    // validate
    if (!old || !password || !confirm) {
      return setError("Please fill all fields...");
    }

    let newLogin = {
      oldPassword: old,
      password,
      confirmPassword: confirm,
    };

    // try {
    //   axios
    //     .put(`password/update`, newLogin)
    //     .then((res) => {
    //       if (res.data.message === "password updated successfully") {
    //         Logout();
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       setError(err.message);
    //     });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="min-h-[100vh] w-[100vw] absolute grid bg-red-500 place-items-center backdrop-blur-sm bg-transparent">
      <div className="border rounded-md h-[500px] w-[300px] p-3 bg-oaksGreen backdrop-blur-lg">
        <form action="" onSubmit={handleSubmit}>
          <PasswordField
            label="Old Password"
            value={passwordForm.old}
            onChange={(e) =>
              setPasswordForm((prev) => ({ ...prev, old: e.target.value }))
            }
          />
          <PasswordField
            label="New Password"
            value={passwordForm.password}
            onChange={(e) =>
              setPasswordForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <PasswordField
            label="Confirm Password"
            value={passwordForm.confirm}
            onChange={(e) =>
              setPasswordForm((prev) => ({ ...prev, confirm: e.target.value }))
            }
          />

          {error && (
            <div className="p-3 rounded flex items-center justify-between">
              <span>{error}</span>
              <span className="h-4 w-4 bg-gray-200 text-center grid place-items-center rounded-full">
                x
              </span>
            </div>
          )}

          <button className="p-2 mt-3 w-full cursor-pointer bg-oaksgreen text-white rounded text-center grid place-items-center">
            {isLoading ? (
              <Rings
                height="30"
                width="30"
                color="#ffffff"
                radius="6"
                wrapperStyle={{ backgoundColor: "yellow" }}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            ) : (
              <span>Change Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
