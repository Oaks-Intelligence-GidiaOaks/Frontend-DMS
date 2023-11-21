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

const ElectricityGrid = ({ data }) => {
  const { user } = useAuth();

  const [prevElectricData, setPrevElectricData] = useState([]);


  let dataCount = data.totalCount;

  let elecData = data.data;


  useEffect(() => {
    const getPrevElectricData = async () => {
      try {
        const response = await axios.get("form_response/prev_electricity");
        const avgHours = {};
        response.data.data.forEach((prev) => {
          if (avgHours[prev.state]) {
            avgHours[prev.state].totalHour += parseFloat(prev.hours_per_week);
            avgHours[prev.state].count += 1
          } else {
            avgHours[prev.state] = {
              totalHour: parseFloat(prev.hours_per_week),
              count: 1
            }
          }
        })
        const avgHourArray = Object.entries(avgHours).map(([state, data]) => ({
          state,
          avgHour: data.totalHour / data.count,
        }));
        setPrevElectricData(avgHourArray)

      } catch (err) {
        console.error("Error fetching previous food data:", err);
      }
    }
    getPrevElectricData()
  }, [])

  const handleFlagButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      try {
        const response = await axios.patch(`form_response/flag_electricity/${rowData._id}`, { flagged: true });
        toast.success(response.data.message || `Item "${rowData.name}" flagged successfully`);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || `Error flagging item "${rowData.name}"`);
      }
    } else {
      toast.error('Invalid data or _id. Unable to flag item.');
    }
  }


  const transformedData =
    elecData &&
    elecData.length > 0 &&
    data.data.map((item, i) => {
      const prevItem = prevElectricData?.find((prev) => prev.state === item.state);
      const itemHour = parseFloat(item.hours_per_week);
      const prevAvgHour = prevItem ? prevItem.avgHour : 0;
      const priceDifference = prevItem
        ? Math.abs(itemHour - prevAvgHour) / prevAvgHour
        : 0;
      return {
        S_N: i + 1,
        Date: arrangeTime(item.updated_at),
        id: item.created_by?.id,
        State: item.state,
        LGA: item.lga,
        hours_per_week: item.hours_per_week,
        _id: item._id,
        priceDifference
      }
    });

  const isCellRed = (field, priceDifference) => {
    const threshold = 0.25;
    return field === "hours_per_week" && (priceDifference >= threshold || priceDifference <= -threshold);
  };


  const elecColumns =
    elecData.length > 0 &&
    Object.keys(transformedData[0])
      .filter((field) => field !== "priceDifference")
      .map((item) => ({
        field: item,
        // width: item.length ? item.length + 150 : 100,
        width: item === "hours_per_week" ? 100 : item.length < 4 ? 120 : item.length + 130,
        cssClass: (props) =>
          isCellRed(props.column.field, props.data.priceDifference)
            ? "red-border"
            : "",
      }));


  const handleQueryCellInfo = (args) => {
    if (args.column.field === "hours_per_week" && args.data.priceDifference >= 0.25) {
      args.cell.classList.add("red-text");
    }
  };

  const toolbarOptions = ["Edit", "Delete", "Update", "Cancel"];
  const pageSettings = { pageSize: 50 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

  const editSettings = {
    allowEditing: true,
    mode: "Dialog",
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: "Top",
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

  const handleSave = async (args) => {

    const { data } = args;
    if (args.requestType === "save") {
      const modifiedData = {
        hours_per_week
          : data.hours_per_week,
      };
      try {
        await axios
          .patch(`form_response/electricity/${data._id}`, modifiedData)
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

  const checkHeaderText = (field) => {
    return field === "S_N"
      ? "S/N"
      : field === "id"
        ? "ID"
        : field === "lga"
          ? "LGA"
          : field === "hours_per_week"
            ? "Hours per week"
            : field;
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return elecData.length > 0 ? (
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
        actionComplete={handleSave}
        queryCellInfo={handleQueryCellInfo}
      // commandClick={(args) => handleSave(args)}
      >
        <ColumnsDirective>
          {elecColumns.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              headerText={checkHeaderText(field)}
              field={field}
              width={width}
              visible={field !== "_id"}
            />
          ))}

          <ColumnDirective
            headerText="Flag"
            width={100}
            template={(rowData) => (
              <button
                onClick={() => handleFlagButtonClick(rowData)}
                className={`bg-danger text-white px-2 rounded text-xs ${!isCellRed("price", rowData.priceDifference) ? 'disabled' : ''
                  }`}
                disabled={!isCellRed("price", rowData.priceDifference)}
              >
                Flag
              </button>
            )}
            visible={user?.role === 'admin'}
          />

          <ColumnDirective
            headerText="Action"
            width={100}
            commands={commands}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
      </GridComponent>
    </>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default ElectricityGrid;
