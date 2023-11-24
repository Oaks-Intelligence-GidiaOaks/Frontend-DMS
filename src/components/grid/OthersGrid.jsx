import React, { useState, useEffect } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Filter,
  Inject,
  Page,
  Edit,
  Sort,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { NoData } from "../reusable";
import { arrangeTime } from "../../lib/helpers";
import * as XLSX from "xlsx";
import { BiDownload } from "react-icons/bi";
import { useAuth } from "../../context";
import axios from "axios";
import { toast } from 'react-toastify';
import { Loading } from "../../components/reusable"

const OthersGrid = ({ data }) => {
  const { user } = useAuth();
  const [prevOthersData, setPrevOthersData] = useState([])
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(true);

  let dataCount = data?.totalCount;

  let othersData = data.data;


  useEffect(() => {
    const getPrevOthersData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("form_response/prev_other_products");
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
        })

        const avgPriceArray = Object.entries(avgPrices).map(([name, data]) => ({
          name,
          avgPrice: data.totalPrice / data.count,
        }));
        setPrevOthersData(avgPriceArray)


        setTransformedData(
          othersData &&
          othersData.length > 0 &&
          data.data.map((item, i) => {
            const prevItem = prevOthersData?.find((prev) => prev.name === item.name);
            const itemPrice = parseFloat(item.price);
            const prevAvgPrice = prevItem ? prevItem.avgPrice : 0;
            const priceDifference = prevItem
              ? Math.abs(itemPrice - prevAvgPrice) / prevAvgPrice
              : 0;
            return {
              S_N: i + 1,
              Date: arrangeTime(item.updated_at),
              id: item.created_by?.id,
              State: item.state,
              LGA: item.lga,
              name: formatProductName(item?.name),
              price: item.price === 0 ? "N/A" : item.price,
              brand: item.brand.length > 1 ? item.brand : "N/A",
              _id: item._id,
              size: item.size,
              priceDifference
            }
          }));
      } catch (err) {
        console.error("Error fetching previous food data:", err);
      } finally {
        setLoading(false);
      }
    }
    getPrevOthersData()
  }, [])

  const handleFlagButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      try {
        const response = await axios.patch(`form_response/flag_other_products/${rowData._id}`, { flagged: true });
        toast.success(response.data.message || `Item "${rowData.name}" flagged successfully`);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || `Error flagging item "${rowData.name}"`);
      }
    } else {
      toast.error('Invalid data or _id. Unable to flag item.');
    }
  }


  const formatProductName = (name) => {
    if (name.includes("_")) {
      name = name.replace("_", "(") + ")";
    }
    return name.replace(/-/g, "");
  };



  const isCellRed = (field, priceDifference) => {
    const threshold = 0.25;
    return field === "price" && (priceDifference >= threshold || priceDifference <= -threshold);
  };


  const othersColumns =
    othersData.length > 0 &&
    Object.keys(transformedData[0] || {})
      .filter((field) => field !== "priceDifference")
      .map((item) => ({
        field: item,
        // width: item.length ? item.length + 130 : 130,
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

  const pageSettings = { pageSize: 50 };

  const editSettings = {
    allowEditing: true,
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
          .patch(`form_response/other_products/${data._id}`, modifiedData)
          .then((res) => {
            alert(res.data.message);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
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
              : field === "brand"
                ? "Brand"
                : field === "size"
                  ? "Size"
                  : field;
  };

  return loading ? (
    <div className="h-32">
      <Loading />
    </div>
  ) : othersData.length > 0 ? (
    <div>
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
        queryCellInfo={handleQueryCellInfo}
        // commandClick={(args) => handleSave(args)}
        actionComplete={handleSave}
      >
        <ColumnsDirective>
          {othersColumns.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              visible={field !== "_id"}
              headerText={checkHeaderText(field)}
              allowEditing={
                field === "price" || field === "brand" || field === "size"
              }
              field={field}
              width={width}
            />
          ))}
          <ColumnDirective
            headerText="Action"
            width={100}
            commands={commands}
          />

          <ColumnDirective
            headerText="Flag"
            width={100}
            template={gridTemplate}
            visible={user?.role === 'admin'}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
      </GridComponent>
    </div>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default OthersGrid;
