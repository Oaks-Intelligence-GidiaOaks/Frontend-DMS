import React, { useState } from "react";
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

const ClothingGrid = ({ data }) => {
  const {
    user: { token },
  } = useAuth();

  let clothingData = data["data"];

  const transformedData =
    clothingData.length > 0 &&
    clothingData?.map((item, i) => ({
      S_N: i + 1,
      _id: item._id,
      id: item.created_by.id,
      lga: item.lga,
      category: item.category,
      sub_category: item.sub_category,
      size: item.size,
      price: item.price,
    }));

  const transformedColumns =
    clothingData.length > 0 &&
    Object.keys(transformedData?.[0]).map((item) => ({
      field: item,
      width: item.length < 4 ? 120 : item.length + 130,
    }));

  const pageSettings = { pageSize: 60 };

  const editSettings = {
    allowEditing: true,
  };

  const handleSave = async (args) => {
    console.log(args);
    const modifiedData = args.rowData;
    if (args.commandColumn.type === "Save") {
      try {
        await axios
          .patch(`form_response/clothings/${modifiedData._id}`, modifiedData)
          .then((res) => {
            alert(res.data.message);
            // console.log(res.data);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
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

  return data["data"].length > 0 ? (
    <GridComponent
      dataSource={transformedData}
      allowPaging={true}
      allowSorting={true}
      pageSettings={pageSettings}
      allowEditing={true}
      editSettings={editSettings}
      allowGrouping={true}
      height={350}
      commandClick={(args) => handleSave(args)}
    >
      <ColumnsDirective>
        {transformedColumns?.map(({ field, width }) => (
          <ColumnDirective
            key={field}
            headerText={checkHeaderText(field)}
            visible={field === "_id" ? false : true}
            field={field}
            allowEditing={field === "price"}
            width={width}
          />
        ))}

        <ColumnDirective headerText="Action" width={100} commands={commands} />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Group, Edit, CommandColumn]} />
    </GridComponent>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default ClothingGrid;
