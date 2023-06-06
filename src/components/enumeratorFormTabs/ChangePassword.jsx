import React from "react";
import { useState } from "react";
import { BiLock } from "react-icons/bi";
import { HiOutlineArrowLeft } from "react-icons/hi";

const ChangePassword = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-0 left-0 flex backdrop-blur-sm z-20 w-screen h-screen justify-center overflow-y-scroll py-[10vh] xs:py-0 sm:py-[10vh]">
      <div className=" flex flex-col gap-2 profile-bg min-w-[280px] max-w-[640px] sm:min-w-[360px] xs:w-screen mx-3 xs:mx-0 sm:mx-3 rounded-[10px] xs:rounded-none sm:rounded-[10px] overflow-hidden shadow-2xl">
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
          <form
            className="flex flex-col mt-10 sm:mt-4 sm:px-10"
            onSubmit={handleSubmit}
          >
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
                  type={showPassword ? "text" : "password"}
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
            {/* <p className="text-red-500 text-xs mt-7">{errorResponse}</p> */}

            <button
              type="submit"
              className="mt-7 bg-transparent text-white border border-solid border-white rounded-[4px] flex items-center justify-center hover:bg-[#FFAD10] duration-200 ease-in-out hover:border-none hover:scale-110 hover:shadow-lg"
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
                <span className="block p-2 text-[14px]">Change Password</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
