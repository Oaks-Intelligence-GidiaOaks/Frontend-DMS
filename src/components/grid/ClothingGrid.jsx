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

const ClothingGrid = ({ data }) => {
  const { user } = useAuth();
  const [prevClothingData, setPrevClothingData] = useState([]);

  let clothingData = data["data"];

  useEffect(() => {
    const getPrevClothingData = async () => {
      try {
        const response = await axios.get("form_response/prev_clothings");
        const avgPrices = {};
        response.data.data.forEach((prev) => {
          if (avgPrices[prev.sub_category]) {
            avgPrices[prev.sub_category].totalPrice += parseFloat(prev.price);
            avgPrices[prev.sub_category].count += 1;
          } else {
            avgPrices[prev.sub_category] = {
              totalPrice: parseFloat(prev.price),
              count: 1,
            }
          }
        })

        const avgPriceArray = Object.entries(avgPrices).map(([sub_category, data]) => ({
          sub_category,
          avgPrice: data.totalPrice / data.count,
        }));
        setPrevClothingData(avgPriceArray)
      } catch (err) {
        console.error("Error fetching previous food data:", err);
      }
    }
    getPrevClothingData()
  }, [])


  const transformedData =
    clothingData.length > 0 &&
    clothingData?.map((item, i) => {
      const prevItem = prevClothingData?.find((prev) => prev.sub_category === item.sub_category);
      const itemPrice = parseFloat(item.price);
      const prevAvgPrice = prevItem ? prevItem.avgPrice : 0;
      const priceDifference = prevItem
        ? Math.abs(itemPrice - prevAvgPrice) / prevAvgPrice
        : 0;
      return {
        S_N: i + 1,
        _id: item._id,
        Date: arrangeTime(item.updated_at),
        id: item.created_by?.id,
        State: item.state,
        lga: item.lga,
        category: item.category,
        sub_category: item.sub_category,
        size: item.size,
        price: item.price,
        priceDifference
      }

    });

  const isCellRed = (field, priceDifference) => {
    const threshold = 0.25;
    return field === "price" && (priceDifference >= threshold || priceDifference <= -threshold);
  };

  const transformedColumns =
    clothingData.length > 0 &&
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

  const editSettings = {
    allowEditing: true,
  };

  const handleSave = async (args) => {
    // console.log(args);
    const modifiedData = args.rowData;
    if (args.commandColumn.type === "Save") {
      try {
        await axios
          .patch(`form_response/clothings/${modifiedData._id}`, modifiedData)
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
          : field === "category"
            ? "Category"
            : field === "sub_category"
              ? "Sub Category"
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

  return data["data"].length > 0 ? (
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
        queryCellInfo={handleQueryCellInfo}
        commandClick={(args) => handleSave(args)}
      >
        <ColumnsDirective>
          {transformedColumns?.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              headerText={checkHeaderText(field)}
              visible={field === "_id" ? false : true}
              field={field}
              allowEditing={field === "price"}
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
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default ClothingGrid;
