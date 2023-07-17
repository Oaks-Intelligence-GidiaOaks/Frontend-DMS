import React, { useContext } from "react";
import { useState } from "react";
import { BiLock } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useAuth } from "../../context";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import EnumeratorFormContext from "../../context/enumeratorFormContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  // const { logOut } = useContext(EnumeratorFormContext);
  const [form, setForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState();

  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { oldPassword, password, confirmPassword } = form;
    if (oldPassword.trim().length < 6) {
      setError((prev) =>
        prev.length
          ? prev + "--" + "Old password cannot be less than 6 characters."
          : "Old password cannot be less than 6 characters."
      );
    }
    if (password !== confirmPassword) {
      setError((prev) =>
        prev.length
          ? prev + "--" + "Both passwords do not match."
          : "Both passwords do not match."
      );
    }
    if (confirmPassword.trim().length < 6) {
      setError((prev) =>
        prev.length
          ? prev + "--" + "Password cannot be less than 6 characters."
          : "Password cannot be less than 6 characters."
      );
    }
    if (
      confirmPassword.trim().length >= 6 &&
      password === confirmPassword &&
      confirmPassword.trim().length >= 6
    ) {
      setIsLoading(true);
      try {
        axios
          .put(
            user?.role === "enumerator"
              ? "password/update/enumerator"
              : "password/update",
            {
              oldPassword: oldPassword,
              password: password,
              confirmPassword: confirmPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setSuccessMessage("Password changed successfully");
              setTimeout(() => logOut(), 3000);
            }
          })
          .catch((err) => {
            if (err.response.data.message === "old password do not match") {
              setError("Old password is not correct.");
            } else {
              setError(
                "Error changing your password, please check your network and try again."
              );
            }
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        setIsLoading(false);
        setError(
          "Error changing your password, please check your network and try again."
        );
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 flex backdrop-blur-sm z-20 w-screen max-h-screen justify-center overflow-y-scroll py-[10vh] xs:py-0 sm:py-[10vh]">
      <div className="flex flex-col gap-2 h-fit profile-bg bg-[#72a247] min-w-[280px] max-w-[640px] sm:min-w-[360px] xs:w-screen mx-3 xs:mx-0 sm:mx-3 rounded-[10px] xs:rounded-none sm:rounded-[10px] shadow-2xl">
        <div className="p-8 rounded-[10px] max-w-[480px] min-w-[240px] mt-8 mx-auto justify-center">
          <div className="w-20 h-20 bg-white mx-auto rounded-full flex items-center justify-center">
            <BiLock width={40} height={40} size={60} color="#72a247" />
          </div>
          <p className="text-center text-4 text-[#efefef] mt-5 sm:mt-3">
            There's just one more thing left to do....
          </p>
          <p className="text-center text-white font-bold xl:text-2xl lg:text-xl md:text-lg mt-6 sm:mt-4">
            Change Account Password
          </p>
          {/* Form */}
          <div className="flex sm:min-w-[30vw] flex-col mt-10 sm:mt-4 sm:px-10">
            <div className="flex flex-col mt-4">
              <label htmlFor="password" className="text-[14px] text-white">
                Old Password
              </label>
              <div className="flex border-[1px] border-solid border-gray-300 mt-1 rounded-[4px] overflow-visible">
                <input
                  id="password"
                  type={showOldPassword ? "text" : "password"}
                  name="old-password"
                  placeholder=""
                  className="flex-1 p-2 rounded-tl-[4px] rounded-bl-[4px] outline-[#72a247]"
                  value={form.oldPassword}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={handleShowOldPassword}
                  className="basis-[50px] items-center justify-center text-sm border-l-[1px] border-solid border-gray-300 rounded-none"
                >
                  <span className="text-[10px] text-white">
                    {showOldPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </div>
              <p className="text-red-500 text-xs mt-1"></p>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="password" className="text-[14px] text-white">
                New Password
              </label>
              <div className="flex border-[1px] border-solid border-gray-300 mt-1 rounded-[4px] overflow-visible">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=""
                  className="flex-1 p-2 rounded-tl-[4px] rounded-bl-[4px] outline-[#72a247]"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={handleShowPassword}
                  className="basis-[50px] items-center justify-center text-sm border-l-[1px] border-solid border-gray-300 rounded-none"
                >
                  <span className="text-[10px] text-white">
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </div>
              <p className="text-red-500 text-xs mt-1"></p>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="password" className="text-[14px] text-white">
                Confirm New Password
              </label>
              <div className="flex border-[1px] border-solid border-gray-300 mt-1 rounded-[4px] overflow-visible">
                <input
                  id="password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="password"
                  placeholder=""
                  className="flex-1 p-2 rounded-tl-[4px] rounded-bl-[4px] outline-[#72a247]"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={handleShowConfirmPassword}
                  className="basis-[50px] items-center justify-center text-sm border-l-[1px] border-solid border-gray-300 rounded-none"
                >
                  <span className="text-[10px] text-white">
                    {showConfirmPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </div>
              <p className="text-red-500 text-xs mt-1">
                {/* {fieldErrors.password} */}
              </p>
            </div>

            {/* Error messages */}
            <div className="mt-7">
              {error.length > 0 &&
                error.split("--").map((err, i) => (
                  <p key={i} className="flex gap-1 text-red-500 text-xs">
                    <span>•</span>
                    <span>{err}</span>
                  </p>
                ))}
            </div>
            {/* Success message */}
            <div className="mt-7">
              {successMessage && successMessage.length > 0 && (
                <p className="flex gap-1 text-white text-xs">
                  <span>•</span>
                  <span>{successMessage}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-7 bg-transparent border border-solid rounded-[4px] flex items-center justify-center hover:bg-[#FFAD10] duration-200 ease-in-out hover:border-none hover:scale-110 hover:shadow-lg"
              onClick={handleSubmit}
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
                <span className="block p-2 text-[14px] text-white">
                  Change Password
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
