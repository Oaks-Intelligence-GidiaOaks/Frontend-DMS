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
import { arrangeTime } from "../../lib/helpers";
import * as XLSX from "xlsx";
import { BiDownload } from "react-icons/bi";
import { useAuth } from "../../context";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { toast } from "react-toastify";

const NotesGrid = ({ data }) => {
  const { user } = useAuth();

  let noteData = data;

  const editNotes = useMutation({
    mutationFn: async (modifiedData) =>
      await axios.patch(
        `form_response/questions/${modifiedData._id}`,
        modifiedData
      ),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getNotesData"] });
    },
  });

  const transformedData =
    noteData &&
    noteData.length > 0 &&
    noteData.map((item, i) => ({
      S_N: i + 1,
      Date: arrangeTime(item.updated_at),
      id: item.created_by?.id,
      State: item.state,
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
    allowEditOnDblClick: false,
    // mode: "Dialog",
    allowDeleting: false,
  };

  const commands = [
    {
      type: "Edit",
      buttonOption: {
        iconCss: "e-icons e-edit",
        cssClass: "e-flat",
      },
    },
  ];

  const handleSave = async (args) => {
    const { data } = args;

    console.log(data);

    if (args.requestType === "save") {
      const modifiedData = {
        note: data.notes,
        _id: data._id,
      };

      editNotes.mutate(modifiedData);
    }
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return noteData.length > 0 ? (
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
        allowGrouping={true}
        height={350}
        editSettings={editSettings}
        actionComplete={handleSave}
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

          <ColumnDirective
            headerText="Action"
            width={100}
            commands={commands}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Edit]} />
      </GridComponent>
    </>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default NotesGrid;
