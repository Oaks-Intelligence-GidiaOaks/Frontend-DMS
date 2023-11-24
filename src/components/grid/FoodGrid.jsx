import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { toast } from 'react-toastify';
import { Loading } from "../../components/reusable"

const FoodGrid = ({ data: foodRowss }) => {
  const { user } = useAuth();
  const [prevFoodData, setPrevFoodData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodData, setFoodData] = useState(foodRowss.data);

  useEffect(() => {
    const getPrevFoodData = async () => {
      try {
        setLoading(true);
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

        // update transformedData here
        setTransformedData(
          foodData.length > 0 &&
          foodData?.map((item, i) => {
            const prevItem = avgPriceArray.find((prev) => prev.name === item.name);
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
          })
        );
      } catch (err) {
        console.error("Error fetching previous food data:", err);
      } finally {
        setLoading(false);
      }
    };
    getPrevFoodData();
  }, [foodData]);

  const handleFlagButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      try {
        const response = await axios.patch(`form_response/flag_food_product/${rowData._id}`,
          { flagged: true });
        toast.success(response.data.message || `Item "${rowData.name}" flagged successfully`);
        // window.location.reload();
        setFoodData((prevFoodData) =>
        prevFoodData.filter((item) => item._id !== rowData._id)
      );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || `Error flagging item "${rowData.name}"`);
      } 
    } else {
      toast.error('Invalid data or _id. Unable to flag item.');
    } 
  }

  const handleResubmitButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      try {
        const response = await axios.patch(`form_response/resubmit_food_product/${rowData._id}`);
        toast.success(response.data.message || `Item "${rowData.name}" resubmitted successfully`);
        setFoodData((prevFoodData) =>
        prevFoodData.filter((item) => item._id !== rowData._id)
      );
        
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || `Error resubmitting item "${rowData.name}"`);
      }  
    } else {
      toast.error('Invalid data or _id. Unable to resubmit item.');
    }
  };

  const formatProductName = (name) => {
    if (name.includes("_")) {
      name = name.replace("_", "(") + ")";
    }
    return name.replace(/-/g, "");
  };

  const isCellRed = (field, priceDifference, flagged) => {
    const threshold = 0.25;
    const userRole = user?.role;
    return (
      (field === 'price' && priceDifference >= threshold && (userRole === 'admin' || userRole === 'team_lead')) &&
      (price && price === true) 
    );
  };
  
  const transformedColumns =
    foodData.length > 0 &&
    [...Object.keys(transformedData?.[0] || {})]
      .filter((field) => field !== "priceDifference")
      .map((item) => ({
        field: item,
        width: item === "price" ? 90 : item.length < 4 ? 120 : item.length + 130,
        cssClass: (props) =>
          isCellRed(props.column.field, props.data.priceDifference, props.data.price)
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


  const gridTemplate = (rowData) => {
    return (
      <div>
        <div>
          <button
            onClick={() => handleFlagButtonClick(rowData)}
            className="bg-danger text-white px-2 py-1 rounded text-xs"
          >
            Flag
          </button>
        </div>
      </div>
    );
  };

  const resubmitTemplate = (rowData) => {
    return (
      <div>
        <div>
        <button
            onClick={() => handleResubmitButtonClick(rowData)}
            className="text-white px-2 py-1 rounded text-xs bg-primary-green"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

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

  return loading  ? (
    <div className="h-32">
      <Loading />
    </div>
  ) : foodData.length > 0 ? (
    <div>
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

          <ColumnDirective
            headerText="Flag"
            width={100}
            template={gridTemplate}
            visible={user?.role === 'admin'}
          />
          <ColumnDirective
            headerText="Flag"
            width={100}
            template={resubmitTemplate}
            visible={user?.role === 'team_lead'}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Group, Edit, CommandColumn]} />
      </GridComponent>
    </div>
  ) : (
    <div className="h-32">
      <NoData text="No Submissions received yet" />
    </div>
  );
};

export default FoodGrid;

