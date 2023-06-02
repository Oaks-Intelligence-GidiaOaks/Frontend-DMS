import { useContext, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BiLogOut, BiIdCard, BiError } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { ImBlocked } from "react-icons/im";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail, MdDone, MdOutlineClose } from "react-icons/md";
import LGAController from "../../components/LGAController";
import ProgressBar from "../../components/ProgressBar";
import TabBar from "../../components/TabBar";

import Food from "../../components/enumeratorFormTabs/Food";
import Commodity from "../../components/enumeratorFormTabs/Commodity";
import Transport from "../../components/enumeratorFormTabs/Transport";
import Accomodation from "../../components/enumeratorFormTabs/Accomodation";
import Reports from "../../components/enumeratorFormTabs/Reports";
import oaksLogo from "../../assets/oaks-logo.svg";
import EnumeratorFormContext from "../../context/enumeratorFormContext";
import { useAuth } from "../../context";

function EnumeratorForm() {
  const {
    state: {
      showEnumeratorProfile,
      currentFormTab,
      currentLGA,
      showSavedNotification,
      showSubmissionNotification,
      showDuplicateNotification,
      showErrorNotification,
    },
    showProfile,
    hideProfile,
    saveFormChanges,
    hideSubmissionNotification,
    hideDuplicateNotification,
    hideErrorNotification,
    logOut,
  } = useContext(EnumeratorFormContext);

  const { setUser, user } = useAuth();
  console.log(user);

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });

    return () =>
      window.removeEventListener("beforeunload", function (e) {
        e.preventDefault();
        e.returnValue = "";
      });
  }, []);

  return (
    <div>
      {/* Title Bar */}
      <div className="bg-light-gray">
        <div className="flex justify-between max-w-[1280px] mx-auto items-center px-10 lg:px-10 md:px-4 sm:px-4 xs:px-4 py-3">
          <img
            src={oaksLogo}
            alt="Company Logo"
            className="fix-image max-w-[150px] xs:max-w-[120px] sm:max-w-[150px]"
          />
          <p className="text-base xs:text-sm sm:text-base">
            <span className="font-semibold">Data Capture</span>{" "}
            <span>Form</span>
          </p>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto justify-center">
        {/* Enumerator account */}
        <div className="mx-auto max-w-[1040px] mt-5 pl-3">
          <button
            className="flex gap-3 items-center justify-center px-5 py-2 w-fit profile-btn-bg rounded"
            onClick={() => showProfile()}
          >
            <div className="flex items-center justify-center bg-white rounded-full p-1">
              <FaRegUser size={16} color="#777777" />
            </div>
            <span className="text-white font-medium">
              {user.firstName} {user.lastName}
            </span>
          </button>
        </div>

        {/* Info Bar */}
        <div className="flex flex-wrap gap-y-10 justify-around sm:justify-between items-end mt-10 max-w-[1040px] mx-auto">
          <ProgressBar />
          <div
            className={`flex flex-nowrap gap-5 ${
              user.LGA.length > 1
                ? "justify-center"
                : "justify-end xs:pr-0 sm:pr-3"
            }  max-w-[410px] xs:w-[90%]`}
          >
            {user.LGA.length > 1 && <LGAController />}
            <button
              className="flex justify-center items-center px-3 bg-primary-green py-2 max-w-[170px] rounded"
              onClick={saveFormChanges}
            >
              <span className="text-white text-[14px] ">Save Changes</span>
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="sticky top-0 bg-white z-10 w-full mt-14 xs:mt-4 fix-scrollbar overflow-x-scroll">
          <TabBar />
        </div>

        {/* Form */}
        <div className="min-h-[100vh] bg-white px-4">
          {currentFormTab === "Food" && <Food />}
          {currentFormTab === "Commodity" && <Commodity />}
          {currentFormTab === "Transport" && <Transport />}
          {currentFormTab === "Accomodation" && <Accomodation />}
          {currentFormTab === "Reports" && <Reports />}
        </div>
      </div>

      {/* Saved changes notification */}
      {showSavedNotification && (
        <div className="fixed top-0 left-0 flex backdrop-blur-sm z-20 w-screen h-screen justify-center items-center">
          <div className=" flex flex-col gap-2 px-3 bg-white max-w-[360px] min-w-[240px] pt-10 pb-5 rounded-[10px] login-form-shadow mx-3 xs:w-[90vh]">
            <div className="flex gap-3 justify-center items-center radiant-shadow bg-primary-green w-fit mx-auto p-3 mt-5 mb-10 rounded-full">
              <IoSaveOutline color="white" size={30} />
            </div>
            <p className="text-center font-bold text-xl">Form Changes Saved</p>
            <p className="text-center px-3 xs:px-1 sm:px-3 pt-2">
              Your changes have been saved successfully.
            </p>
          </div>
        </div>
      )}

      {/* Submitted notification */}
      {showSubmissionNotification && (
        <div className="fixed top-0 left-0 flex backdrop-blur-sm z-20 w-screen h-screen justify-center items-center">
          <div className="relative flex flex-col gap-2 px-3 bg-white max-w-[360px] min-w-[240px] pt-10 pb-10 rounded-[10px] login-form-shadow mx-3 xs:w-[90vh]">
            <div
              className="absolute flex justify-center items-center w-6 h-6 top-4 right-4 hover:bg-gray-200 rounded-full transition-all duration-200 cursor-pointer"
              onClick={hideSubmissionNotification}
            >
              <MdOutlineClose size={20} />
            </div>
            <div className="flex gap-3 justify-center items-center radiant-shadow bg-primary-green w-fit mx-auto p-3 mt-5 mb-10 rounded-full">
              <MdDone color="white" size={30} />
            </div>
            <p className="text-center font-bold text-xl">Form Submitted</p>
            <p className="text-center px-3 xs:px-1 sm:px-3 pt-2">
              Your captured data has been successfully submitted. Thanks for
              your contribution.
            </p>
            <div className="mt-5 flex justify-center">
              {user.LGA.length > 1 && <LGAController />}
            </div>
          </div>
        </div>
      )}

      {/* Already Submitted notification */}
      {showDuplicateNotification && (
        <div className="fixed top-0 left-0 flex backdrop-blur-sm z-20 w-screen h-screen justify-center items-center">
          <div className="relative flex flex-col gap-2 px-3 bg-white max-w-[360px] min-w-[240px] pt-10 pb-10 rounded-[10px] login-form-shadow mx-3 xs:w-[90vh]">
            <div
              className="absolute flex justify-center items-center w-6 h-6 top-4 right-4 hover:bg-gray-200 rounded-full transition-all duration-200 cursor-pointer"
              onClick={hideDuplicateNotification}
            >
              <MdOutlineClose size={20} />
            </div>
            <div className="flex gap-3 justify-center items-center radiant-shadow bg-primary-green w-fit mx-auto p-3 mt-5 mb-10 rounded-full">
              <ImBlocked color="white" size={30} />
            </div>
            <p className="text-center font-bold text-xl">
              Form Already Submitted
            </p>
            <p className="text-center px-3 xs:px-1 sm:px-3 pt-2">
              Our records tell us you've already submitted for{" "}
              <span className="font-semibold">{currentLGA} LGA</span> this week.
            </p>
            <div className="mt-5 flex justify-center">
              {user.LGA.length > 1 && <LGAController />}
            </div>
          </div>
        </div>
      )}

      {/* Error notification */}
      {showErrorNotification && (
        <div className="fixed top-0 left-0 flex backdrop-blur-sm z-20 w-screen h-screen justify-center items-center">
          <div className="relative flex flex-col gap-2 px-3 bg-white max-w-[360px] min-w-[240px] pt-10 pb-10 rounded-[10px] login-form-shadow mx-3 xs:w-[90vh]">
            <div
              className="absolute flex justify-center items-center w-6 h-6 top-4 right-4 hover:bg-gray-200 rounded-full transition-all duration-200 cursor-pointer"
              onClick={hideErrorNotification}
            >
              <MdOutlineClose size={20} />
            </div>
            <div className="flex gap-3 justify-center items-center radiant-shadow bg-red-600 w-fit mx-auto p-3 mt-5 mb-10 rounded-full">
              <BiError color="white" size={30} />
            </div>
            <p className="text-center font-bold text-xl">Error</p>
            <p className="text-center px-3 xs:px-1 sm:px-3 pt-2">
              We couldn't submit your form because of an error, please check
              your network and try again.
            </p>
            <div className="mt-5 flex justify-center">
              {user.LGA.length > 1 && <LGAController />}
            </div>
          </div>
        </div>
      )}

      {/* Enumerator Profile */}
      {showEnumeratorProfile && (
        <div className="fixed top-0 left-0 flex backdrop-blur-sm z-20 w-screen h-screen justify-center overflow-y-scroll py-[10vh] xs:py-0 sm:py-[10vh]">
          <div className=" flex flex-col gap-2 profile-bg h-fit min-w-[280px] max-w-[640px] sm:min-w-[360px] xs:w-screen mx-3 xs:mx-0 sm:mx-3 rounded-[10px] xs:rounded-none sm:rounded-[10px] overflow-hidden login-form-shadow">
            <button
              className="flex gap-1 items-center justify-center px-3 py-3 w-fit rounded"
              onClick={() => hideProfile()}
            >
              <div className="flex items-center justify-center p-1">
                <HiOutlineArrowLeft size={20} color="white" />
              </div>
              <span className="text-white font-medium">Back</span>
            </button>
            <div className="flex items-center justify-center h-[40vh]">
              <div className="flex items-center justify-center bg-white rounded-full p-8 w-fit">
                <FaRegUser size={60} color="#777777" />
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-white px-6 py-6 rounded-tl-[25px] rounded-tr-[25px]">
              <div className="flex gap-3 items-start px-5 pb-3 border-b border-solid border-mid-gray cursor-pointer">
                <div className="pt-1">
                  <BiIdCard size={20} color="#777777" />
                </div>
                <div>
                  <p className="text-[17px] font-medium">User ID</p>
                  <p className="text-[15px] text-secondary-gray">{user.id}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start px-5 pb-3 border-b border-solid border-mid-gray cursor-pointer">
                <div className="pt-1">
                  <FaRegUser size={18} color="#777777" />
                </div>
                <div>
                  <p className="text-[17px] font-medium">Full Name</p>
                  <p className="text-[15px] text-secondary-gray">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start px-5 pb-3 border-b border-solid border-mid-gray cursor-pointer">
                <div className="pt-1">
                  <BsTelephone size={18} color="#777777" />
                </div>
                <div>
                  <p className="text-[17px] font-medium">Mobile</p>
                  <p className="text-[15px] text-secondary-gray">
                    {user.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start px-5 pb-3 border-b border-solid border-mid-gray cursor-pointer">
                <div className="pt-1">
                  <MdOutlineEmail size={18} color="#777777" />
                </div>
                <div>
                  <p className="text-[17px] font-medium">Email</p>
                  <p className="text-[15px] text-secondary-gray">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start px-5 pb-3 border-b border-solid border-mid-gray cursor-pointer">
                <div className="pt-1">
                  <SlLocationPin size={18} color="#777777" />
                </div>
                <div>
                  <p className="text-[17px] font-medium">
                    {user.LGA.length > 1 ? "LGAs" : "LGA"}
                  </p>
                  {user.LGA.map((lga, i) => (
                    <p
                      key={i}
                      className="text-[15px] text-secondary-gray flex items-center -translate-x-[6px]"
                    >
                      <BsDot size={18} color="#72a247" />
                      <span>{lga}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div
                className="flex gap-3 items-start px-5 pb-3 border-b border-solid border-mid-gray cursor-pointer"
                onClick={() => {
                  logOut();
                  setUser(null);
                }}
              >
                <div className="pt-[2px]">
                  <BiLogOut size={18} color="red" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-red-600">
                    Log Out
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnumeratorForm;
