import React, { useEffect, useState } from "react";

import MasterGrid from "../../components/grid/MasterGrid";
import axios from "axios";
import { arrangeTime } from "../../lib/helpers";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

const MasterList = () => {
  const [masterList, setMasterList] = useState(null);
  const [newMaster, setNewMaster] = useState(null);
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  let [totalDataCount, setTotalDataCount] = useState(null);
  let [pageNo, setPageNo] = useState(1);

  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 7);
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 27);

  useEffect(() => {
    axios
      .get(
        `form_response/master_list_data?startDateFilter=${startDateValue}&endDateFilter=${endDateValue}&page=${pageNo}`
      )
      .then((res) => {
        setMasterList(res.data.forms);
        setTotalDataCount(res.data.total);
      })
      .catch((err) => console.log(err));
  }, [pageNo, endDateValue]);

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
              updated_at,
              _id,
              
            } = master;

            const foodObj = await foodItems
              ?.map((food, i) => ({
                [`Price of ${food?.name}`]:
                  food?.price === "0" ? "N/A" : food?.price,
                [`Brand of ${food?.name}`]:
                  food?.brand < 1 ? "N/A" : food?.brand,
                  [`Size of ${food?.name}`]: food?.size ?? "N/A"
              }))
              ?.reduce((acc, obj) => {
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
                [`Cloth Price`]: cloth?.price === 0 ? "N/A" : cloth?.price,
              }))
              ?.reduce((acc, obj) => {
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
              ?.reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const transportObj = await transports
              ?.map((transport, i) => ({
                [`Route ${i + 1}`]: transport?.route,
                [`Mode ${i + 1}`]: transport?.mode,
                [`Route ${i + 1} cost`]: transport?.cost,
              }))
              ?.reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const electricityObj =
              electricity.length > 0 &&
              (await electricity?.reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {}));

            const othersObj = await others
              ?.map((item, i) => ({
                [`Price of ${item?.name}`]: item.price ?? "N/A",
                [`Brand of ${item?.name}`]:
                  item?.brand?.length < 1 ? "N/A" : item?.brand,
                  [`Size of ${item.name}`]: item?.size ?? "N/A"
              }))
              ?.reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});

            const transformedObj = {
              // S_N: i + 1,
              _id,
              Date: arrangeTime(updated_at),
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
  // styles
  const activeStyle = "bg-oaksgreen text-white";
  const nonActiveStyle = "bg-white";

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="rounded justify-between bg-oaksyellow p-3 flex xs:flex-1 md:flex-initial items-center gap-4 text-xs">
          <p className="text-white whitespace-nowrap">Master List</p>
        </div>
      </div>

      <div className="flex  items-center justify-end mr-auto ">
        <div className="md:w-32 xs:w-full">
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

        <div className="md:w-32 xs:w-full">
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
