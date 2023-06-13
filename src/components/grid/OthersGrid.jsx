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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { NoData } from "../reusable";

const OthersGrid = ({ data }) => {
  let dataCount = data?.totalCount;

  let othersData = data.data;

  const transformedData =
    othersData &&
    othersData.length > 0 &&
    data.data.map((item, i) => ({
      S_N: i + 1,
      id: item.created_by.id,
      LGA: item.lga,
      name: item.name,
      price: item.price === 0 ? "N/A" : item.price,
      brand: item.brand.length > 1 ? item.brand : "N/A",
      _id: item._id,
    }));

  const othersColumns =
    othersData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item.length ? item.length + 130 : 130,
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
          .patch(
            `form_response/other_products/${modifiedData._id}`,
            modifiedData
          )
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

  const checkHeaderText = (field) => {
    return field === "S_N"
      ? "S/N"
      : field === "id"
      ? "ID"
      : field === "lga"
      ? "LGA"
      : field === "name"
      ? "Name"
      : field === "price"
      ? "Price"
      : field === "brand"
      ? "Brand"
      : field;
  };

  return othersData.length > 0 ? (
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
        {othersColumns.map(({ field, width }) => (
          <ColumnDirective
            key={field}
            visible={field !== "_id"}
            headerText={checkHeaderText(field)}
            allowEditing={field === "price"}
            field={field}
            width={width}
          />
        ))}

        <ColumnDirective headerText="Action" width={100} commands={commands} />
      </ColumnsDirective>
      <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
    </GridComponent>
  ) : (
    <div className="h-32">
      <NoData text="No submissions received yet" />
    </div>
  );
};

export default OthersGrid;
