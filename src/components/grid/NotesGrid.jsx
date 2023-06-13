import React, { useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Edit,
  Sort,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { NoData } from "../reusable";

const NotesGrid = ({ data }) => {
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
      notes: item.note,
      _id: item._id,
    }));

  const notesColumns =
    noteData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item.length > 10 ? item.length + 200 : 120,
    }));

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

  const handleSave = async (args) => {
    console.log(args);
    const modifiedData = args.rowData;
    if (args.commandColumn.type === "Save") {
      try {
        await axios
          .patch(`form_response/questions/${modifiedData._id}`, modifiedData)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return noteData.length > 0 ? (
    <GridComponent
      dataSource={transformedData}
      allowPaging={true}
      allowSorting={true}
      pageSettings={pageSettings}
      allowEditing={true}
      allowGrouping={true}
      editSettings={editSettings}
      commandClick={(args) => handleSave(args)}
    >
      <ColumnsDirective>
        {notesColumns.map(({ field, width }) => (
          <ColumnDirective
            key={field}
            field={field}
            width={width}
            visible={field !== "_id"}
            allowEditing={field === "notes"}
          />
        ))}

        <ColumnDirective headerText="Action" width={100} commands={commands} />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Edit]} />
    </GridComponent>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default NotesGrid;
