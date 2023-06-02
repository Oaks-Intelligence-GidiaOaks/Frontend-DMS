import { vehicleTypes } from "../../data/enumeratorFormStructure";
import DropDownMenu from "../DropDownMenu";
import { useContext } from "react";
import EnumeratorFormContext from "../../context/enumeratorFormContext";
import { useEffect } from "react";

function Transport() {
  const {
    state: { transportSectionStructure: transportForm },
    setTransportItemValue,
    transportProgressPercentage,
    setCurrentFormTab,
    handleValue,
  } = useContext(EnumeratorFormContext);

  const handleChange = (item, valueTitle, value) => {
    setTransportItemValue({
      item,
      valueTitle,
      value,
    });
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  return (
    // Container
    <div className="flex flex-col mx-auto items-center max-w-[1040px] min-h-screen pb-40">
      {/* Content */}
      <div className="flex flex-col gap-8 w-full min-h-[50vh] mt-[30px] mb-20">
        {Object.keys(transportForm).map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex flex-col gap-10 bg-white login-form-shadow rounded-[10px] pb-10 md:pb-16"
          >
            <p className="relative leading-[20px] text-[18px] sm:text-[20px] px-[5%] mt-[5%] py-[1%] sm:mt-[5%] sm:py-[1%] xs:mt-[10%] xs:py-[2.5%] slab">
              <span className="text-primary-green font-medium">
                Route {i + 1}:{" "}
              </span>
              <span className="font-medium">{item}</span>
            </p>
            <div className="px-[5%] pb-[2%] sm:pb-[2%] xs:pb-[5%]">
              <>
                <div className="flex flex-col gap-4">
                  <p>Cost of transportation</p>
                  <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                    <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                      ₦
                    </span>
                    <input
                      type="text"
                      placeholder="Enter answer"
                      className="flex-1 pl-8 py-2 outline-primary-green"
                      value={transportForm[item]["cost"]}
                      onChange={(e) => {
                        setTransportItemValue({
                          item,
                          valueTitle: "cost",
                          value: handleValue(e.target.value),
                        });
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                </div>
              </>
              <>
                <div className="flex flex-col gap-4">
                  {/* <div className="flex flex-col gap-2">
                        {vehicleTypes.map((variant, i) => (
                          
                          <div key={i} className="flex items-center">
                          <label
                          htmlFor={`${type}-${variant}`}
                          className="flex flex-1 items-center gap-x-3 flex-wrap"
                          >
                              <input
                                type="radio"
                                id={`${type}-${variant}`}
                                value={`${type}`}
                                name={`${item}`}
                                className="p-2 outline-primary-green accent-primary-green"
                              />
                              <span className="block py-2">{variant}</span>
                              {variant === "Other" && (
                                <input
                                  type="text"
                                  placeholder="(Please Specify)"
                                  className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                                />
                              )}
                            </label>
                          </div>
                        ))}
                      </div> */}
                  <div className="flex flex-col gap-4 mt-10">
                    <p>Mode of transportation</p>
                    <DropDownMenu
                      list={vehicleTypes}
                      handleChange={handleChange}
                      item={item}
                      valueTitle={"mode of transportation"}
                      value={transportForm[item]["mode of transportation"]}
                      section={"transportSectionStructure"}
                    />
                  </div>
                </div>
              </>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[14px] w-full mb-10 text-gray-500">
        <span className="font-bold">NOTE</span>: Next button will only be active
        if all fields in this form section have a value
      </p>
      <button
        disabled={transportProgressPercentage !== 100}
        onClick={() => setCurrentFormTab("Accomodation")}
        className={`${
          transportProgressPercentage === 100
            ? "bg-primary-green"
            : "bg-gray-300"
        } w-full rounded-lg flex justify-center items-center p-2`}
      >
        <span className="text-white">Next</span>
      </button>
    </div>
  );
}

export default Transport;
