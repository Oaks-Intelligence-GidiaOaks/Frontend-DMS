import { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsChevronDown } from "react-icons/bs";
import EnumeratorFormContext from "../context/enumeratorFormContext";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context";

function LGAController() {
  const {
    state: {
      currentLGA,
      showSubmissionNotification,
      showDuplicateNotification,
      showErrorNotification,
    },
    setCurrentLGA,
    setState,
  } = useContext(EnumeratorFormContext);
  const { user } = useAuth();

  const inputRef = useRef();
  const dropDownRef = useRef();

  const [dropDownValue, setDropDownValue] = useState(currentLGA);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const updateForm = (lga) => {
    if (
      showSubmissionNotification ||
      showDuplicateNotification ||
      showErrorNotification
    ) {
      setState((prev) => ({
        ...prev,
        currentLGA: lga,
        showSubmissionNotification: false,
        showDuplicateNotification: false,
        showErrorNotification: false,
        currentFormTab: "Food",
      }));
    }
  };

  // Close dropdown on click away
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // handle state change
  useEffect(() => {
    setCurrentLGA(dropDownValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownValue]);

  return (
    <div
      ref={dropDownRef}
      className="relative flex items-center px-2 py-1 border-[1px] border-solid border-primary-green rounded clamp-md"
    >
      <SlLocationPin size={16} color="#72a247" />
      <input
        readOnly
        type="text"
        value={currentLGA}
        placeholder="Change LGA"
        className="flex w-[60%] flex-1 pl-3 outline-none rounded cursor-pointer text-[14px] bg-transparent "
        onFocus={() => {
          setShowDropDown(true);
          setIsFocused(true);
        }}
        ref={inputRef}
      />
      {showDropDown && (
        <ul className="absolute w-full z-20 left-0 top-0 bg-white translate-y-10 drop-down-shadow rounded max-h-[50vh]">
          {user.LGA.filter((lga) => lga !== currentLGA).map((item, i) => (
            <li
              key={i}
              className="px-2 py-2 text-[14px] cursor-pointer hover:bg-light-primary-green flex items-center gap-2"
              onClick={() => {
                setDropDownValue(item);
                setState((prev) => ({ ...prev, currentLGA: item }));
                updateForm(item);
                inputRef.current.blur();
                setShowDropDown(false);
                setIsFocused(false);
              }}
            >
              <SlLocationPin size={16} color="#72a247" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      <div
        className={`absolute right-0 top-3 w-8 ${
          isFocused ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => {
          !showDropDown ? setShowDropDown(true) : setShowDropDown(false);
        }}
      >
        <BsChevronDown
          className={`cursor-pointer -translate-y-1 ${
            showDropDown ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>
    </div>
  );
}

export default LGAController;
