import React, { useState, useEffect } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Edit,
  Sort,
  Group,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useAuth } from "../../context";
import { NoData } from "../reusable";
import { arrangeTime, isOutsideLimit } from "../../lib/helpers";
import * as XLSX from "xlsx";
import { BiDownload } from "react-icons/bi";
import { toast } from "react-toastify";
import { Loading } from "../../components/reusable";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";

const ClothingGrid = ({ data, avgData }) => {
  const { user } = useAuth();

  let clothingData = data;

  const editClothPrice = useMutation({
    mutationFn: async (modifiedData) =>
      axios.patch(`form_response/clothings/${modifiedData._id}`, modifiedData),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getClothData"] });
    },
  });

  // resubmit mutation
  const resubmitProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/resubmit_clothings/${rowData._id}`),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getClothData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // admin flag product
  const flagProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/flag_clothings/${rowData._id}`, {
        flagged: true,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getClothData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleFlagButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      await flagProduct.mutateAsync(rowData);
    } else {
      toast.error("Invalid data or _id. Unable to flag item.");
    }
  };

  const handleResubmitButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      await resubmitProduct.mutateAsync(rowData);
    } else {
      toast.error("Invalid data or _id. Unable to resubmit item.");
    }
  };

  const transformedData =
    clothingData.length > 0 &&
    clothingData?.map((item, i) => ({
      S_N: i + 1,
      _id: item?._id,
      Date: arrangeTime(item?.updated_at),
      id: item.created_by?.id,
      State: item?.state,
      lga: item?.lga,
      category: item?.category,
      sub_category: item?.sub_category,
      size: item?.size,
      price: item?.price,
      flagged: item?.flagged,
    }));

  const transformedColumns =
    clothingData.length > 0 &&
    Object.keys(transformedData?.[0]).map((item) => ({
      field: item,
      width: item === "price" ? 90 : item.length < 4 ? 120 : item.length + 130,
    }));

  const handleQueryCellInfo = (args) => {
    if (
      args.column.field === "price" &&
      isOutsideLimit(avgData, "cloth", args.data)
    ) {
      args.cell.classList.add("red-text");
    }
  };

  const pageSettings = { pageSize: 60 };

  const editSettings = {
    allowEditing: true,
  };

  const handleSave = async (args) => {
    const { data } = args;

    if (args.requestType === "save") {
      const modifiedData = {
        category: data.category,
        sub_category: data.sub_category,
        size: data.size,
        price: data.price,
        _id: data._id,
      };
      await editClothPrice.mutateAsync(modifiedData);
    }
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
            onClick={() => handleResubmitButtonClick(rowData)}
            className="text-white px-2 py-1 rounded text-xs bg-primary-green"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const groupSettings = {
    columns: ["State"],
  };

  const checkHeaderText = (field) => {
    return field === "S_N"
      ? "S/N"
      : field === "id"
      ? "ID"
      : field === "lga"
      ? "LGA"
      : field === "category"
      ? "Category"
      : field === "sub_category"
      ? "Sub Category"
      : field === "price"
      ? "Price"
      : field === "size"
      ? "Size"
      : field;
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  return clothingData.length > 0 ? (
    <div>
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
        editSettings={editSettings}
        allowGrouping={true}
        height={350}
        queryCellInfo={handleQueryCellInfo}
        // commandClick={(args) => handleSave(args)}
        actionComplete={handleSave}
      >
        <ColumnsDirective>
          {transformedColumns?.map(({ field, width }) => (
            <ColumnDirective
              key={field}
              headerText={checkHeaderText(field)}
              visible={field !== "_id" && field !== "flagged"}
              field={field}
              allowEditing={field === "price"}
              width={width}
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
        <Inject services={[Page, Sort, Group, Edit, CommandColumn]} />
      </GridComponent>
    </div>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default ClothingGrid;
