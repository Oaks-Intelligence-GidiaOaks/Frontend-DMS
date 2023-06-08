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
  Group,
  beginEdit,
  Toolbar,
  CommandColumn,
  Column,
} from "@syncfusion/ej2-react-grids";
import { FoodRows, FoodColumns } from "../../data/formResponses";
import axios from "axios";
import { useAuth } from "../../context";

const FoodGrid = ({ data: foodRowss }) => {
  // console.log(foodRowss["data"]);
  const {
    user: { token },
  } = useAuth();

  let foodData = foodRowss["data"];

  console.log(foodData);

  const transformedData =
    foodData.length > 0 &&
    foodData?.map((item, i) => ({
      S_N: i + 1,
      _id: item._id,
      id: item.created_by.id,
      lga: item.lga,
      name: item.name,
      price: item.price,
    }));

  const transformedColumns =
    foodData.length > 0 &&
    Object.keys(transformedData?.[0]).map((item) => ({
      field: item,
      width: item.length < 4 ? 120 : item.length + 130,
    }));

  // console.log(transformedColumns);

  // const [isEditMode, setIsEditMode] = useState(false);
  // const [editedData, setEditedData] = useState({});

  const pageSettings = { pageSize: 60 };
  const sortSettings = { colums: [{ field: "state", direction: "Ascending" }] };

  const editSettings = {
    allowEditing: true,
  };

  const handleSave = async (args) => {
    console.log(args);
    const modifiedData = args.rowData;
    if (args.commandColumn.type === "Save") {
      try {
        await axios
          .patch(`form_response/food_product/${modifiedData._id}`, modifiedData)
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

  return foodRowss["data"].length > 0 ? (
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
    <div>No data available for current week...</div>
  );
};

export default FoodGrid;
