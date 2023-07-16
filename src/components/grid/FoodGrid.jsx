import React, { useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Filter,
  Inject,
  Page,
  Edit,
  Sort,
  Group,
  beginEdit,
  Toolbar,
  CommandColumn,
  Column,
} from "@syncfusion/ej2-react-grids";
import { FoodRows, FoodColumns } from "../../data/formResponses";
import axios from "axios";
import { useAuth } from "../../context";
import { NoData } from "../reusable";
import { arrangeTime } from "../../lib/helpers";
import * as XLSX from "xlsx";
import { BiDownload } from "react-icons/bi";

const FoodGrid = ({ data: foodRowss }) => {
  const { user } = useAuth();

  let foodData = foodRowss.data;

  const formatProductName = (name) => {
    if (name.includes("_")) {
      name = name.replace("_", "(") + ")";
    }
    return name.replace(/-/g, "");
  };

  const transformedData =
    foodData.length > 0 &&
    foodData?.map((item, i) => ({
      S_N: i + 1,
      _id: item?._id,
      Date: arrangeTime(item?.updated_at),
      id: item.created_by?.id,
      State: item?.state,
      lga: item?.lga,
      name: item?.name,
      brand: item?.brand,
      size: item?.size,
      price: item?.price,
    }));

  console.log(transformedData[0]?.size);

  const transformedColumns =
    foodData.length > 0 &&
    Object.keys(transformedData?.[0]).map((item) => ({
      field: item,
      width: item.length < 4 ? 120 : item.length + 130,
    }));

  const pageSettings = { pageSize: 60 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

  const editSettings = {
    allowEditing: true,
  };
  const handleSave = async (args) => {
    const { data } = args;
  
    if (args.requestType === "save") {
      const modifiedData = {
        size: data.size,
        brand: data.brand,
        price: data.price,
      };
  
      try {
        await axios
          .patch(`form_response/food_product/${data._id}`, modifiedData)
          .then((res) => {
            alert(res.data.message);
            // console.log(res.data);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const commands = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
    {
      type: "Save",
      buttonOption: { cssClass: "e-flat", iconCss: "e-update e-icons" },
    },
    {
      type: "Cancel",
      buttonOption: { cssClass: "e-flat", iconCss: "e-cancel-icon e-icons" },
    },
  ];

  const groupSettings = {
    columns: ["State"],
  };

  const checkHeaderText = (field) => {
    return field === "S_N"
      ? "S/N"
      : field === "id"
      ? "ID"
      : field === "lga"
      ? "LGA"
      : field === "name"
      ? "Name"
      : field === "price"
      ? "Price"
      : field === "size"
      ? "Size"
      : field;
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return foodRowss["data"].length > 0 ? (
    <>
      {user?.role !== "team_lead" && (
        <div className="my-3">
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
      )}

      <GridComponent
        dataSource={transformedData}
        allowPaging={true}
        allowSorting={true}
        pageSettings={pageSettings}
        allowEditing={true}
        editSettings={editSettings}
        allowGrouping={true}
        height={350}
        // commandClick={(args) => handleSave(args)}
        actionComplete={handleSave}
      >
        <ColumnsDirective>
          {transformedColumns?.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              headerText={checkHeaderText(field)}
              // visible={field === "_id" ? false : true}
              visible={field !== "_id"}
              field={field}
              allowEditing={
                field === "price" || field === "brand" || field === "size"
              }
              width={width}
            />
          ))}

          <ColumnDirective
            headerText="Action"
            width={100}
            commands={commands}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Group, Edit, CommandColumn]} />
      </GridComponent>
    </>
  ) : (
    <div className="h-32">
      <NoData text="No Submissions received yet" />
    </div>
  );
};

export default FoodGrid;
