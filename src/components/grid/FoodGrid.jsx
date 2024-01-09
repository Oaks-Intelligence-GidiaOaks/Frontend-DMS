import React, { useState, useEffect, useCallback, useMemo } from "react";
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

const FoodGrid = ({ data: foodRowss, avgData }) => {
  const { user } = useAuth();

  let foodData = foodRowss;

  const editFoodPrice = useMutation({
    mutationFn: async (modifiedData) =>
      await axios.patch(
        `form_response/food_product/${modifiedData._id}`,
        modifiedData
      ),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getFoodData"] });
      queryClient.refetchQueries({ queryKey: ["getFoodData"] });
    },
    onError: (err) => {
      toast.success(err.message);
    },
  });

  const resubmitFoodProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/resubmit_food_product/${rowData._id}`),
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getFoodData"] });
    },
    onError: (err) => {
      toast.error("could not submit data, try again");
    },
  });

  // admin flag product
  const flagProduct = useMutation({
    mutationFn: async (rowData) =>
      await axios.patch(`form_response/flag_food_product/${rowData._id}`, {
        flagged: true,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("successful");
      queryClient.invalidateQueries({ queryKey: ["getFoodData"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleFlagButtonClick = async (rowData) => {
    if (rowData && rowData._id) {
      flagProduct.mutate(rowData);
    } else {
      toast.error("Invalid data or _id. Unable to flag item.");
    }
  };

  const formatProductName = (name) => {
    if (name.includes("_")) {
      name = name.replace("_", "(") + ")";
    }
    return name.replace(/-/g, "");
  };

  const transformedData =
    foodData?.length > 0 &&
    foodData?.map((item, i) => ({
      S_N: i + 1,
      _id: item?._id,
      Date: arrangeTime(item?.updated_at),
      id: item.created_by?.id,
      State: item?.state,
      lga: item?.lga,
      name: formatProductName(item?.name),
      brand: item?.brand,
      size: item?.size,
      price: item?.price,
      flagged: item?.flagged,
    }));

  const transformedColumns =
    foodData?.length > 0 &&
    Object.keys(transformedData?.[0]).map((item) => ({
      field: item,
      width: item.length < 4 ? 120 : item.length + 130,
    }));

  const handleQueryCellInfo = (args) => {
    if (
      args.column.field === "price" &&
      isOutsideLimit(avgData, "food", args.data)
    ) {
      args.cell.classList.add("red-text");
    }
  };

  const pageSettings = { pageSize: 60 };
  const editSettings = { allowEditing: true };

  const handleSave = async (args) => {
    const { data } = args;

    if (args.requestType === "save") {
      const modifiedData = {
        size: data.size,
        brand: data.brand,
        price: data.price,
        name: data.name,
        _id: data._id,
      };

      editFoodPrice.mutate(modifiedData);
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
            onClick={() => resubmitFoodProduct.mutate(rowData)}
            className="text-white px-2 py-1 rounded text-xs bg-primary-green"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const groupSettings = { columns: ["State"] };

  const checkHeaderText = (field) => {
    const headerMapping = {
      S_N: "S/N",
      id: "ID",
      lga: "LGA",
      name: "Name",
      price: "Price",
      size: "Size",
    };

    return headerMapping[field] || field;
  };

  const handleDownload = () => {
    let downloadData = transformedData?.map(({ _id, ...item }) => item);

    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(downloadData);

    XLSX.utils.book_append_sheet(wb, ws, "EXCEL-SHEET");
    XLSX.writeFile(wb, "Excel-sheet.xlsx");
  };

  if (!foodData) {
    return (
      <div className="h-32">
        <Loading />
      </div>
    );
  }

  return foodData?.length > 0 ? (
    <div>
      {user?.role !== "team_lead" && (
        <div className="my-3">
          <button
            onClick={handleDownload}
            className="px-3 ml-auto p-2 flex items-center space-x-3 rounded-md drop-shadow-lg text-sm bg-white hover:bg-oaksyellow hover:text-white"
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
              cssClass="red-text"
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
      <NoData text="No Submissions received yet" />
    </div>
  );
};

export default FoodGrid;
