import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import MasterGrid from "../../components/grid/MasterGrid";
import axios from "axios";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { BiDownload } from "react-icons/bi";
import { arrangeTime } from "../../lib/helpers";

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
          setMasterList(res.data.forms);
          setTotalDataCount(res.data.total);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  }, [endDateValue, pageNo]);

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
              clothings,
              lga: LGA,
              accomodations,
              created_by,
              _id,
              updated_at,
            } = master;

            const clothingsObj = await clothings
              ?.map((cloth, i) => ({
                [`Cloth category`]: cloth?.category,
                [`Cloth subcategory`]: cloth?.sub_category,
                [`Cloth size`]: cloth?.size,
                [`Cloth Price`]: cloth?.price === 0 ? "N/A" : cloth?.price,
              }))
              ?.reduce((acc, obj) => {
                return {
                  ...acc,
                  ...obj,
                };
              }, {});

            const foodObj = await foodItems
              ?.map((food, i) => ({
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
                [`${acc?.rooms} room`]:
                  acc?.price === "0" ? "N/A" : `${acc?.price} (${acc?.type})`,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const transportObj = await transports
              ?.map((transport, i) => ({
                [`Route ${i + 1}`]: transport?.route,
                [`Mode ${i + 1} `]: transport?.mode,
                [`Route ${i + 1} cost`]: transport?.cost,
              }))
              ?.reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const electricityObj =
              electricity.length > 0 &&
              (await electricity?.reduce((acc, obj) => {
                let key = Object.keys(obj)[0];
                let value = Object.values(obj);

                acc[key] = value;

                return acc;
              }));

            const othersObj = await others
              .map((item, i) => ({
                [`Price of ${item?.name}`]:
                  item?.price === "0"
                    ? "N/A"
                    : item?.price
                    ? item?.price
                    : "N/A",
                [`Brand of ${item?.name}`]:
                  item?.brand?.length < 1 ? "N/A" : item?.brand,
              }))
              .reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const transformedObj = {
              S_N: i + 1,
              Date: arrangeTime(updated_at),
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

  let paginationItems =
    totalDataCount &&
    masterList &&
    Math.floor(totalDataCount / masterList.length);

  let PageNumbers = ({ totalPages, currentPage, onPageChange }) => {
    let numArr = [];

    for (let i = 0; i < paginationItems; i++) {
      numArr.push(i + 1);
    }

    return (
      <div className="flex flex-wrap space-x-2">
        {numArr.length > 0 &&
          numArr.map((singleNo) => (
            <button
              className={`grid place-items-center my-1 text-xs text-gray-800 h-5 w-5  rounded-full ${
                singleNo === pageNo ? "bg-oaksgreen text-white" : "bg-gray-200"
              } `}
              key={singleNo}
              onClick={() => setPageNo(singleNo)}
            >
              <span>{singleNo}</span>
            </button>
          ))}
      </div>
    );
  };

  const handleStartDateChange = (args) => {
    let formatDate = new Date(args.value).toISOString().split("T")[0];

    setStartDateValue(`${formatDate}`);
  };

  const handleEndDateChange = (args) => {
    let formatDate = new Date(args.value).toISOString().split("T")[0];

    setEndDateValue(`${formatDate}`);
  };

  const handlePageNumberChange = (no) => {
    setPageNo(no);
  };

  const handleDownload = () => {
    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(newMaster);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-3">
      <div className="flex flex-col space-y-6 lg:flex-row  items-end justify-between">
        <div className="flex items-center justify-around mr-auto">
          <div className="w-32">
            <p className="mb-2 text-center">From</p>
            <div className="border px-2 rounded">
              <DatePickerComponent
                cssClass="custom-datepicker"
                id="datepicker"
                change={handleStartDateChange}
              />
            </div>
          </div>

          <div className="border border-gray-900 mx-3 w-6 my-auto" />

          <div className="w-32">
            <p className="mb-2 text-center">To</p>
            <div className="border px-2 rounded">
              <DatePickerComponent
                change={handleEndDateChange}
                id="datepicker"
                // value={endDateValue}
              />
            </div>
          </div>
        </div>

        <div className="">
          <button
            onClick={handleDownload}
            className="px-3 ml-auto p-2 flex items-center space-x-3 rounded-md drop-shadow-lg text-sm  bg-white hover:bg-oaksyellow hover:text-white"
          >
            <div className="w-fit p-1 rounded text-black bg-gray-100">
              <BiDownload />
            </div>
            <span className="pr-6 text-xs">Download</span>
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white h-80 w-full text-[6px]">
        <MasterGrid data={newMaster ?? newMaster} />

        <div className="p-2 border ">
          <div className="ml-auto flex items-center">{<PageNumbers />}</div>
        </div>
      </div>
    </div>
  );
};

export default MasterList;
