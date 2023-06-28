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
            key={item}
            field={item}
            width={150 + item.length}
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
    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return masterRow ? (
    <div className="">
      <div className="text-[7px]">
        <GridComponent
          dataSource={masterRow}
          // allowPaging={true}
          allowSorting={true}
          pageSettings={pageSettings}
          // allowEditing={true}
          // editSettings={editSettings}
          allowGrouping={true}
          height={300}
        >
          <ColumnsDirective>{masterColumn}</ColumnsDirective>
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
