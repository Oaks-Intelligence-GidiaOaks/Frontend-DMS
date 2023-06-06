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
      width: item.length < 4 ? 100 : item.length + 130,
    }));

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  const toolbarOptions = ["Edit", "Delete", "Update", "Cancel"];
  const pageSettings = { pageSize: 50 };
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
          .patch(
            `form_response/food_product/${modifiedData._id}`,
            modifiedData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            alert(res.data.message);
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
      commandClick={(args) => handleSave(args)}
    >
      <ColumnsDirective>
        {transformedColumns?.map(({ field, width }) => (
          <ColumnDirective
            key={field}
            field={field}
            isPrimaryKey={field === "_id" ? true : false}
            width={width}
          />
        ))}

        <ColumnDirective headerText="Action" width={100} commands={commands} />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Filter, Group, Edit, CommandColumn]} />
    </GridComponent>
  ) : (
    <div className="py-16  grid place-items-center w-full">
      <p className="w-1/2 ">No submissions received yet...</p>
    </div>
  );
};

export default FoodGrid;
