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
import { TrackerColumns, TrackerRows } from "../../data/trackerData";
// import { MasterColumns, masterRow } from "../../data/MasterListData";

const MasterGrid = ({ data: masterRow }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  // console.log(masterRow);

  let masterColumn =
    masterRow && masterRow.length > 0
      ? Object.keys(masterRow[0]).map((item) => (
          <ColumnDirective key={item} field={item} width={150 + item.length} />
        ))
      : [];

  const toolbarOptions = ["Edit", "Delete", "Update", "Cancel"];
  const pageSettings = { pageSize: 9 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

  const editSettings = {
    allowEditing: true,
    mode: "Dialog",
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: "Top",
  };

  const actionTemplate = (props) => {
    return (
      <button onClick={() => console.log("button clicked")}>
        {props.data.action}
      </button>
    );
  };

  const foodTemplate = (props) => (
    <div className="bg-red-500 text-white rounded px-1 text-center text-xs w-full">
      {props.food}
    </div>
  );

  const HousingTemplate = (props) => (
    <div className="bg-red-500 text-white rounded px-1 text-center text-xs w-full">
      {props.accomodation}
    </div>
  );

  const OthersTemplate = (props) => (
    <div className="bg-red-500 text-white rounded px-1 text-center text-xs w-full">
      {props.others}
    </div>
  );

  const TransportTemplate = (props) => (
    <div className="bg-red-500 text-white rounded px-1 text-center text-xs w-full">
      {props.routes}
    </div>
  );

  const ElectricityTemplate = (props) => (
    <div className="bg-red-500 text-white rounded px-1 text-center text-xs w-full">
      {props.electricity}
    </div>
  );

  return masterRow ? (
    <div className="text-[6px] ">
      <GridComponent
        dataSource={masterRow}
        allowPaging={true}
        allowSorting={true}
        // allowFiltering={true}
        pageSettings={pageSettings}
        allowEditing={true}
        editSettings={editSettings}
        allowGrouping={true}
      >
        <ColumnsDirective>{masterColumn}</ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group, Toolbar, Edit]} />
      </GridComponent>
    </div>
  ) : (
    <div className="text-center w-full grid place-items-center">
      <span>Loading.....</span>
    </div>
  );
};

export default MasterGrid;
