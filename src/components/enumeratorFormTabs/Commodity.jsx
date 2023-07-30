import { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";

import {
  buildingBlockSizes,
  cementBrands,
  charcoalWeights,
  firewoodBundleSizes,
} from "../../data/enumeratorFormStructure";
import DropDownMenu from "../DropDownMenu";
import EnumeratorFormContext from "../../context/enumeratorFormContext";
import { useEffect } from "react";

const Commodity = () => {
  const {
    state: { commoditySectionStructure: commodityForm },
    setCommodityItemValue,
    addItem,
    removeItem,
    calculateOptionsLength,
    commodityProgressPercentage,
    setCurrentFormTab,
    handleValue,
  } = useContext(EnumeratorFormContext);

  const handleChange = (item, type, value, valueTitle, i) => {
    setCommodityItemValue({
      item,
      type,
      valueTitle,
      value,
      i,
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
        {Object.keys(commodityForm).map((item, id) => (
          <div key={`${item}-${id}`} className="flex flex-col gap-8">
            {Object.keys(commodityForm[item]).map((type, index) => (
              <div
                key={`${type}-${index}`}
                className="bg-white rounded-[10px] px-[5%] pt-[5%] pb-[2%] sm:pt-[5%] sm:pb-[2%] xs:pt-[10%] xs:pb-[5%] login-form-shadow"
              >
                {commodityForm[item][type].map((val, i) => (
                  <div
                    key={`${val}-${i}`}
                    className={`flex flex-col relative gap-12 mb-14 xs:mb-0 sm:mb-4 md:mb-6 ${
                      i > 0 ? "mt-20" : "mt-0"
                    }`}
                  >
                    {item === "Kerosene" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {item} ({type.split("-").join(" ")})
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item][type][0]["price"]}
                              onChange={(e) =>
                                setCommodityItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i: 0,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {item === "Cooking Gas" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {item} ({type.split("-").join(" ")})
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item][type][0]["price"]}
                              onChange={(e) =>
                                setCommodityItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i: 0,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {item === "Firewood" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {item} ({type.split("-").join(" ")})
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item][type][0]["price"]}
                              onChange={(e) =>
                                setCommodityItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i: 0,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>
                            Specify size of {item} ({type.split("-").join(" ")})
                          </p>
                          <DropDownMenu
                            list={firewoodBundleSizes}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"size"}
                            value={commodityForm[item][type][0]["size"]}
                            i={0}
                          />
                          <div className="flex flex-col gap-2">
                            {/* {commodityForm[item][type][0][
                              "weight"
                            ] === "Other" && (
                              <input
                                disabled={
                                  commodityForm[item][type][0][
                                    "weight"
                                  ] !== "Other"
                                }
                                type="text"
                                placeholder="(Please Specify)"
                                value={
                                  commodityForm[item][type][0][
                                    "answer"
                                  ]
                                    ? commodityForm[item][type][0][
                                        "answer"
                                      ]
                                    : ""
                                }
                                onChange={(e) =>
                                  
                                    setCommodityItemValue({
                                      item,
                                      type,
                                      valueTitle: "answer",
                                      value: e.target.value,
                                    i})
                                  
                                }
                                className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                              />
                            )} */}
                          </div>

                          {/* <div className="flex flex-col gap-2">
                            {cementBrands.map((variant, i) => (
                              <div key={i} className="flex items-center">
                                <label
                                  htmlFor={`cement-${type}-${variant}`}
                                  className="flex flex-1 items-center gap-x-3 flex-wrap"
                                >
                                  <input
                                    type="radio"
                                    id={`cement-${type}-${variant}`}
                                    value={`${variant}`}
                                    defaultChecked={
                                      commodityForm[item][type][0][
                                        "weight"
                                      ] === variant
                                    }
                                    onChange={(e) => {
                                      
                                        setCommodityItemValue({
                                          item,
                                          type,
                                          valueTitle: "weight",
                                          value: e.target.value,
                                        }i)
                                      )
                                    }}
                                    name={`cement-${type}`}
                                    className="p-2 outline-primary-green accent-primary-green"
                                  />
                                  <span className="block py-2">{variant}</span>
                                  {variant === "Other" && (
                                    <input
                                      disabled={
                                        commodityForm[item][
                                          type
                                        ][0]["weight"] !== "Other"
                                      }
                                      type="text"
                                      placeholder="(Please Specify)"
                                      value={
                                        commodityForm[item][
                                          type
                                        ][0]["answer"]
                                          ? commodityForm[item][
                                              type
                                            ][0]["answer"]
                                          : ""
                                      }
                                      onChange={(e) =>
                                        
                                          setCommodityItemValue({
                                            item,
                                            type,
                                            valueTitle: "answer",
                                            value: e.target.value,
                                          i})
                                        
                                      }
                                      className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                                    />
                                  )}
                                </label>
                              </div>
                            ))}
                          </div> */}
                        </div>
                      </>
                    )}
                    {item === "Charcoal" && (
                      <>
                        {/* Remove item button */}
                        {/* {commodityForm[item][type].length > 1 && (
                          <button
                            className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded"
                            onClick={() =>
                              removeItem({
                                array: commodityForm[item][type],
                                item,
                                type,
                                index: i,
                                section: "commoditySectionStructure",
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
                          <p>Price of {item}</p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item]["prices"][i]["price"]}
                              onChange={(e) => {
                                setCommodityItemValue({
                                  item,
                                  type: "prices",
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i,
                                });
                              }}
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>Specify net weight of {item}</p>

                          <DropDownMenu
                            list={charcoalWeights.filter(
                              (el) =>
                                !commodityForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"weight"}
                            value={commodityForm[item][type][i]["weight"]}
                            i={i}
                          />
                          <div className="flex flex-col gap-2">
                            {/* {commodityForm[item][type][0][
                              "weight"
                            ] === "Other" && (
                              <input
                                disabled={
                                  commodityForm[item][type][0][
                                    "weight"
                                  ] !== "Other"
                                }
                                type="text"
                                placeholder="(Please Specify)"
                                value={
                                  commodityForm[item][type][0][
                                    "answer"
                                  ]
                                    ? commodityForm[item][type][0][
                                        "answer"
                                      ]
                                    : ""
                                }
                                onChange={(e) =>
                                  
                                    setCommodityItemValue({
                                      item,
                                      type,
                                      valueTitle: "answer",
                                      value: e.target.value,
                                    i})
                                  
                                }
                                className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                              />
                            )} */}

                            {/* {charcoalWeights.map((variant, i) => (
                              <div key={i} className="flex items-center">
                                <label
                                  htmlFor={`charcoal-${type}-${variant}`}
                                  className="flex flex-1 items-center gap-x-3 flex-wrap"
                                >
                                  <input
                                    type="radio"
                                    id={`charcoal-${type}-${variant}`}
                                    value={`${variant}`}
                                    name={`charcoal-${type}`}
                                    defaultChecked={
                                      commodityForm[item][type][0][
                                        "weight"
                                      ] === variant
                                    }
                                    onChange={(e) => {
                                      
                                        setCommodityItemValue({
                                          item,
                                          type,
                                          valueTitle: "weight",
                                          value: e.target.value,
                                        }i)
                                      )
                                    }}
                                    className="p-2 outline-primary-green accent-primary-green"
                                  />
                                  <span className="block py-2">{variant}</span>
                                </label>
                              </div>
                            ))} */}
                          </div>
                        </div>
                      </>
                    )}
                    {item === "Petrol/PMS" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {item} ({type.split("-").join(" ")})
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item][type][0]["price"]}
                              onChange={(e) =>
                                setCommodityItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i: 0,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {item === "Cement" && (
                      <>
                        {/* Remove item button */}
                        {/* {commodityForm[item][type].length > 1 && (
                          <button
                            className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded"
                            onClick={() =>
                              removeItem({
                                array: commodityForm[item][type],
                                item,
                                type,
                                index: i,
                                section: "commoditySectionStructure",
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
                          <p>Price of {item}</p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setCommodityItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>
                            Specify brand of {item} ({type.split("-").join(" ")}
                            )
                          </p>
                          <DropDownMenu
                            list={cementBrands}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"weight"}
                            value={commodityForm[item][type][i]["weight"]}
                            i={i}
                          />
                          <div className="flex flex-col gap-2">
                            {/* {commodityForm[item][type][0][
                              "weight"
                            ] === "Other" && (
                              <input
                                disabled={
                                  commodityForm[item][type][0][
                                    "weight"
                                  ] !== "Other"
                                }
                                type="text"
                                placeholder="(Please Specify)"
                                value={
                                  commodityForm[item][type][0][
                                    "answer"
                                  ]
                                    ? commodityForm[item][type][0][
                                        "answer"
                                      ]
                                    : ""
                                }
                                onChange={(e) =>
                                  
                                    setCommodityItemValue({
                                      item,
                                      type,
                                      valueTitle: "answer",
                                      value: e.target.value,
                                    i})
                                  
                                }
                                className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                              />
                            )} */}
                          </div>

                          {/* <div className="flex flex-col gap-2">
                            {cementBrands.map((variant, i) => (
                              <div key={i} className="flex items-center">
                                <label
                                  htmlFor={`cement-${type}-${variant}`}
                                  className="flex flex-1 items-center gap-x-3 flex-wrap"
                                >
                                  <input
                                    type="radio"
                                    id={`cement-${type}-${variant}`}
                                    value={`${variant}`}
                                    defaultChecked={
                                      commodityForm[item][type][0][
                                        "weight"
                                      ] === variant
                                    }
                                    onChange={(e) => {
                                      
                                        setCommodityItemValue({
                                          item,
                                          type,
                                          valueTitle: "weight",
                                          value: e.target.value,
                                        }i)
                                      )
                                    }}
                                    name={`cement-${type}`}
                                    className="p-2 outline-primary-green accent-primary-green"
                                  />
                                  <span className="block py-2">{variant}</span>
                                  {variant === "Other" && (
                                    <input
                                      disabled={
                                        commodityForm[item][
                                          type
                                        ][0]["weight"] !== "Other"
                                      }
                                      type="text"
                                      placeholder="(Please Specify)"
                                      value={
                                        commodityForm[item][
                                          type
                                        ][0]["answer"]
                                          ? commodityForm[item][
                                              type
                                            ][0]["answer"]
                                          : ""
                                      }
                                      onChange={(e) =>
                                        
                                          setCommodityItemValue({
                                            item,
                                            type,
                                            valueTitle: "answer",
                                            value: e.target.value,
                                          i})
                                        
                                      }
                                      className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                                    />
                                  )}
                                </label>
                              </div>
                            ))}
                          </div> */}
                        </div>
                      </>
                    )}
                    {item === "Building Block" && (
                      <>
                        {/* Remove item button */}
                        {/* {commodityForm[item][type].length > 1 && (
                          <button
                            className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded"
                            onClick={() =>
                              removeItem({
                                array: commodityForm[item][type],
                                item,
                                type,
                                index: i,
                                section: "commoditySectionStructure",
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
                          <p>Price of {item}</p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item]["prices"][i]["price"]}
                              onChange={(e) =>
                                setCommodityItemValue({
                                  item,
                                  type: "prices",
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>
                            Specify size of {item} ({type.split("-").join(" ")})
                          </p>
                          <DropDownMenu
                            list={buildingBlockSizes.filter(
                              (el) =>
                                !commodityForm[item][type]
                                  .map((item) => item.size)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"size"}
                            value={commodityForm[item][type][i]["size"]}
                            i={i}
                          />
                          <div className="flex flex-col gap-2">
                            {/* {commodityForm[item][type][0][
                              "weight"
                            ] === "Other" && (
                              <input
                                disabled={
                                  commodityForm[item][type][0][
                                    "weight"
                                  ] !== "Other"
                                }
                                type="text"
                                placeholder="(Please Specify)"
                                value={
                                  commodityForm[item][type][0][
                                    "answer"
                                  ]
                                    ? commodityForm[item][type][0][
                                        "answer"
                                      ]
                                    : ""
                                }
                                onChange={(e) =>
                                  
                                    setCommodityItemValue({
                                      item,
                                      type,
                                      valueTitle: "answer",
                                      value: e.target.value,
                                    i})
                                  
                                }
                                className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                              />
                            )} */}
                          </div>
                          {/* <div className="flex flex-col gap-2">
                            {buildingBlockSizes.map((variant, i) => (
                              <div key={i} className="flex items-center">
                                <label
                                  htmlFor={`${item}-${type}-${variant}`}
                                  className="flex flex-1 items-center gap-x-3 flex-wrap"
                                >
                                  <input
                                    type="radio"
                                    id={`${item}-${type}-${variant}`}
                                    value={`${variant}`}
                                    name={`${item}-${type}`}
                                    defaultChecked={
                                      commodityForm[item][type][0][
                                        "size"
                                      ] === variant
                                    }
                                    onChange={(e) => {
                                      
                                        setCommodityItemValue({
                                          item,
                                          type,
                                          valueTitle: "size",
                                          value: e.target.value,
                                        }i)
                                      )
                                    }}
                                    className="p-2 outline-primary-green accent-primary-green"
                                  />
                                  <span className="block py-2">{variant}</span>
                                  {variant === "Other" && (
                                    <input
                                      disabled={
                                        commodityForm[item][
                                          type
                                        ][0]["size"] !== "Other"
                                      }
                                      type="text"
                                      placeholder="(Please Specify)"
                                      value={
                                        commodityForm[item][
                                          "prices"
                                        ][0]["answer"]
                                          ? commodityForm[item][
                                              "prices"
                                            ][0]["answer"]
                                          : ""
                                      }
                                      onChange={(e) =>
                                        
                                          setCommodityItemValue({
                                            item,
                                            type: "prices",
                                            valueTitle: "answer",
                                            value: e.target.value,
                                          i})
                                        
                                      }
                                      className="flex-1 pl-4 py-2 outline-primary-green border-b border-solid border-mid-gray min-w-[200px]"
                                    />
                                  )}
                                </label>
                              </div>
                            ))}
                          </div> */}
                        </div>
                      </>
                    )}
                    {item === "Diesel/AGO" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {item} ({type.split("-").join(" ")})
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={commodityForm[item][type][0]["price"]}
                              onChange={(e) =>
                                setCommodityItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i: 0,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {/* Add item button */}
                {/* {["Building Block", "Charcoal", "Cement"].includes(item) &&
                  commodityForm[item][type].length <
                    calculateOptionsLength(item) && (
                    <div className="flex justify-end mt-4 sm:mt-8 md:12">
                      <button
                        className=" flex gap-[6px] items-center hover:bg-light-primary-green p-2 rounded"
                        onClick={() =>
                          addItem({
                            item,
                            type,
                            section: "commoditySectionStructure",
                          })
                        }
                      >
                        <IoMdAdd color="#72a247" size={16} />
                        <span className="font-medium text-primary-green">
                          Add New
                        </span>
                      </button>
                    </div>
                  )} */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="text-[14px] w-full mb-10 text-gray-500">
        <span className="font-bold">NOTE</span>: Next button will only be active
        if all fields in this form section have a value
      </p>
      <button
        disabled={commodityProgressPercentage !== 100}
        onClick={() => setCurrentFormTab("Clothing")}
        className={`${
          commodityProgressPercentage === 100
            ? "bg-primary-green"
            : "bg-gray-300"
        } w-full rounded-lg flex justify-center items-center p-2`}
      >
        <span className="text-white">Next</span>
      </button>
    </div>
  );
};

export default Commodity;
