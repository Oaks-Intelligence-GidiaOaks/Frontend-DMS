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

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

const MasterList = () => {
  const [activeTab, setActiveTab] = useState("food");
  const [masterList, setMasterList] = useState(null);
  const [newMaster, setNewMaster] = useState(null);
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  let [totalDataCount, setTotalDataCount] = useState(null);
  let [pageNo, setPageNo] = useState(1);

  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27);

  useEffect(() => {
    try {
      setMasterList(null);
      setNewMaster(null);
      axios
        .get(
          `form_response/master_list_data?startDateFilter=${startDateValue}&endDateFilter=${endDateValue}&page=${pageNo}`
        )
        .then((res) => {
          console.log(res.data);
          setMasterList(res.data.forms);
          setTotalDataCount(res.data.total);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  }, [endDateValue]);

  useEffect(() => {
    async function transformData() {
      try {
        let waitedData = await Promise.all(
          masterList?.map(async (master, i) => {
            const {
              foodItems,
              others,
              state: State,
              transports,
              electricity,
              lga: LGA,
              accomodations,
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

            const accObj = await accomodations
              ?.map((acc, i) => ({
                [`${acc?.rooms} room ${acc?.type}`]: acc?.price,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            // console.log(transports);

            const transportObj = await transports
              ?.map((transport, i) => ({
                [`Route ${i + 1}`]: transport?.route,
                [`Mode ${i + 1} `]: transport?.mode,
                [`Route ${i + 1} cost`]: transport?.cost,
              }))
              ?.reduce((acc, obj) => {
                return { ...acc, ...obj };
              });

            console.log(transportObj);

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
                  item?.brand.length < 1 ? "N/A" : item?.brand,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              });

            const transformedObj = {
              S_N: i + 1,
              _id,
              ID: created_by.id,
              State,
              LGA,
              Food: "food",
              ...foodObj,
              Transport: "transport",
              ...transportObj,
              Accomodation: "accomodation",
              ...accObj,
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

  let paginationItems =
    totalDataCount && masterList && totalDataCount / masterList.length;

  let PageNumers = () => {
    for (let i = 0; i < paginationItems; i++) {
      return (
        <p
          onClick={() => setPageNo(i + 1)}
          className="h-6 w-6 cursor-pointer mx-2 text-center text-blue-500 bg-gray-200 text-sm rounded-full"
        >
          {i + 1}
        </p>
      );
    }
  };

  const handleStartDateChange = (args) => {
    let formatDate = new Date(args.value).toISOString().split("T")[0];

    setStartDateValue(`${formatDate}`);
  };

  const handleEndDateChange = (args) => {
    let formatDate = new Date(args.value).toISOString().split("T")[0];

    setEndDateValue(`${formatDate}`);
    console.log(formatDate);
  };

  const handlePageNumberChange = (no) => {
    setPageNo(no);
  };

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center gap-3 flex-wrap">
        {/* <div className="rounded justify-between bg-oaksyellow p-3 flex xs:flex-1 md:flex-initial items-center gap-4 text-xs">
          <p className="text-white whitespace-nowrap">Expected submissions</p>
          <p className="rounded p-1  bg-white">{}</p>
        </div> */}

        {/* <div className="flex p-3 lg:ml-8 items-center gap-6 w-fit rounded bg-white border border-oaksyellow">
          <p className="">Submissions</p>
          <p className="p-1 bg-gray-100 rounded text-sm">.</p>
        </div> */}

        {/* <div className="rounded bg-white border border-oaksyellow  flex items-center p-3 gap-10 xs:gap-6 lg:ml-auto cursor-pointer">
          <p>No response</p>
          <p className="bg-gray-100 p-1 rounded text-sm px-2">18</p>
        </div> */}
      </div>

      <div className="flex items-center w-full justify-around gap-16">
        <div className="w-32">
          <p>From</p>
          <DatePickerComponent
            id="datepicker"
            // value={startDateValue}
            // min={minDate}
            change={handleStartDateChange}
            // max={maxDate}
          />
        </div>

        <div className="w-32">
          <p>To</p>
          <DatePickerComponent
            change={handleEndDateChange}
            id="datepicker"
            // value={endDateValue}
          />
        </div>
      </div>

      {/* table */}
      <div className="bg-white h-80 w-full text-[6px]">
        <MasterGrid data={newMaster ?? newMaster} />

        <div className="p-2 border ">
          <div className="ml-auto border flex items-center">
            {<PageNumers />}
            {/* <p className="h-6 w-6 mx-2 text-center text-blue-500 bg-gray-200 text-sm rounded-full">
              1
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterList;
