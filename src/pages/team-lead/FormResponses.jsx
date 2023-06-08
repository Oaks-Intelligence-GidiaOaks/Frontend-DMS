import React, { useEffect, useState } from "react";
import CategoryTab from "../../components/CategoryTab";
import {
  Restaurant,
  DirectionsCar,
  Home,
  PowerSettingsNew,
  Shuffle,
  Summarize,
  Download,
} from "@mui/icons-material";

import {
  OthersGrid,
  NotesGrid,
  FoodGrid,
  ElectricityGrid,
  TransportGrid,
  AccomodationGrid,
  ClothingGrid,
} from "../../components/grid";
import OaksSlider from "../../components/Slider";
import axios from "axios";

const FormResponses = () => {
  const [activeTab, setActiveTab] = useState("food");
  const [foodData, setFoodData] = useState(null);
  const [transportData, setTransportData] = useState(null);
  const [accomodationData, setAccomodationData] = useState(null);
  const [electricityData, setElectricityData] = useState(null);
  const [othersData, setOthersData] = useState(null);
  const [notesData, setNotesData] = useState(null);
  const [clothingData, setClothingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [sub, setSub] = useState(null);

  // console.log()

  // styles
  const activeStyle = "bg-oaksgreen text-white";
  const nonActiveStyle = "bg-white";

  useEffect(() => {
    axios
      .get("form_response/food_product")
      .then((res) => {
        setFoodData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get(`team_lead_dashboard/submission_rate`)
      .then((res) => {
        console.log(res.data);
        setSub(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getFood = async () => {
    await axios.get("form_response/food_product").then((res) => {
      setFoodData(res.data);
      setActiveTab("food");
    });
  };

  const getTransport = async () => {
    await axios
      .get("form_response/transport")
      .then((res) => {
        setTransportData(res.data);
        setActiveTab("transport");
      })
      .catch((err) => console.error(err));
  };

  const getAccomodation = async () => {
    await axios
      .get("form_response/accomodation")
      .then((res) => {
        setAccomodationData(res.data);
        setActiveTab("accomodation");
      })
      .catch((err) => console.log(err));
  };

  const getElectricity = async () => {
    await axios
      .get("form_response/electricity")
      .then((res) => {
        setElectricityData(res.data);
        setActiveTab("electricity");
      })
      .catch((err) => console.log(err));
  };

  const getOthers = async () => {
    await axios
      .get("form_response/other_products")
      .then((res) => {
        setOthersData(res.data);
        setActiveTab("others");
      })
      .catch((err) => console.log(err));
  };

  const getNotes = async () => {
    await axios
      .get("form_response/questions")
      .then((res) => {
        setNotesData(res.data);
        setActiveTab("notes");
      })
      .catch((err) => console.log(err));
  };

  const getClothing = async () => {
    await axios
      .get("form_response/clothings")
      .then((res) => {
        setClothingData(res.data);
        // console.log(res.data);
        setActiveTab("clothing");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="rounded justify-between bg-oaksyellow p-3 flex xs:flex-1 md:flex-initial items-center gap-4 text-xs">
          <p className="text-white whitespace-nowrap">Expected submissions</p>
          <p className="rounded p-1  bg-white">
            {sub && sub?.submited + sub?.notSubmited}
          </p>
        </div>

        <div className="flex p-3 lg:ml-8 items-center gap-6 w-fit rounded bg-white border border-oaksyellow">
          <p className="">Submissions</p>
          <p className="p-1 bg-gray-100 rounded text-sm">
            {sub && sub.submited}
          </p>
        </div>

        <div className="rounded bg-white border border-oaksyellow  flex items-center p-3 gap-10 xs:gap-6 lg:ml-auto cursor-pointer">
          <p>No response</p>
          <p className="bg-gray-100 p-1 rounded text-sm px-2">
            {sub && sub.notSubmited}
          </p>
        </div>
      </div>

      {/* categories */}
      {/* <div className="flex items-center gap-3 overflow-x-scroll xs:scrollbar-hide md:scrollbar-default lg:scrollbar-hide "> */}
      <OaksSlider slideDefault={5} break1={3} break2={2} break3={2}>
        <div
          className={`rounded w-fit mr-3 ${
            activeTab === "food" ? "bg-oaksgreen text-white" : "bg-white"
          }`}
          onClick={() => getFood()}
        >
          <CategoryTab text="Food" Icon={Restaurant} activeTab={activeTab} />
        </div>

        <div
          className={`rounded ${
            activeTab === "transport" ? "bg-oaksgreen text-white" : "bg-white"
          }`}
          onClick={() => getTransport()}
        >
          <CategoryTab
            text="Transportation"
            Icon={DirectionsCar}
            activeTab={activeTab}
          />
        </div>

        <div
          className={`rounded ${
            activeTab === "accomodation" ? activeStyle : nonActiveStyle
          }`}
          onClick={() => getAccomodation()}
        >
          <CategoryTab text="Accomodation" Icon={Home} activeTab={activeTab} />
        </div>

        <div
          className={`rounded ${
            activeTab === "clothing" ? activeStyle : nonActiveStyle
          }`}
          onClick={() => getClothing()}
        >
          <CategoryTab text="Clothing" Icon={Home} activeTab={activeTab} />
        </div>

        <div
          className={`rounded ${
            activeTab === "electricity" ? activeStyle : nonActiveStyle
          }`}
          onClick={() => getElectricity()}
        >
          <CategoryTab
            text="Electricity"
            Icon={PowerSettingsNew}
            activeTab={activeTab}
          />
        </div>

        <div
          className={`rounded ${
            activeTab === "others" ? activeStyle : nonActiveStyle
          }`}
          onClick={() => getOthers()}
        >
          <CategoryTab text="Others" Icon={Shuffle} activeTab={activeTab} />
        </div>

        <div
          className={`rounded ${
            activeTab === "notes" ? activeStyle : nonActiveStyle
          }`}
          onClick={() => getNotes()}
        >
          <CategoryTab text="Notes" Icon={Summarize} activeTab={activeTab} />
        </div>
      </OaksSlider>
      {/* </div> */}

      {/* table */}

      <div className="bg-white h-80 w-full">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <>
            {activeTab === "food" && <FoodGrid data={foodData} />}
            {activeTab === "transport" && (
              <TransportGrid data={transportData ?? transportData} />
            )}
            {activeTab === "accomodation" && (
              <AccomodationGrid data={accomodationData ?? accomodationData} />
            )}
            {activeTab === "clothing" && (
              <ClothingGrid data={clothingData ?? clothingData} />
            )}
            {activeTab === "electricity" && (
              <ElectricityGrid data={electricityData ?? electricityData} />
            )}
            {activeTab === "others" && (
              <OthersGrid data={othersData ?? othersData} />
            )}
            {activeTab === "notes" && (
              <NotesGrid data={notesData ?? notesData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormResponses;
