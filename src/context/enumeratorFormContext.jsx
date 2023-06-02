import { createContext, useEffect, useMemo, useState } from "react";
import {
  beanTypes,
  buildingBlockSizes,
  cementBrands,
  charcoalWeights,
  fishList,
  garriTypes,
  reportsBinaryFields,
  riceBrands,
  singleFieldCommodityInputs,
  singleFieldFoodInputs,
} from "../data/enumeratorFormStructure";
import { countEmptyStringFields, countValidFields } from "../lib";
import { useAuth } from "./useAuth";
import { base_url } from "../lib/paths";
import { useApp } from "./useApp";
import { useNavigate } from "react-router-dom";

const EnumeratorFormContext = createContext();

// eslint-disable-next-line react/prop-types
export function EnumeratorFormProvider({ children }) {
  const navigate = useNavigate();
  const { user, setUser, setIsLoggedIn } = useAuth();
  const { secureLocalStorage } = useApp();

  // User's saved changes

  const initialState = useMemo(
    () => ({
      currentFormTab: "Food",
      isSubmitting: false,
      currentLGA: user.LGA[0],
      showSavedNotification: false,
      showSubmissionNotification: false,
      showDuplicateNotification: false,
      showErrorNotification: false,
      showEnumeratorProfile: false,
      foodSectionStructure: {
        Rice: {
          "1-cup": [
            {
              price: "",
              brand: "",
            },
          ],
          "50-kg": [
            {
              price: "",
              brand: "",
            },
          ],
        },
        Beans: {
          "1-cup": [
            {
              price: "",
              type: "",
            },
          ],
          "50-kg": [
            {
              price: "",
              type: "",
            },
          ],
        },
        Garri: {
          "1-cup": [
            {
              price: "",
              type: "",
            },
          ],
          "50-kg": [
            {
              price: "",
              type: "",
            },
          ],
        },
        Tomatoes: {
          prices: [
            {
              "4-seeds": "",
              "big-basket": "",
            },
          ],
        },
        Fish: {
          prices: [
            {
              price: "",
              type: "",
            },
          ],
        },
        Beef: {
          "5-pieces": [
            {
              price: "",
            },
          ],
        },
        Chicken: {
          "1-kg": [
            {
              price: "",
            },
          ],
        },
        Turkey: {
          "1-kg": [
            {
              price: "",
            },
          ],
        },
        Bread: {
          "1-loaf": [
            {
              price: "",
            },
          ],
        },
        Egg: {
          "1-crate": [
            {
              price: "",
            },
          ],
        },
        Yam: {
          "1-Standard size": [
            {
              price: "",
            },
          ],
        },
        "Palm oil": {
          "1-Litre": [
            {
              price: "",
            },
          ],
        },
        "Groundnut oil": {
          "1-Litre": [
            {
              price: "",
            },
          ],
        },
      },
      commoditySectionStructure: {
        Kerosene: {
          "1-Litre": [
            {
              price: "",
            },
          ],
        },
        "Cooking Gas": {
          "12-kg": [
            {
              price: "",
            },
          ],
        },
        Firewood: {
          "1-bundle": [
            {
              price: "",
            },
          ],
        },
        Charcoal: {
          prices: [
            {
              price: "",
              weight: "",
            },
          ],
        },
        "Petrol/PMS": {
          "1-Litre": [
            {
              price: "",
            },
          ],
        },
        Cement: {
          "50-kg": [
            {
              price: "",
              weight: "",
            },
          ],
        },
        "Building Block": {
          prices: [
            {
              price: "",
              size: "",
            },
          ],
        },
      },
      transportSectionStructure: {
        "Mile-2 to Marina": {
          cost: "",
          "mode of transportation": "",
        },
        "Old-Ojo to Iyana-Iba": {
          cost: "",
          "mode of transportation": "",
        },
        "Oshodi to Oyingbo": {
          cost: "",
          "mode of transportation": "",
        },
      },
      accomodationSectionStructure: {
        variations: [
          {
            cost: "",
            type: "",
            rooms: "",
          },
        ],
      },
      reportsSectionStructure: {
        Projects: {
          boolean: "",
        },
        Crimes: {
          boolean: "",
        },
        Accidents: {
          boolean: "",
        },
        Electricity: {
          hours: "",
        },
        Notes: {
          boolean: "",
        },
      },
    }),
    [user.LGA]
  );

  const savedState = JSON.parse(localStorage.getItem("oaks-enum-form"));

  // If user has saved changes use changes else use initial state
  const [state, setState] = useState(savedState ?? initialState);

  const setCurrentFormTab = (tab) => {
    setState((prev) => ({ ...prev, currentFormTab: tab }));
  };
  const setCurrentLGA = (LGA) => {
    setState((prev) => ({ ...prev, currentLGA: LGA }));
  };
  const saveFormChanges = () => {
    localStorage.setItem("oaks-enum-form", JSON.stringify(state));
    setState((prev) => ({
      ...prev,
      showSavedNotification: true,
    }));
  };
  const submitForm = async (token) => {
    const formSubmission = prepareFormSubmission();
    console.log(formSubmission);
    setState((prev) => ({
      ...prev,
      isSubmitting: true,
    }));

    console.log("formSubmission:", formSubmission);

    try {
      fetch(`${base_url}form/add_data`, {
        method: "POST",
        body: JSON.stringify(formSubmission),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message.includes("successful")) {
            resetState();
            setState((prev) => ({
              ...prev,
              showSubmissionNotification: true,
              isSubmitting: false,
            }));
          }
          if (data.message.includes("Already submitted")) {
            resetState();
            setState((prev) => ({
              ...prev,
              showDuplicateNotification: true,
              isSubmitting: false,
            }));
          }
        })
        .catch((error) => {
          console.log(error);
          setState((prev) => ({
            ...prev,
            showErrorNotification: true,
            isSubmitting: false,
          }));
        });
    } catch (error) {
      console.log(error);
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    }
  };
  const addItem = ({ item, type, section }) => {
    const duplicate = (section, item) => {
      if (section === "accomodationSectionStructure") {
        return {
          ...state[section],
          [item]: [
            ...state[section][item],
            {
              cost: "",
              type: "",
              rooms: "",
            },
          ],
        };
      } else if (
        section === "commoditySectionStructure" &&
        (item === "Charcoal" || item === "Cement")
      ) {
        return {
          ...state[section],
          [item]: {
            ...state[section][item],
            [type]: [
              ...state[section][item][type],
              {
                price: "",
                weight: "",
              },
            ],
          },
        };
      } else if (
        section === "commoditySectionStructure" &&
        item === "Building Block"
      ) {
        return {
          ...state[section],
          [item]: {
            ...state[section][item],
            [type]: [
              ...state[section][item][type],
              {
                price: "",
                size: "",
              },
            ],
          },
        };
      } else {
        return {
          ...state[section],
          [item]: {
            ...state[section][item],
            [type]: [
              ...state[section][item][type],
              {
                price: "",
                brand: "",
              },
            ],
          },
        };
      }
    };
    const newStuff = duplicate(section, item);
    setState((prev) => ({
      ...prev,
      [section]: newStuff,
    }));
  };
  const removeItem = ({ array, item, type, index, section }) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setState((prev) =>
      section === "accomodationSectionStructure"
        ? {
            ...prev,
            [section]: {
              ...prev[section],
              [item]: newArray,
            },
          }
        : {
            ...prev,
            [section]: {
              ...prev[section],
              [item]: {
                ...prev[section][item],
                [type]: newArray,
              },
            },
          }
    );
  };
  const hideSavedNotification = () => {
    setState((prev) => ({
      ...prev,
      showSavedNotification: false,
    }));
  };
  const hideSubmissionNotification = () => {
    setState((prev) => ({
      ...prev,
      showSubmissionNotification: false,
    }));
  };
  const hideDuplicateNotification = () => {
    setState((prev) => ({
      ...prev,
      showDuplicateNotification: false,
    }));
  };
  const hideErrorNotification = () => {
    setState((prev) => ({
      ...prev,
      showErrorNotification: false,
    }));
  };
  const showProfile = () => {
    setState((prev) => ({
      ...prev,
      showEnumeratorProfile: true,
    }));
  };
  const hideProfile = () => {
    setState((prev) => ({
      ...prev,
      showEnumeratorProfile: false,
    }));
  };
  const setFoodItemValue = (action) => {
    const { foodSectionStructure } = state;
    const { item, type, value, valueTitle, i } = action;

    // Rice
    if (item === "Rice") {
      setState((prev) => {
        const updatedArray = [...foodSectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };
        return {
          ...prev,
          foodSectionStructure: {
            ...foodSectionStructure,
            [item]: {
              ...foodSectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });
    }
    // Beans and Garri
    if (item === "Beans" || item === "Garri") {
      setState((prev) => {
        const updatedArray = [...foodSectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };
        return {
          ...prev,
          foodSectionStructure: {
            ...foodSectionStructure,
            [item]: {
              ...foodSectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });
    }
    // Tomatoes
    if (item === "Tomatoes") {
      setState((prev) => {
        const updatedArray = [...foodSectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };
        return {
          ...prev,
          foodSectionStructure: {
            ...foodSectionStructure,
            [item]: {
              ...foodSectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });
    }
    // Fish
    if (item === "Fish") {
      setState((prev) => {
        const updatedArray = [...foodSectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };
        return {
          ...prev,
          foodSectionStructure: {
            ...foodSectionStructure,
            [item]: {
              ...foodSectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });
    }
    // Single field inputs
    if (singleFieldFoodInputs.includes(item)) {
      setState((prev) => {
        const updatedArray = [...foodSectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };
        return {
          ...prev,
          foodSectionStructure: {
            ...foodSectionStructure,
            [item]: {
              ...foodSectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });
    }
  };
  const setCommodityItemValue = (action) => {
    const { commoditySectionStructure } = state;
    const { item, type, value, valueTitle, i } = action;

    // Single field inputs
    if (singleFieldCommodityInputs.includes(item)) {
      setState((prev) => {
        const updatedArray = [...commoditySectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };
        return {
          ...prev,
          commoditySectionStructure: {
            ...commoditySectionStructure,
            [item]: {
              ...commoditySectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });
    }
    // Charcoal and Cement
    if (["Charcoal", "Cement"].includes(item)) {
      setState((prev) => {
        const updatedArray = [...commoditySectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };

        return {
          ...prev,
          commoditySectionStructure: {
            ...commoditySectionStructure,
            [item]: {
              ...commoditySectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });

      // Clear input if other is not selected
      // const copy = { ...state.commoditySectionStructure };
      // state.commoditySectionStructure[item][type][i]["weight"] !== "Other" &&
      //   delete copy[item][type][i]["answer"];
      // setState((prev) => ({ ...prev, commoditySectionStructure: copy }));
    }
    //  Building Block
    if (item === "Building Block") {
      setState((prev) => {
        const updatedArray = [...commoditySectionStructure[item][type]];
        updatedArray[i] = {
          ...updatedArray[i],
          [valueTitle]: value,
        };

        return {
          ...prev,
          commoditySectionStructure: {
            ...commoditySectionStructure,
            [item]: {
              ...commoditySectionStructure[item],
              [type]: updatedArray,
            },
          },
        };
      });

      // Clear input if other is not selected
      // const copy = { ...state.commoditySectionStructure };
      // state.commoditySectionStructure[item]["prices"][i]["size"] !== "Other" &&
      //   delete copy[item][type][i]["answer"];

      // setState((prev) => ({ ...prev, commoditySectionStructure: copy }));
    }
  };
  const setTransportItemValue = (action) => {
    const { transportSectionStructure } = state;
    const { item, value, valueTitle } = action;

    setState((prev) => {
      const updatedObject = {
        ...transportSectionStructure[item],
        [valueTitle]: value,
      };
      return {
        ...prev,
        transportSectionStructure: {
          ...transportSectionStructure,
          [item]: updatedObject,
        },
      };
    });
  };
  const setAccomodationItemValue = (action) => {
    const { accomodationSectionStructure } = state;
    const { item, value, valueTitle, i } = action;

    setState((prev) => {
      const updatedArray = [...accomodationSectionStructure[item]];
      updatedArray[i] = {
        ...updatedArray[i],
        [valueTitle]: value,
      };
      return {
        ...prev,
        accomodationSectionStructure: {
          ...accomodationSectionStructure,
          [item]: updatedArray,
        },
      };
    });
  };
  const setReportsItemValue = (action) => {
    const { reportsSectionStructure } = state;
    const { item, value, valueTitle, answer } = action;

    // Reports with binary field inputs
    if (reportsBinaryFields.includes(item)) {
      setState((prev) => {
        let updatedObject = { ...reportsSectionStructure[item] };
        updatedObject = {
          ...{
            ...(value === true
              ? { [valueTitle]: value, answer: answer ? answer : "" }
              : { [valueTitle]: value }),
          },
        };
        return {
          ...prev,
          reportsSectionStructure: {
            ...reportsSectionStructure,
            [item]: updatedObject,
          },
        };
      });
    }

    // Electricity
    if (item === "Electricity") {
      setState((prev) => {
        let updatedObject = { ...reportsSectionStructure[item] };
        updatedObject = {
          ...reportsSectionStructure[item],
          [valueTitle]: value,
        };
        return {
          ...prev,
          reportsSectionStructure: {
            ...reportsSectionStructure,
            [item]: updatedObject,
          },
        };
      });
    }
  };
  const calculateOptionsLength = (item) => {
    if (item === "Building Block") {
      return buildingBlockSizes.length;
    }
    if (item === "Charcoal") {
      return charcoalWeights.length;
    }
    if (item === "Cement") {
      return cementBrands.length;
    }
    if (item === "Rice") {
      return riceBrands.length;
    }
    if (item === "Beans") {
      return beanTypes.length;
    }
    if (item === "Garri") {
      return garriTypes.length;
    }
    if (item === "Fish") {
      return fishList.length;
    }
  };
  const handleValue = (value) => {
    const numbersOnly = value.replace(/\D/g, "");
    const formattedNumber = Number(numbersOnly);

    if (formattedNumber.toString().length >= 15) {
      const newNumber = formattedNumber.toString().slice(0, 15);
      return Number(newNumber).toLocaleString("en-us");
    }
    if (
      isNaN(formattedNumber) ||
      formattedNumber.length < 1 ||
      formattedNumber === 0
    ) {
      return "";
    } else {
      console.log(formattedNumber.toLocaleString());
      return formattedNumber.toLocaleString();
    }
  };
  const prepareFormSubmission = () => {
    let object = {};

    const foodItems = [];
    const others = [];

    // Create foodItems array
    Object.keys(state.foodSectionStructure).forEach((item) => {
      if (["Rice", "Beans", "Garri"].includes(item)) {
        if (item === "Rice" || item === "Beans" || item === "Garri") {
          Object.keys(state.foodSectionStructure[item]).forEach((type) => {
            let j = 0;
            while (state.foodSectionStructure[item][type][j]) {
              foodItems.push({
                name: `${item}_${type}`,
                price: parseInt(
                  state.foodSectionStructure[item][type][j]["price"].replace(
                    /,/g,
                    ""
                  )
                ),
                brand:
                  state.foodSectionStructure[item][type][j][
                    item === "Rice" ? "brand" : "type"
                  ],
              });
              j++;
            }
          });
        }
      } else if (item === "Fish") {
        Object.keys(state.foodSectionStructure[item]).forEach((type) => {
          let j = 0;
          while (state.foodSectionStructure[item][type][j]) {
            foodItems.push({
              name: `${item}`,
              price: parseInt(
                state.foodSectionStructure[item][type][j]["price"].replace(
                  /,/g,
                  ""
                )
              ),
              brand: state.foodSectionStructure[item][type][j]["type"],
            });
            j++;
          }
        });
      } else if (item === "Tomatoes") {
        Object.keys(state.foodSectionStructure[item]["prices"][0]).forEach(
          (type) =>
            foodItems.push({
              name: `${item}_${type}`,
              price: parseInt(
                state.foodSectionStructure[item]["prices"][0][type].replace(
                  /,/g,
                  ""
                )
              ),
              brand: "",
            })
        );
      } else {
        Object.keys(state.foodSectionStructure[item]).forEach((type) => {
          foodItems.push({
            name: `${item}_${type}`,
            price: parseInt(
              state.foodSectionStructure[item][type][0]["price"].replace(
                /,/g,
                ""
              )
            ),
            brand: state.foodSectionStructure[item][type][0]["brand"] ?? "",
          });
        });
      }
    });

    // Create others array from commodities
    Object.keys(state.commoditySectionStructure).forEach((item) => {
      if (item === "Cement") {
        Object.keys(state.commoditySectionStructure[item]).forEach((type) => {
          let j = 0;
          while (state.commoditySectionStructure[item][type][j]) {
            others.push({
              name: `${item}_${type}`,
              price: parseInt(
                state.commoditySectionStructure[item][type][j]["price"].replace(
                  /,/g,
                  ""
                )
              ),
              brand: state.commoditySectionStructure[item][type][j]["weight"],
            });
            j++;
          }
        });
      } else if (["Charcoal", "Building Block"].includes(item)) {
        state.commoditySectionStructure[item]["prices"].forEach((type) =>
          others.push({
            name: `${item}_${type[item === "Charcoal" ? "weight" : "size"]}`,
            price: parseInt(type["price"].replace(/,/g, "")),
            brand: "",
          })
        );
      } else {
        Object.keys(state.commoditySectionStructure[item]).forEach((type) => {
          others.push({
            name: `${item}_${type}`,
            price: parseInt(
              state.commoditySectionStructure[item][type][0]["price"].replace(
                /,/g,
                ""
              )
            ),
            brand:
              state.commoditySectionStructure[item][type][0]["brand"] ?? "",
          });
        });
      }
    });

    const electricity = [
      {
        hours_per_week: parseInt(
          state.reportsSectionStructure.Electricity.hours.replace(/,/g, "")
        ),
      },
    ];
    const transports = Object.keys(state.transportSectionStructure).map(
      (item) => ({
        route: item,
        cost: parseInt(
          state.transportSectionStructure[item]["cost"].replace(/,/g, "")
        ),
        mode: state.transportSectionStructure[item]["mode of transportation"],
      })
    );
    const questions = [
      {
        government_project: state.reportsSectionStructure.Projects.boolean,
        comment_for_government_project:
          state.reportsSectionStructure.Projects.answer ?? "",
        crime_report: state.reportsSectionStructure.Crimes.boolean,
        comment_for_crime_report:
          state.reportsSectionStructure.Crimes.answer ?? "",
        accidents: state.reportsSectionStructure.Accidents.boolean,
        comment_for_accidents:
          state.reportsSectionStructure.Accidents.answer ?? "",
        note: state.reportsSectionStructure.Notes.answer ?? "",
      },
    ];
    const accomodations = state.accomodationSectionStructure.variations.map(
      (variant) => ({
        price: parseInt(variant.cost.replace(/,/g, "")),
        type: variant.type,
        rooms: variant.rooms,
      })
    );
    const lga = state.currentLGA;

    object = {
      foodItems,
      others,
      electricity,
      transports,
      questions,
      accomodations,
      lga,
    };

    return object;
  };
  const resetState = () => {
    localStorage.removeItem("oaks-enum-form");
    setState(initialState);
  };
  const logOut = () => {
    try {
      fetch(`${base_url}logout`)
        .then((res) => res.json())
        .then(({ success }) => {
          if (success) {
            secureLocalStorage.clear();
            setUser(null);
            setIsLoggedIn(false);
            return navigate("/");
          }
        })
        .catch((error) => {
          console.log("error:", error);
          secureLocalStorage.clear();
          setUser(null);
          setIsLoggedIn(false);
          return navigate("/");
        });
    } catch (err) {
      console.log("error:", err);
      secureLocalStorage.clear();
      setUser(null);
      setIsLoggedIn(false);
      return navigate("/");
    }
  };

  const {
    foodSectionStructure,
    commoditySectionStructure,
    transportSectionStructure,
    accomodationSectionStructure,
    reportsSectionStructure,
  } = state;

  const totalNumOfFields = useMemo(
    () =>
      countEmptyStringFields({
        foodSectionStructure,
        commoditySectionStructure,
        transportSectionStructure,
        accomodationSectionStructure,
        reportsSectionStructure,
      }),
    [
      foodSectionStructure,
      commoditySectionStructure,
      transportSectionStructure,
      accomodationSectionStructure,
      reportsSectionStructure,
    ]
  );
  const numOfValidFields = useMemo(
    () =>
      countValidFields({
        foodSectionStructure,
        commoditySectionStructure,
        transportSectionStructure,
        accomodationSectionStructure,
        reportsSectionStructure,
      }),
    [
      foodSectionStructure,
      commoditySectionStructure,
      transportSectionStructure,
      accomodationSectionStructure,
      reportsSectionStructure,
    ]
  );
  const foodNumOfFields = useMemo(
    () =>
      countEmptyStringFields({
        foodSectionStructure,
      }),
    [foodSectionStructure]
  );
  const numOfValidFoodFields = useMemo(
    () =>
      countValidFields({
        foodSectionStructure,
      }),
    [foodSectionStructure]
  );
  const commodityNumOfFields = useMemo(
    () =>
      countEmptyStringFields({
        commoditySectionStructure,
      }),
    [commoditySectionStructure]
  );
  const numOfValidCommodityFields = useMemo(
    () =>
      countValidFields({
        commoditySectionStructure,
      }),
    [commoditySectionStructure]
  );
  const transportNumOfFields = useMemo(
    () =>
      countEmptyStringFields({
        transportSectionStructure,
      }),
    [transportSectionStructure]
  );
  const numOfValidTransportFields = useMemo(
    () =>
      countValidFields({
        transportSectionStructure,
      }),
    [transportSectionStructure]
  );
  const accomodationNumOfFields = useMemo(
    () =>
      countEmptyStringFields({
        accomodationSectionStructure,
      }),
    [accomodationSectionStructure]
  );
  const numOfValidAccomodationFields = useMemo(
    () =>
      countValidFields({
        accomodationSectionStructure,
      }),
    [accomodationSectionStructure]
  );

  const foodProgressPercentage = useMemo(
    () => Math.trunc((numOfValidFoodFields / foodNumOfFields) * 100),
    [numOfValidFoodFields, foodNumOfFields]
  );
  const commodityProgressPercentage = useMemo(
    () => Math.trunc((numOfValidCommodityFields / commodityNumOfFields) * 100),
    [numOfValidCommodityFields, commodityNumOfFields]
  );
  const transportProgressPercentage = useMemo(
    () => Math.trunc((numOfValidTransportFields / transportNumOfFields) * 100),
    [numOfValidTransportFields, transportNumOfFields]
  );
  const accomodationProgressPercentage = useMemo(
    () =>
      Math.trunc(
        (numOfValidAccomodationFields / accomodationNumOfFields) * 100
      ),
    [numOfValidAccomodationFields, accomodationNumOfFields]
  );
  const progressPercentage = useMemo(
    () => Math.trunc((numOfValidFields / totalNumOfFields) * 100),
    [numOfValidFields, totalNumOfFields]
  );

  // hide saved notification after three seconds
  useEffect(() => {
    let timeoutId;
    if (state.showSavedNotification) {
      timeoutId = setTimeout(() => {
        hideSavedNotification();
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [state.showSavedNotification]);

  return (
    <EnumeratorFormContext.Provider
      value={{
        state,
        setState,
        setCurrentFormTab,
        setCurrentLGA,
        setFoodItemValue,
        setCommodityItemValue,
        setTransportItemValue,
        setAccomodationItemValue,
        setReportsItemValue,
        addItem,
        removeItem,
        showProfile,
        hideProfile,
        saveFormChanges,
        hideSavedNotification,
        hideDuplicateNotification,
        hideErrorNotification,
        calculateOptionsLength,
        submitForm,
        hideSubmissionNotification,
        totalNumOfFields,
        numOfValidFields,
        foodProgressPercentage,
        commodityProgressPercentage,
        transportProgressPercentage,
        accomodationProgressPercentage,
        progressPercentage,
        handleValue,
        logOut,
      }}
    >
      {children}
    </EnumeratorFormContext.Provider>
  );
}

export default EnumeratorFormContext;
