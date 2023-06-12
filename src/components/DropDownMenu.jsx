/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import EnumeratorFormContext from "../context/enumeratorFormContext";

const DropDownMenu = ({
  list,
  item,
  type,
  cloth,
  valueTitle,
  value,
  handleChange,
  i,
  section,
}) => {
  const inputRef = useRef();
  const dropDownRef = useRef();
  const [dropDownValue, setDropDownValue] = useState(value);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { setCommodityItemValue, setTransportItemValue } = useContext(
    EnumeratorFormContext
  );

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
    if (
      item === "Charcoal" ||
      item === "Cement" ||
      item === "Building Block" ||
      item === "Firewood"
    ) {
      setCommodityItemValue({
        item,
        type,
        valueTitle:
          item === "Building Block" || item === "Firewood" ? "size" : "weight",
        value: dropDownValue,
        i,
      });
    } else {
      if (section === "transportSectionStructure") {
        return setTransportItemValue({
          item,
          valueTitle,
          value: dropDownValue,
        });
      } else if (section === "accomodationSectionStructure") {
        handleChange(item, valueTitle, dropDownValue, i);
      } else if (section === "clothingSectionStructure") {
        handleChange(item, cloth, valueTitle, dropDownValue);
      } else {
        handleChange(item, type, valueTitle, dropDownValue, i);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownValue, type]);

  return (
    <div
      ref={dropDownRef}
      className="flex flex-col relative gap-2 border-b border-solid border-mid-gray"
    >
      <input
        readOnly
        type="text"
        value={value}
        placeholder="Select answer"
        className="flex-1 pl-3 py-2 outline-primary-green rounded cursor-pointer"
        onFocus={() => {
          setShowDropDown(true);
          setIsFocused(true);
        }}
        ref={inputRef}
      />
      {showDropDown && (
        <ul className="absolute left-0 top-0 translate-y-11 bg-white z-10 w-full shadow-md rounded max-h-[50vh] overflow-y-scroll">
          {list.map((item, i) => (
            <li
              key={i}
              className="px-3 py-2 cursor-pointer hover:bg-light-primary-green"
              onClick={() => {
                setDropDownValue(item);
                inputRef.current.blur();
                setShowDropDown(false);
                setIsFocused(false);
              }}
            >
              {item}
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
          className={`cursor-pointer ${
            showDropDown ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>
    </div>
  );
};

export default DropDownMenu;
