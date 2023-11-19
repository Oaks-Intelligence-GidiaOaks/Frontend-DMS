import React, { useState, useEffect } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Edit,
  Sort,
  Group,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useAuth } from "../../context";
import { NoData } from "../reusable";
import { arrangeTime } from "../../lib/helpers";
import * as XLSX from "xlsx";
import { BiDownload } from "react-icons/bi";

const FoodGrid = ({ data: foodRowss }) => {
  const { user } = useAuth();
  const [prevFoodData, setPrevFoodData] = useState([]);


  let foodData = foodRowss.data;

  useEffect(() => {
    const getPrevFoodData = async () => {
      try {
        const response = await axios.get("form_response/prev_food_product");

        const avgPrices = {};
        response.data.data.forEach((prev) => {
          if (avgPrices[prev.name]) {
            avgPrices[prev.name].totalPrice += parseFloat(prev.price);
            avgPrices[prev.name].count += 1;
          } else {
            avgPrices[prev.name] = {
              totalPrice: parseFloat(prev.price),
              count: 1,
            };
          }
        });

        const avgPriceArray = Object.entries(avgPrices).map(([name, data]) => ({
          name,
          avgPrice: data.totalPrice / data.count,
        }));

        setPrevFoodData(avgPriceArray);
      } catch (err) {
        console.error("Error fetching previous food data:", err);
      }
    };

    getPrevFoodData();
  }, []);

  const formatProductName = (name) => {
    if (name.includes("_")) {
      name = name.replace("_", "(") + ")";
    }
    return name.replace(/-/g, "");
  };


  const transformedData =
    foodData.length > 0 &&
    foodData?.map((item, i) => {
      const prevItem = prevFoodData?.find((prev) => prev.name === item.name);
      const itemPrice = parseFloat(item.price);
      const prevAvgPrice = prevItem ? prevItem.avgPrice : 0;
      const priceDifference = prevItem
        ? Math.abs(itemPrice - prevAvgPrice) / prevAvgPrice
        : 0;
      return {
        S_N: i + 1,
        _id: item?._id,
        Date: arrangeTime(item?.updated_at),
        id: item.created_by?.id,
        State: item?.state,
        lga: item?.lga,
        name: formatProductName(item?.name),
        brand: item?.brand,
        size: item?.size,
        price: item?.price,
        priceDifference,
      };
    });

  const isCellRed = (field, priceDifference) => {
    const threshold = 0.25;
    return field === "price" && (priceDifference >= threshold || priceDifference <= -threshold);
  };


  const transformedColumns =
    foodData.length > 0 &&
    Object.keys(transformedData?.[0])
      .filter((field) => field !== "priceDifference")
      .map((item) => ({
        field: item,
        // width: item.length < 4 ? 120 : item.length + 130,
        width: item === "price" ? 90 : item.length < 4 ? 120 : item.length + 130,
        cssClass: (props) =>
          isCellRed(props.column.field, props.data.priceDifference)
            ? "red-border"
            : "",
      }));


  const handleQueryCellInfo = (args) => {
    if (args.column.field === "price" && args.data.priceDifference >= 0.25) {
      args.cell.classList.add("red-text");
    }
  };

  const pageSettings = { pageSize: 60 };
  const editSettings = { allowEditing: true };
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
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const commands = [
    { type: "Edit", buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" } },
    { type: "Save", buttonOption: { cssClass: "e-flat", iconCss: "e-update e-icons" } },
    { type: "Cancel", buttonOption: { cssClass: "e-flat", iconCss: "e-cancel-icon e-icons" } },
  ];

  const groupSettings = { columns: ["State"] };

  const checkHeaderText = (field) => {
    const headerMapping = {
      S_N: "S/N",
      id: "ID",
      lga: "LGA",
      name: "Name",
      price: "Price",
      size: "Size",
    };
    return headerMapping[field] || field;
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
            className="px-3 ml-auto p-2 flex items-center space-x-3 rounded-md drop-shadow-lg text-sm bg-white hover:bg-oaksyellow hover:text-white"
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
        queryCellInfo={handleQueryCellInfo}
        actionComplete={handleSave}
      >
        <ColumnsDirective>
          {transformedColumns?.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              headerText={checkHeaderText(field)}
              visible={field !== "_id"}
              field={field}
              allowEditing={field === "price" || field === "brand" || field === "size"}
              width={width}
            />
          ))}
          <ColumnDirective headerText="Action" width={100} commands={commands} />
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

