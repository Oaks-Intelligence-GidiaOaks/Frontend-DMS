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
import NoDataScreen from "../NoDataScreen";

const AccomodationGrid = ({ data }) => {
  let dataCount = data.totalCount;
  const title = "No submissions received yet...";

  let accData = data.data;

  const transformedData =
    accData &&
    accData.length > 0 &&
    data.data.map((item, i) => ({
      S_N: i + 1,
      id: item.created_by.id,
      LGA: item.lga,
      type: item.type,
      rooms: item.rooms,
      price: item.price,
      _id: item._id,
    }));

  const accColumns =
    accData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item.length ? item.length + 150 : 100,
    }));

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

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

  // const actionTemplate = (props) => {
  //   return (
  //     <button onClick={() => console.log("button clicked")}>
  //       {props.data.action}
  //     </button>
  //   );
  // };

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

  return accData.length > 0 ? (
    <GridComponent
      dataSource={transformedData}
      allowPaging={true}
      allowSorting={true}
      // allowFiltering={true}
      pageSettings={pageSettings}
      allowEditing={true}
      editSettings={editSettings}
      allowGrouping={true}
      // toolbar={toolbarOptions}
    >
      <ColumnsDirective>
        {accColumns.map(({ field, width }) => (
          <ColumnDirective key={field} field={field} width={width} />
        ))}

        <ColumnDirective headerText="Action" width={100} commands={commands} />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Toolbar, Edit, CommandColumn]} />
    </GridComponent>
  ) : (
    <div className="py-16  grid place-items-center w-full">
      <p className="w-1/2 "><NoDataScreen title={title} /></p>
    </div>
  );
};

export default AccomodationGrid;
