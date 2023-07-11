import { useContext } from "react";
import EnumeratorFormContext from "../../context/enumeratorFormContext";
import DropDownMenu from "../DropDownMenu";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";
import {
  accomodationTypes,
  numberOfRooms,
} from "../../data/enumeratorFormStructure";
import { useEffect } from "react";

function Accomodation() {
  const {
    state: { accomodationSectionStructure: accomodationForm },
    setAccomodationItemValue,
    addItem,
    removeItem,
    accomodationProgressPercentage,
    setCurrentFormTab,
    handleValue,
  } = useContext(EnumeratorFormContext);

  const handleChange = (item, valueTitle, value, i) => {
    setAccomodationItemValue({
      item,
      valueTitle,
      value,
      i,
    });
  };

  const handleAccomodationTypesList = (accArr) => {
    let selected = [];
    accArr.forEach((r, i) => {
      selected.push(r.type);
    });

    const arr = accomodationTypes.filter((t, i) => !selected.includes(t));
    return arr;
  };

  // const handleRoomsList = (type) => {
  //   const filtered = accomodationForm["variations"]
  //     .filter((e) => e["type"] === type)
  //     .map((el) => el["rooms"]);
  //   const arr = !type
  //     ? []
  //     : numberOfRooms[type].filter((r) => !filtered.includes(r));
  //   return arr;
  // };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  return (
    // Container
    <div className="flex flex-col mx-auto items-center max-w-[1040px] min-h-screen pb-40">
      {/* Content */}
      <div className="flex flex-col gap-8 w-full min-h-[50vh] mt-[30px] mb-20 bg-white rounded-[10px]">
        <p className="relative leading-[20px] text-[18px] sm:text-[20px] py-[1%] sm:py-[1%] xs:py-[2.5%]">
          <span className="font-medium ">
            Specify the prices of the following accomodations below
          </span>
        </p>
        {Object.keys(accomodationForm).map((item, a) => (
          <div
            key={`${item}-${a}`}
            className="flex flex-col gap-10 rounded-[10px] login-form-shadow "
          >
            <p className="relative leading-[20px] text-[18px] sm:text-[20px] px-[5%] mt-[5%] py-[1%] sm:mt-[5%] sm:py-[1%] xs:mt-[10%] xs:py-[2.5%] slab">
              <span className="font-medium ">{item}</span>
            </p>
            {accomodationForm[item].map((type, i) => (
              <div
                key={`${type}-${i}`}
                className="relative px-[5%] pb-[2%] sm:pb-[2%] xs:pb-[5%] mt-4"
              >
                <>
                  {/* Remove item button */}
                  {/* {accomodationForm[item].length > 1 && (
                    <button
                      className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded mx-[5%]"
                      onClick={() =>
                        removeItem({
                          array: accomodationForm[item],
                          item,
                          index: i,
                          section: "accomodationSectionStructure",
                        })
                      }
                    >
                      <MdOutlineClear size={20} color="red" />
                      <span className="hidden sm:block font-medium">
                        Remove
                      </span>
                    </button>
                  )} */}

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <p>Type of accomodation</p>
                      <DropDownMenu
                        list={handleAccomodationTypesList(
                          accomodationForm[item]
                        )}
                        handleChange={handleChange}
                        item={item}
                        valueTitle={"type"}
                        value={accomodationForm[item][i]["type"]}
                        i={i}
                        section={"accomodationSectionStructure"}
                      />
                      {/* <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <input
                              type="text"
                              value={
                                foodSectionStructure[item][type][i]["brand"]
                              }
                              onChange={(e) =>
                                
                                  setFoodItemValue({
                                    item,
                                    type,
                                    valueTitle: "brand",
                                    value: e.target.value,
                                  })
                                
                              }
                              placeholder="Enter answer"
                              className="flex-1 p-2 outline-primary-green"
                            />
                          </div> */}
                    </div>
                    <p>Rent for apartment</p>
                    <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                      <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                        ₦
                      </span>
                      <input
                        type="text"
                        placeholder="Enter answer"
                        className="flex-1 pl-8 py-2 outline-primary-green"
                        value={accomodationForm[item][i]["cost"]}
                        onChange={(e) =>
                          setAccomodationItemValue({
                            item,
                            valueTitle: "cost",
                            value: handleValue(e.target.value),
                            i,
                          })
                        }
                        onWheel={(e) => e.target.blur()}
                      />
                    </div>
                  </div>
                </>
              </div>
            ))}
            {/* Add new button */}
            {/* <div className="flex justify-end px-[5%] pb-[2%] sm:pb-[2%] xs:pb-[5%]">
              <button
                className=" flex gap-[6px] items-center hover:bg-light-primary-green p-2 rounded"
                onClick={() =>
                  addItem({
                    item,
                    section: "accomodationSectionStructure",
                  })
                }
              >
                <IoMdAdd color="#72a247" size={16} />
                <span className="font-medium text-primary-green">Add New</span>
              </button>
            </div> */}
          </div>
        ))}
      </div>
      <p className="text-[14px] w-full mb-10 text-gray-500">
        <span className="font-bold">NOTE</span>: Next button will only be active
        if all fields in this form section have a value.
      </p>
      <button
        disabled={accomodationProgressPercentage !== 100}
        onClick={() => setCurrentFormTab("Reports")}
        className={`${
          accomodationProgressPercentage === 100
            ? "bg-primary-green"
            : "bg-gray-300"
        } w-full rounded-lg flex justify-center items-center p-2`}
      >
        <span className="text-white">Next</span>
      </button>
    </div>
  );
}

export default Accomodation;
