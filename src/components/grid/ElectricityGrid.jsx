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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { ElectricityColumns, ElectricityRows } from "../../data/formResponses";

const ElectricityGrid = ({ data }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  let dataCount = data.totalCount;

  let elecData = data.data;

  const transformedData =
    elecData &&
    elecData.length > 0 &&
    data.data.map((item, i) => ({
      S_N: i + 1,
      id: item.created_by.id,
      LGA: item.lga,
      hours_per_week: item.hours_per_week,
      _id: item._id,
    }));

  const elecColumns =
    elecData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item.length ? item.length + 150 : 100,
    }));

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

  return elecData.length > 0 ? (
    <GridComponent
      dataSource={transformedData}
      allowPaging={true}
      allowSorting={true}
      // allowFiltering={true}
      pageSettings={pageSettings}
      allowEditing={true}
      editSettings={editSettings}
      // toolbar={toolbarOptions}
    >
      <ColumnsDirective>
        {elecColumns.map(({ field, width }) => (
          <ColumnDirective key={field} field={field} width={width} />
        ))}

        <ColumnDirective headerText="Action" width={100} commands={commands} />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
    </GridComponent>
  ) : (
    <div className="py-16  grid place-items-center w-full">
      <p className="w-1/2 ">No submissions received yet...</p>
    </div>
  );
};

export default ElectricityGrid;
