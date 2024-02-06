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
  beginEdit,
  Toolbar,
  Group,
} from "@syncfusion/ej2-react-grids";
import * as XLSX from "xlsx";
import { useAuth } from "../../context";
import { Loading } from "../reusable";
import { BiDownload } from "react-icons/bi";
import { masterHeaderText } from "../../lib/helpers";

const MasterGrid = ({ data: masterRow }) => {
  const { user } = useAuth();

  let downloadData = masterRow;

  function getTableColumnData(arr) {
    let maxKeys = 0;
    let objectWithMostKeys = null;

    for (let obj of arr) {
      const keysCount = Object.keys(obj).length;

      if (keysCount > maxKeys) {
        maxKeys = keysCount;
        objectWithMostKeys = obj;
      }
    }

    return objectWithMostKeys;
  }

  let masterColumn =
    masterRow && masterRow.length > 0
      ? Object.keys(getTableColumnData(masterRow)).map((item) => (
          <ColumnDirective
            visible={item !== "_id"}
            headerText={masterHeaderText(item)}
            key={item}
            field={item}
            width={item === "Note" ? 300 + item.length : 180 + item.length}
          />
        ))
      : [];

  const toolbarOptions = ["Edit", "Delete", "Update", "Cancel"];
  const pageSettings = { pageSize: 60 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

  const editSettings = {
    allowEditing: true,
    mode: "Dialog",
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: "Top",
  };

  const handleDownload = () => {
    const columnHeaders = Object.keys(getTableColumnData(downloadData));

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet([]);

    XLSX.utils.sheet_add_aoa(ws, [columnHeaders], { origin: "A1" });

    if (Array.isArray(downloadData)) {
      let rowData = downloadData.map((obj) =>
        columnHeaders.map((header) => obj[header])
      );

      XLSX.utils.sheet_add_aoa(ws, rowData, { origin: "A2" });
    } else {
      let rowData = columnHeaders.map((header) => [downloadData[header]]);
      XLSX.utils.sheet_add_aoa(ws, rowData, { origin: "A2" });
    }

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  const serialNumberTemplate = (rowData) => {
    return rowData ? Number(rowData.index) + 1 : "";
  };

  return masterRow ? (
    <div className="">
      {user?.role === "admin" && (
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
      <div className="text-[7px]">
        <GridComponent
          dataSource={masterRow}
          // allowPaging={true}
          allowSorting={true}
          pageSettings={pageSettings}
          // allowEditing={true}
          // editSettings={editSettings}
          allowGrouping={true}
          allowTextWrap={true}
          textWrapSettings={{ wrapMode: "Content" }}
          height={380}
        >
          <ColumnsDirective>
            <ColumnDirective
              headerText="S/N"
              width={80}
              template={serialNumberTemplate}
            />

            {masterColumn}
          </ColumnsDirective>
          <Inject services={[Sort, Filter, Group, Toolbar, Edit]} />
        </GridComponent>
      </div>
    </div>
  ) : (
    <div className="text-center h-[320px] w-full grid place-items-center">
      <Loading />
    </div>
  );
};

export default MasterGrid;
