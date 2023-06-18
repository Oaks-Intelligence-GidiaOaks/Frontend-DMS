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

  useEffect(() => {
    axios
      .get(`form_response/master_list_data`)
      .then((res) => setMasterList(res.data.forms))
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
              state: State,
              transports,
              electricity,
              lga: LGA,
              accomodations,
              clothings,
              created_by,
              _id,
            } = master;

            const foodObj = await foodItems
              .map((food, i) => ({
                [`Price of ${food?.name}`]: food?.price,
                [`Brand of ${food?.name}`]:
                  food?.brand < 1 ? "N/A" : food?.brand,
              }))
              .reduce((acc, obj) => {
                return {
                  ...acc,
                  ...obj,
                };
              }, {});

            const clothingsObj = await clothings
              ?.map((cloth, i) => ({
                [`Cloth category`]: cloth?.category,
                [`Cloth subcategory`]: cloth?.sub_category,
                [`Cloth size`]: cloth?.size,
                [`Cloth Price`]: cloth?.price,
              }))
              ?.reduce((acc, obj) => {
                return {
                  ...acc,
                  ...obj,
                };
              }, {});

            const accObj = await accomodations
              .map((acc, i) => ({
                [`${acc?.rooms} room ${acc?.type}`]: acc?.price,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const transportObj = await transports
              .map((transport, i) => ({
                [`Route ${i + 1}`]: transport?.route,
                [`Mode ${i + 1}`]: transport?.mode,
                [`Route ${i + 1} cost`]: transport?.cost,
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
                [`Price of ${item?.name}`]: item.price ?? "N/A",
                [`Brand of ${item?.name}`]:
                  item?.brand?.length < 1 ? "N/A" : item?.brand,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              });

            const transformedObj = {
              S_N: i + 1,
              _id,
              ID: created_by?.id,
              State,
              LGA,
              Food: "food",
              ...foodObj,
              Transport: "transport",
              ...transportObj,
              Accomodation: "accomodation",
              ...accObj,
              Clothing: "Clothing",
              ...clothingsObj,
              Electricity: "electricity",
              ...electricityObj,
              Others: "commodities",
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
