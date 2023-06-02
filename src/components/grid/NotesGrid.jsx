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
import { NotesRows, NotesColumns } from "../../data/formResponses";

const NotesGrid = ({ data }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  let dataCount = data?.totalCount;

  let noteData = data.data;

  const transformedData =
    noteData &&
    noteData.length > 0 &&
    noteData.map((item, i) => ({
      S_N: i + 1,
      id: item.created_by.id,
      LGA: item.lga,
      accidents: item.accidents ? "Yes" : "No",
      comment_for_accidents: item.comment_for_accidents,
      crime_report: item.crime_report ? "Yes" : "No",
      comment_for_crime_report: item.comment_for_crime_report,
      government_project: item.government_project ? "Yes" : "No",
      comment_for_government_project: item.comment_for_government_project,
      _id: item._id,
    }));

  const notesColumns =
    noteData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item.length > 10 ? item.length + 200 : 120,
    }));

  // const toolbarOptions = ["Edit", "Delete", "Update", "Cancel"];
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

  return noteData.length > 0 ? (
    <GridComponent
      dataSource={transformedData}
      allowPaging={true}
      allowSorting={true}
      // allowFiltering={true}
      pageSettings={pageSettings}
      allowEditing={true}
      allowGrouping={true}
      editSettings={editSettings}
    >
      <ColumnsDirective>
        {notesColumns.map(({ field, width }) => (
          <ColumnDirective key={field} field={field} width={width} />
        ))}

        {/* <ColumnDirective headerText="Action" width={100} commands={commands} /> */}
      </ColumnsDirective>
      <Inject services={[Page, Sort, Edit]} />
    </GridComponent>
  ) : (
    <div className="py-16  grid place-items-center w-full">
      <p className="w-1/2 ">No submissions received yet...</p>
    </div>
  );
};

export default NotesGrid;
