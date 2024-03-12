import { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";

import {
  EggsList,
  GroundnutOilList,
  PalmOilList,
  YamList,
  beanTypes,
  beefList,
  breadList,
  chickenList,
  cupSizes,
  fishList,
  fishSizes,
  garriTypes,
  riceBrands,
  riceCupSizes,
  tomatoBagSizes,
  tomatoBasketSizes,
  tomatoSeedSizes,
  tomatoTypes,
  turkeyList,
} from "../../data/enumeratorFormStructure";
import DropDownMenu from "../DropDownMenu";
import EnumeratorFormContext from "../../context/enumeratorFormContext";
import { useEffect } from "react";
import { handleTomatoLabel } from "../../lib";

function Food() {
  const {
    state: { foodSectionStructure: foodForm },
    setFoodItemValue,
    addItem,
    removeItem,
    calculateOptionsLength,
    foodProgressPercentage,
    setCurrentFormTab,
    handleValue,
  } = useContext(EnumeratorFormContext);

  const handleChange = (item, type, valueTitle, value, i) => {
    setFoodItemValue({
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
        {Object.keys(foodForm).map((item, a) => (
          <div key={`${item}-${a}`} className="flex flex-col gap-8">
            {Object.keys(foodForm[item]).map((type, index) => (
              <div
                key={`${type}-${index}`}
                className="bg-white rounded-[10px] px-[5%] pt-[5%] pb-[2%] sm:pt-[5%] sm:pb-[2%] xs:pt-[10%] xs:pb-[5%] login-form-shadow"
              >
                {foodForm[item][type].map((val, i) => (
                  <div
                    key={`${val}-${i}`}
                    className={`flex flex-col relative gap-12 mb-14 xs:mb-0 sm:mb-4 md:mb-6 ${
                      i > 0 ? "mt-20" : "mt-0"
                    }`}
                  >
                    {item === "Rice" && (
                      <>
                        {/* Remove item button */}
                        {/* {foodForm[item][type].length > 1 && (
                          <button
                            className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded"
                            onClick={() =>
                              removeItem({
                                array: foodForm[item][type],
                                item,
                                type,
                                index: i,
                                section: "foodSectionStructure",
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
                          <p>
                            Price of {item} - {type === "50-kg" && "1 Bag"}{" "}
                            {type === "50-kg"
                              ? `(${type.split("-").join(" ")})`
                              : type.split("-").join(" ")}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              placeholder="Enter answer"
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                        {type.toLowerCase() === "1-cup" && (
                          <div className="flex flex-col gap-4">
                            <p>Specify size of cup</p>
                            <DropDownMenu
                              list={riceCupSizes}
                              handleChange={handleChange}
                              item={item}
                              type={type}
                              valueTitle={"size"}
                              value={foodForm[item][type][i]["size"]}
                              i={i}
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
                        )}
                        <div className="flex flex-col gap-4">
                          <p>
                            Specify Brand of {item}, for{" "}
                            {type === "50-kg"
                              ? `1 Bag (${type.split("-").join(" ")})`
                              : type.split("-").join(" ")}
                          </p>
                          <DropDownMenu
                            list={riceBrands.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"brand"}
                            value={foodForm[item][type][i]["brand"]}
                            i={i}
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
                      </>
                    )}
                    {item === "Beans" && (
                      <>
                        {/* Remove item button */}
                        {/* {foodForm[item][type].length > 1 && (
                          <button
                            className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded"
                            onClick={() =>
                              removeItem({
                                array: foodForm[item][type],
                                item,
                                type,
                                index: i,
                                section: "foodSectionStructure",
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
                          <p>
                            Price of {item} - {type === "50-kg" && "1 Bag"}{" "}
                            {type === "50-kg"
                              ? `(${type.split("-").join(" ")})`
                              : type.split("-").join(" ")}{" "}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              placeholder="Enter answer"
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                        {type.toLowerCase() === "1-cup" && (
                          <div className="flex flex-col gap-4">
                            <p>Specify size of cup</p>
                            <DropDownMenu
                              list={cupSizes}
                              handleChange={handleChange}
                              item={item}
                              type={type}
                              valueTitle={"size"}
                              value={foodForm[item][type][i]["size"]}
                              i={i}
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
                        )}
                        <div className="flex flex-col gap-4">
                          <p>
                            Specify type of {item}, for{" "}
                            {type === "50-kg"
                              ? `1 Bag (${type.split("-").join(" ")})`
                              : type.split("-").join(" ")}
                          </p>
                          <DropDownMenu
                            list={beanTypes.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.type)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                          {/* <div className="flex flex-col gap-4">
        {beanTypes.map((variant, i) => (
          <div key={i} className="flex gap-1 items-center">
            <label
              htmlFor={`beans-${type}-${variant}`}
              className="flex items-center gap-3"
            >
              <input
                type="radio"
                id={`beans-${type}-${variant}`}
                value={`${variant}`}
                defaultChecked={
                  foodForm[item][type][0]["type"] ===
                  variant
                }
                name={`beans-${type}`}
                className="p-2 outline-primary-green accent-primary-green"
                onChange={(e) =>
                  
                    setFoodItemValue({
                      item,
                      type,
                      valueTitle: "type",
                      value: e.target.value,
                    })
                  
                }
              />
              <span>{variant}</span>
            </label>
          </div>
        ))}
      </div> */}
                        </div>
                      </>
                    )}
                    {item === "Garri" && (
                      <>
                        {/* Remove item button */}
                        {/* {foodForm[item][type].length > 1 && (
                          <button
                            className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded"
                            onClick={() =>
                              removeItem({
                                array: foodForm[item][type],
                                item,
                                type,
                                index: i,
                                section: "foodSectionStructure",
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
                          <p>
                            Price of {item} - {type === "50-kg" && "1 Bag"}{" "}
                            {type === "50-kg"
                              ? `(${type.split("-").join(" ")})`
                              : type.split("-").join(" ")}{" "}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                              placeholder="Enter answer"
                              className="flex-1 pl-8 py-2 outline-primary-green"
                            />
                          </div>
                        </div>
                        {type.toLowerCase() === "1-cup" && (
                          <div className="flex flex-col gap-4">
                            <p>Specify size of cup</p>
                            <DropDownMenu
                              list={cupSizes}
                              handleChange={handleChange}
                              item={item}
                              type={type}
                              valueTitle={"size"}
                              value={foodForm[item][type][i]["size"]}
                              i={i}
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
                        )}
                        <div className="flex flex-col gap-4">
                          <p>
                            Specify type of {item}, for{" "}
                            {type === "50-kg"
                              ? `1 Bag (${type.split("-").join(" ")})`
                              : type.split("-").join(" ")}
                          </p>
                          <DropDownMenu
                            list={garriTypes.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.type)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                          {/* <div className="flex flex-col gap-4">
        {garriTypes.map((variant, i) => (
          <div key={i} className="flex gap-1 items-center">
            <label
              htmlFor={`garri-${type}-${variant}`}
              className="flex items-center gap-3"
            >
              <input
                type="radio"
                id={`garri-${type}-${variant}`}
                value={`${variant}`}
                name={`garri-${type}`}
                className="p-2 outline-primary-green accent-primary-green"
                defaultChecked={
                  foodForm[item][type][0]["type"] ===
                  variant
                }
                onChange={(e) =>
                  
                    setFoodItemValue({
                      item,
                      type,
                      valueTitle: "type",
                      value: e.target.value,
                    })
                  
                }
              />
              <span>{variant}</span>
            </label>
          </div>
        ))}
      </div> */}
                        </div>
                      </>
                    )}
                    {item === "Tomatoes" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>Specify type of Tomatoes</p>
                          <DropDownMenu
                            list={tomatoTypes}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item]["prices"][0]["type"]}
                            section={"foodSectionStructure"}
                            i={0}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {item} (
                            {handleTomatoLabel(Object.keys(foodForm[item][type][0])[1]
                              .split("-")
                              .join(" "))}
                            )
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              value={foodForm[item]["prices"][0]["4-seeds"]}
                              placeholder="Enter answer"
                              className="flex-1 pl-8 py-2 outline-primary-green"
                              onChange={(e) =>
                                setFoodItemValue({
                                  item,
                                  type,
                                  valueTitle: "4-seeds",
                                  value: handleValue(e.target.value),
                                  i: 0,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>Specify size of tomato pieces</p>
                          <DropDownMenu
                            list={tomatoSeedSizes}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"seed-size"}
                            value={foodForm[item]["prices"][0]["seed-size"]}
                            section={"foodSectionStructure"}
                            i={0}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {item}{" "}
                            <span className="capitalize">
                              (
                              {foodForm[item]["prices"][0][
                                "type"
                              ].toLowerCase() === "fresh tomatoes" ||
                              foodForm[item]["prices"][0]["type"] === ""
                                ? Object.keys(foodForm[item][type][0])[3]
                                    .split("-")
                                    .join(" ")
                                : "Big bag"}
                              )
                            </span>
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              value={foodForm[item]["prices"][0]["big-basket"]}
                              placeholder="Enter answer"
                              className="flex-1 pl-8 py-2 outline-primary-green"
                              onChange={(e) =>
                                setFoodItemValue({
                                  item,
                                  type,
                                  valueTitle: "big-basket",
                                  value: handleValue(e.target.value),
                                  i: 0,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>
                            Specify size of{" "}
                            {foodForm[item]["prices"][0][
                              "type"
                            ].toLowerCase() === "fresh tomatoes" ||
                            foodForm[item]["prices"][0]["type"] === ""
                              ? "Basket"
                              : "Bag"}
                          </p>
                          <DropDownMenu
                            list={
                              foodForm[item]["prices"][0][
                                "type"
                              ].toLowerCase() === "fresh tomatoes" ||
                              foodForm[item]["prices"][0]["type"] === ""
                                ? tomatoBasketSizes
                                : tomatoBagSizes
                            }
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"size"}
                            value={foodForm[item]["prices"][0]["size"]}
                            section={"foodSectionStructure"}
                            i={0}
                          />
                        </div>
                      </>
                    )}
                    {item === "Fish" && (
                      <>
                        {/* Remove item button */}
                        {/* {foodForm[item][type].length > 1 && (
                          <button
                            className="absolute top-0 right-0 flex items-center gap-1 text-red-600 hover:bg-red-50 p-2 rounded"
                            onClick={() =>
                              removeItem({
                                array: foodForm[item][type],
                                item,
                                type,
                                index: i,
                                section: "foodSectionStructure",
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
                          <p>Price of 1 {item}</p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              className="flex-1 pl-8 py-2 outline-primary-green"
                              onChange={(e) =>
                                setFoodItemValue({
                                  item,
                                  type,
                                  valueTitle: "price",
                                  value: handleValue(e.target.value),
                                  i,
                                })
                              }
                              onWheel={(e) => e.target.blur()}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>Specify type of Fish</p>
                          <DropDownMenu
                            list={fishList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <p>Specify size of Fish</p>
                          <DropDownMenu
                            list={fishSizes}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"size"}
                            value={foodForm[item][type][i]["size"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Beef" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {type.split("-").join(" ")} of {item}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify size of Beef</p>
                          <DropDownMenu
                            list={beefList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Chicken" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            {/* Price of {type.split("-").join(" ")} of {item} */}
                            Price of {item}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify size of Chicken</p>
                          <DropDownMenu
                            list={chickenList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Turkey" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            {/* Price of {type.split("-").join(" ")} of {item} */}
                            Price of {item}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify size of Turkey</p>
                          <DropDownMenu
                            list={turkeyList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Bread" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {type.split("-").join(" ")} of {item}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify size of Bread</p>
                          <DropDownMenu
                            list={breadList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Egg" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {type.split("-").join(" ")} of {item}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify size of Egg</p>
                          <DropDownMenu
                            list={EggsList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Yam" && (
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
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify size of Yam</p>
                          <DropDownMenu
                            list={YamList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Palm oil" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {type.split("-").join(" ")} of {item}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify type of Palm Oil</p>
                          <DropDownMenu
                            list={PalmOilList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                    {item === "Groundnut oil" && (
                      <>
                        <div className="flex flex-col gap-4">
                          <p>
                            Price of {type.split("-").join(" ")} of {item}
                          </p>
                          <div className="flex gap-2 relative border-b border-solid border-mid-gray">
                            <span className="block px-[6px] rounded bg-light-gray absolute left-0 bottom-[50%] translate-x-[2px] translate-y-[50%]">
                              ₦
                            </span>
                            <input
                              type="text"
                              placeholder="Enter answer"
                              value={foodForm[item][type][i]["price"]}
                              onChange={(e) =>
                                setFoodItemValue({
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
                          <p>Specify type of Groundnut Oil</p>
                          <DropDownMenu
                            list={GroundnutOilList.filter(
                              (el) =>
                                !foodForm[item][type]
                                  .map((item) => item.weight)
                                  .includes(el)
                            )}
                            handleChange={handleChange}
                            item={item}
                            type={type}
                            valueTitle={"type"}
                            value={foodForm[item][type][i]["type"]}
                            i={i}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {/* Add item button */}
                {/* {["Rice", "Beans", "Garri", "Fish"].includes(item) &&
                  foodForm[item][type].length <
                    calculateOptionsLength(item) && (
                    <div className="flex justify-end mt-12">
                      <button
                        className=" flex gap-[6px] items-center hover:bg-light-primary-green p-2 rounded"
                        onClick={() =>
                          addItem({
                            item,
                            type,
                            section: "foodSectionStructure",
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
        disabled={foodProgressPercentage !== 100}
        onClick={() => setCurrentFormTab("Commodity")}
        className={`${
          foodProgressPercentage === 100 ? "bg-primary-green" : "bg-gray-300"
        } w-full rounded-lg flex justify-center items-center p-2`}
      >
        <span className="text-white">Next</span>
      </button>
    </div>
  );
}

export default Food;
