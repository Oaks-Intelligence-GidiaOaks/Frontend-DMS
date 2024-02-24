import { useEffect, useState } from "react";
import CategoryTab from "../../components/CategoryTab";
import {
  Restaurant,
  DirectionsCar,
  Home,
  PowerSettingsNew,
  Shuffle,
  Accessibility,
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
import { Loading } from "../../components/reusable";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../App";

const FormResponses = () => {
  const [activeTab, setActiveTab] = useState("food");
  // const [isLoading, setIsLoading] = useState(true);

  // styles
  const activeStyle = "bg-oaksgreen text-white";
  const nonActiveStyle = "bg-white";

  // admin submission rate
  const getSubRate = useQuery({
    queryKey: ["getSubRateTl"],
    queryFn: async () =>
      await axios.get("form_response/admin_response_tracker"),
  });

  const getFoodData = useQuery({
    queryKey: ["getFoodData"],
    queryFn: async () => {
      const res = await axios.get("form_response/food_product");

      if (res.statusText == "OK") {
        return res;
      }
    },
  });

  const getAvgFoodData = useQuery({
    queryKey: ["getAvgFoodData"],
    queryFn: async () => {
      const res = await axios.get("form_response/prev_food_product");
      return res;
    },
  });

  const getTransData = useQuery({
    queryKey: ["getTransData"],
    queryFn: async () => {
      const res = await axios.get("form_response/transport");
      return res;
    },
  });

  const getAvgTransData = useQuery({
    queryKey: ["getAvgTransData"],
    queryFn: async () => await axios.get("form_response/prev_transport"),
  });

  const getAccData = useQuery({
    queryKey: ["getAccData"],
    queryFn: async () => await axios.get("form_response/accomodation"),
  });
  const getAvgAccData = useQuery({
    queryKey: ["getAvgAccData"],
    queryFn: async () => await axios.get("form_response/prev_accomodation"),
  });

  const getElecData = useQuery({
    queryKey: ["getElecData"],
    queryFn: async () => await axios.get("form_response/electricity"),
  });
  const getAvgElecData = useQuery({
    queryKey: ["getAvgElecData"],
    queryFn: async () => await axios.get("form_response/prev_electricity"),
  });

  const getOthersData = useQuery({
    queryKey: ["getOthersData"],
    queryFn: async () => await axios.get("form_response/other_products"),
  });
  const getAvgOthersData = useQuery({
    queryKey: ["getAvgOthersData"],
    queryFn: async () => await axios.get("form_response/prev_other_products"),
  });

  const getNotesData = useQuery({
    queryKey: ["getNotesData"],
    queryFn: async () => await axios.get("form_response/questions"),
  });

  const getClothData = useQuery({
    queryKey: ["getClothData"],
    queryFn: async () => await axios.get("form_response/clothings"),
  });

  const getAvgClothData = useQuery({
    queryKey: ["getAvgClothData"],
    queryFn: async () => await axios.get("form_response/prev_clothings"),
  });

  // all data values
  let submissionData = getSubRate?.data?.data || null;

  let foodData = getFoodData?.data?.data?.data || null;
  let avgFoodData = getAvgFoodData?.data?.data?.data || null;

  let transportData = getTransData?.data?.data?.data || null;
  let avgTransportData = getAvgTransData?.data?.data?.data || null;

  let accomodationData = getAccData?.data?.data?.data || null;
  let avgAccData = getAvgAccData?.data?.data?.data || null;

  let electricityData = getElecData?.data?.data?.data || null;
  let avgElecData = getAvgElecData?.data?.data?.data || null;

  let othersData = getOthersData?.data?.data?.data || null;
  let avgOthersData = getAvgOthersData?.data?.data?.data || null;

  let notesData = getNotesData?.data?.data?.data || null;

  let clothingData = getClothData?.data?.data?.data || null;
  let avgClothingData = getAvgClothData?.data?.data?.data || null;

  //  calculate submissions
  let expectedSubmission = submissionData ? submissionData.totalTeamLeads : 0;

  let submissions = submissionData
    ? submissionData.results.filter((res) => res.status).length
    : 0;
  let noResponse = submissions ? expectedSubmission - submissions : 0;

  const getFood = async () => {
    setActiveTab("food");
    queryClient.invalidateQueries({ queryKey: ["getFoodData"] });
    // queryClient.refetchQueries("getFoodData");
  };

  const getTransport = async () => {
    setActiveTab("transport");
    queryClient.invalidateQueries({ queryKey: ["getTransData"] });
    // queryClient.refetchQueries("getTransData");
  };

  const getAccomodation = async () => {
    setActiveTab("accomodation");
    queryClient.invalidateQueries({ queryKey: ["getAccData"] });
    // queryClient.refetchQueries("getAccData");
  };

  const getElectricity = async () => {
    setActiveTab("electricity");
    queryClient.invalidateQueries({ queryKey: ["getElecData"] });
    // queryClient.refetchQueries("getElecData");
  };

  const getOthers = async () => {
    setActiveTab("others");
    queryClient.invalidateQueries({ queryKey: ["getOthersData"] });
    // queryClient.refetchQueries("getOthersData");
  };

  const getNotes = async () => {
    setActiveTab("notes");
    queryClient.invalidateQueries({ queryKey: ["getNotesData"] });
    // queryClient.refetchQueries("getNotesData");
  };

  const getClothing = async () => {
    setActiveTab("clothing");
    queryClient.invalidateQueries({ queryKey: ["getClothData"] });
    // queryClient.refetchQueries("getClothData");
  };

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="rounded justify-between bg-oaksyellow p-3 flex xs:flex-1 md:flex-initial items-center gap-4 text-xs">
          <p className="text-white whitespace-nowrap">Expected submissions</p>
          <p className="rounded p-1  bg-white">{expectedSubmission}</p>
        </div>

        <div className="flex p-3 lg:ml-8 items-center gap-6 w-fit rounded bg-white border border-oaksyellow">
          <p className="">Submissions</p>
          <p className="p-1 bg-gray-100 rounded text-sm">{submissions}</p>
        </div>

        <div className="rounded bg-white border border-oaksyellow  flex items-center p-3 gap-10 xs:gap-6 lg:ml-auto cursor-pointer">
          <p>No response</p>
          <p className="bg-gray-100 p-1 rounded text-sm px-2">{noResponse}</p>
        </div>
      </div>

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
          <CategoryTab
            text="Clothing"
            Icon={Accessibility}
            activeTab={activeTab}
          />
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

      <div className="bg-white h-80 w-full">
        {getFood.isLoading ? (
          <div className="h-32">
            <Loading />
          </div>
        ) : (
          <>
            {activeTab === "food" && (
              <FoodGrid avgData={avgFoodData} data={foodData} />
            )}
            {activeTab === "transport" && (
              <TransportGrid data={transportData} avgData={avgTransportData} />
            )}
            {activeTab === "accomodation" && (
              <AccomodationGrid data={accomodationData} avgData={avgAccData} />
            )}
            {activeTab === "clothing" && (
              <ClothingGrid data={clothingData} avgData={avgClothingData} />
            )}
            {activeTab === "electricity" && (
              <ElectricityGrid data={electricityData} avgData={avgElecData} />
            )}
            {activeTab === "others" && (
              <OthersGrid data={othersData} avgData={avgOthersData} />
            )}
            {activeTab === "notes" && <NotesGrid data={notesData} />}
          </>
        )}
      </div>
    </div>
  );
};

export default FormResponses;
