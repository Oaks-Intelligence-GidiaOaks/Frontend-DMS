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

import MasterGrid from "../../components/grid/MasterGrid";
import axios from "axios";

const MasterList = () => {
  const [activeTab, setActiveTab] = useState("food");
  const [masterList, setMasterList] = useState(null);
  const [newMaster, setNewMaster] = useState(null);

  if (newMaster) {
    // console.log(newMaster);
  }

  if (masterList) {
    console.log(masterList);
  }

  useEffect(() => {
    axios
      .get(`form_response/master_list_data`)
      .then((res) => setMasterList(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    async function transformData() {
      try {
        let waitedData = await Promise.all(
          masterList.map(async (master, i) => {
            const {
              foodItems,
              others,
              state,
              transports,
              electricity,
              lga,
              accomodations,
              created_by,
              _id,
            } = master;

            const foodObj = await foodItems
              .map((food, i) => ({
                [`food_${i}`]: food.name,
                [`foodPrice_${i}`]: food.price,
                [`foodBrand_${i}`]: food.brand,
              }))
              .reduce((acc, obj) => {
                return {
                  ...acc,
                  ...obj,
                };
              }, {});

            const accObj = await accomodations
              .map((acc, i) => ({
                [`accType_${i}`]: acc.type,
                [`accPrice_${i}`]: acc.price,
                [`accRooms_${i}`]: acc.rooms,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const transportObj = await transports
              .map((transport, i) => ({
                [`transport_${i}`]: transport.route,
                [`transMode_${i}`]: transport.mode,
                [`transCost_${i}`]: transport.cost,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              });

            const electricityObj = await electricity.reduce((acc, obj) => {
              let key = Object.keys(obj)[0];
              let value = Object.values(obj);

              acc[key] = value;

              return acc;
            });

            const othersObj = await others
              .map((item, i) => ({
                [`prodName_${i}`]: item.name,
                [`prodPrice_${i}`]: item.price,
                [`prodBrand_${i}`]: item.brand,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              });

            const transformedObj = {
              S_N: i + 1,
              _id,
              ID: created_by.id,
              lga,
              food: "food",
              ...foodObj,
              transport: "transport",
              ...transportObj,
              accomodation: "accomodation",
              ...accObj,
              electricity: "electricity",
              ...electricityObj,
              others: "commodities",
              ...othersObj,
            };

            return transformedObj;
          })
        );

        setNewMaster(waitedData);
      } catch (err) {
        console.error(err);
      }
    }

    masterList ? transformData() : null;
  }, [masterList]);

  // styles
  const activeStyle = "bg-oaksgreen text-white";
  const nonActiveStyle = "bg-white";

  // helper functions
  const getTabData = (tabValue) => {
    setActiveTab(tabValue);
    // make request to get tab data
  };

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="rounded justify-between bg-oaksyellow p-3 flex xs:flex-1 md:flex-initial items-center gap-4 text-xs">
          <p className="text-white whitespace-nowrap">Master List</p>
          {/* <p className="rounded p-1  bg-white">585</p> */}
        </div>

        {/* <div className="flex p-3 lg:ml-8 items-center gap-6 w-fit rounded bg-white border border-oaksyellow">
          <p className="">Submissions</p>
          <p className="p-1 bg-gray-100 rounded text-sm">667</p>
        </div>

        <div className="rounded bg-white border border-oaksyellow  flex items-center p-3 gap-10 xs:gap-6 lg:ml-auto cursor-pointer">
          <p>No response</p>
          <p className="bg-gray-100 p-1 rounded text-sm px-2">18</p>
        </div> */}
      </div>

      {/* <div>
        <CategoryTab text="Submit" Icon={Download} />
      </div> */}

      {/* table */}
      <div className="bg-white h-80 w-full text-[6px]">
        <MasterGrid data={newMaster ?? newMaster} />
      </div>
    </div>
  );
};

export default MasterList;
