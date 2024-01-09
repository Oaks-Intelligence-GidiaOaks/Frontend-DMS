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
  beginEdit,
  Toolbar,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { NoData } from "../reusable";
import { arrangeTime, isOutsideLimit } from "../../lib/helpers";
import * as XLSX from "xlsx";
import { BiDownload } from "react-icons/bi";
import { useAuth } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { Loading } from "../../components/reusable";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";

const TransportGrid = ({ data, avgData }) => {
  const { user } = useAuth();

  let transportData = data;

  const editTransportPrice = useMutation({
    mutationFn: async (modifiedData) =>
      await axios.patch(
        `form_response/transport/${modifiedData._id}`,
        modifiedData
      ),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getTransData"] });
    },
    onError: (err) => {
      toast.error("error editing value, try again!");
    },
  });

  // resubmit mutation
  const resubmitProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/resubmit_transport/${rowData._id}`),
    onSuccess: ({ data }) => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getTransData"] });
    },
    onError: (err) => {
      toast.error("could not submit data, try again!");
    },
  });

  // admin flag product
  const flagProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/flag_transport/${rowData._id}`, {
        flagged: true,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getTransData"] });
      // queryClient.refetchQueries({ queryKey: ["getFoodData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const transformedData =
    transportData.length > 0 &&
    transportData.map((item, i) => ({
      S_N: i + 1,
      Date: arrangeTime(item.updated_at),
      id: item.created_by?.id,
      State: item.state,
      LGA: item.lga,
      route: item.route,
      mode: item.mode,
      _id: item._id,
      cost: item.cost,
      flagged: item.flagged,
    }));

  const transportColumns =
    transportData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item === "route" ? item.length + 200 : 130,
      allowEditing: item === "cost",
    }));

  const handleFlagButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      await flagProduct.mutateAsync(rowData);
    } else {
      toast.error("Invalid data or _id. Unable to flag item.");
    }
  };

  const handleQueryCellInfo = (args) => {
    if (
      args.column.field === "cost" &&
      isOutsideLimit(avgData, "transport", args.data)
    ) {
      args.cell.classList.add("red-text");
    }
  };

  const pageSettings = { pageSize: 60 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

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

  const gridTemplate = (rowData) => {
    return (
      <div>
        <div>
          <button
            onClick={() => handleFlagButtonClick(rowData)}
            className="bg-danger text-white px-2 py-1 rounded text-xs"
          >
            Flag
          </button>
        </div>
      </div>
    );
  };

  const resubmitTemplate = (rowData) => {
    return (
      <div>
        <div>
          <button
            onClick={() => resubmitProduct.mutate(rowData)}
            className="text-white px-2 py-1 rounded text-xs bg-primary-green"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const handleSave = async (args) => {
    const { data } = args;
    if (args.requestType === "save") {
      const modifiedData = {
        cost: data.cost,
        _id: data._id,
        route: data.route,
        mode: data.mode,
      };

      editTransportPrice.mutate(modifiedData);
    }
  };

  const checkHeaderText = (field) => {
    return field === "S_N"
      ? "S/N"
      : field === "id"
      ? "ID"
      : field === "lga"
      ? "LGA"
      : field === "route"
      ? "Route"
      : field === "cost"
      ? "Cost"
      : field === "mode"
      ? "Mode"
      : field;
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return transportData.length > 0 ? (
    <div>
      {user.role !== "team_lead" && (
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
        allowGrouping={true}
        height={350}
        queryCellInfo={handleQueryCellInfo}
        actionComplete={handleSave}
        // commandClick={(args) => handleSave(args)}
      >
        <ColumnsDirective>
          {transportColumns.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              field={field}
              headerText={checkHeaderText(field)}
              width={width}
              visible={field !== "_id" && field !== "flagged"}
              allowEditing={field === "cost"}
            />
          ))}

          <ColumnDirective
            headerText="Action"
            width={100}
            commands={commands}
          />
          <ColumnDirective
            headerText="Flag"
            width={100}
            template={gridTemplate}
            visible={user?.role === "admin"}
          />

          <ColumnDirective
            headerText="Flag"
            width={100}
            template={resubmitTemplate}
            visible={user?.role === "team_lead"}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
      </GridComponent>
    </div>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default TransportGrid;
