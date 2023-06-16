import { useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import oaksLogo from "../assets/oaks-logo.svg";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { base_url } from "../lib/paths";
import { Rings } from "react-loader-spinner";
import secureLocalStorage from "react-secure-storage";
import { useApp } from "../context";

function EnumeratorLogin() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useAuth();
  const { secureLocalStorage } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    userId: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    userId: "",
    password: "",
  });
  const [errorResponse, setErrorResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorResponse("");
    setFieldErrors({ email: "", password: "" });

    // let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let errorFound = false;

    // Check if user ID has value or valid
    if (!loginForm.userId.length || loginForm.userId.length < 6) {
      errorFound = true;
      setFieldErrors((prev) => ({
        ...prev,
        userId: "Please enter valid user ID. User ID field is required.",
      }));
    }

    // Check password value

    if (!loginForm.password.length) {
      errorFound = true;
      setFieldErrors((prev) => ({
        ...prev,
        password: "Password is empty.",
      }));
    }
    if (loginForm.password.length > 0 && loginForm.password.length < 6) {
      errorFound = true;
      setFieldErrors((prev) => ({
        ...prev,
        password: "Please enter valid password.",
      }));
    }

    // Check error messages
    if (errorFound) return;

    const data = {
      id: loginForm.userId,
      password: loginForm.password,
    };

    // Validate entered email
    if (!errorFound) {
      setFieldErrors({ userId: "", password: "" });
      setIsLoading(true);

      try {
        fetch(`${base_url}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(({ user, ...others }) => {
            if (!user) {
              setIsLoading(false);
              return setErrorResponse(
                "Invalid ID or Password, please try again"
              );
            }

            setIsLoading(false);
            if (others.message === "Invalid Id or password, please try again") {
              return setErrorResponse(
                "Invalid ID or Password, please try again"
              );
            }
            console.log(others);
            if (
              others &&
              others.message &&
              others.message.includes("disabled")
            ) {
              return setErrorResponse(others.message);
            }

            setUser({ ...user, ...others });
            setIsLoggedIn(true);

            if (user.role === "enumerator") {
              secureLocalStorage.setItem("oius", "true");
              secureLocalStorage.setItem(
                "user",
                JSON.stringify({ ...user, ...others })
              );
              navigate("/form");
            }

            if (user.role === "team_lead") {
              secureLocalStorage.setItem("oius", "true");
              secureLocalStorage.setItem(
                "user",
                JSON.stringify({ ...user, ...others })
              );
              navigate("/home");
            }

            if (user.role === "admin" || user.role === "super_admin") {
              secureLocalStorage.setItem("oius", "true");
              secureLocalStorage.setItem(
                "user",
                JSON.stringify({ ...user, ...others })
              );
              navigate("admin/home");
            }
          })
          .catch((error) => {
            setIsLoading(false);
            return setErrorResponse(
              "Can't connect to the server at the moment please check your network and try again."
            );
            console.log("error:", error);
          });
      } catch (err) {
        setIsLoading(false);
        setErrorResponse(
          "Can't connect to the server at the moment please check your network and try again."
        );
        console.log("error:", err);
      }
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto justify-center px-4">
      <div className="flex justify-between max-w-[1280px] mx-auto items-center px-10 lg:px-10 md:px-4 sm:px-4 xs:px-4 py-3">
        <img
          src={oaksLogo}
          alt="Company Logo"
          className="fix-image max-w-[150px] xs:max-w-[120px] sm:max-w-[150px]"
        />
        <p className="text-base xs:text-sm sm:text-base">
          <span className="font-semibold">Data Capture</span> <span>Form</span>
        </p>
      </div>

      <div className="p-8 login-form-shadow rounded-[10px] max-w-[480px] min-w-[240px] mt-8 mx-auto justify-center">
        <div className="w-20 h-20 bg-primary-green mx-auto rounded-full flex items-center justify-center">
          <HiUserCircle width={40} height={40} size={60} color="white" />
        </div>
        <p className="text-center text-4 text-[#555555] mt-3">Welcome back</p>
        <p className="text-center font-bold xl:text-2xl lg:text-xl md:text-lg mt-4">
          Login your account
        </p>
        <form className="flex flex-col mt-4 sm:px-10" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="user-id" className="text-[14px]">
              User ID
            </label>
            <input
              type="text"
              name="user-id"
              id="user-id"
              className="border-[1px] border-solid border-gray-300 p-2 rounded-[4px] mt-1 outline-[#72a247]"
              value={loginForm.userId}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, userId: e.target.value }))
              }
            />
            <p className="text-red-500 text-xs mt-1">{fieldErrors.userId}</p>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="text-[14px]">
              Password
            </label>
            <div className="flex border-[1px] border-solid border-gray-300 mt-1 rounded-[4px] overflow-visible">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=""
                className="flex-1 p-2 rounded-tl-[4px] rounded-bl-[4px] outline-[#72a247]"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <button
                onClick={handleShowPassword}
                className="basis-[50px] items-center justify-center text-sm border-l-[1px] border-solid border-gray-300 rounded-none"
              >
                <span className="text-[10px]">
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </button>
            </div>
            <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
          </div>
          <p className="text-red-500 text-xs mt-7">{errorResponse}</p>

          <button
            type="submit"
            className="mt-7 bg-primary-green text-white rounded-[4px] flex items-center justify-center"
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
              <span className="block p-2 text-[14px]">Login</span>
            )}
          </button>
        </form>
      </div>
      <p className="mt-10 text-center text-xs md:text-sm">
        &copy; {new Date().getFullYear()} All Rights Reserved. Oaks
        Intelligence.
      </p>
    </div>
  );
}

export default EnumeratorLogin;
