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
} from "@syncfusion/ej2-react-grids";
import LoadingScreen from "../LoadingScreen";

const formatTime = (time) => {};

const TrackerGrid = ({ data: TrackerRows }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  // console.log(TrackerRows?.results);

  const TrackerColumns =
    TrackerRows && TrackerRows.results.length > 0
      ? Object.keys(TrackerRows.results[0]).map((item) => (
          <ColumnDirective key={item} field={item} width={150} />
        ))
      : [];

  // const toolbarOptions = ["Edit", "Delete", "Update", "Cancel"];
  const pageSettings = { pageSize: 9 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

  const editSettings = {
    allowEditing: true,
    mode: "Dialog",
    allowAdding: true,
    allowDeleting: true,
    newRowPosition: "Top",
  };

  return TrackerRows ? (
    <GridComponent
      dataSource={TrackerRows.results}
      allowPaging={true}
      allowSorting={true}
      // allowFiltering={true}
      pageSettings={pageSettings}
      allowEditing={true}
      editSettings={editSettings}
      // toolbar={toolbarOptions}
    >
      <ColumnsDirective>{TrackerColumns}</ColumnsDirective>
      <Inject services={[Page, Sort, Toolbar, Edit]} />
    </GridComponent>
  ) : (
    <div className="grid place-items-center w-full">
      <LoadingScreen />
    </div>
  );
};

export default TrackerGrid;
