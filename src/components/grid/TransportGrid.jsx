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
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import { TransportRows, TransportColumns } from "../../data/formResponses";
import { NoData } from "../reusable";

const TransportGrid = ({ data }) => {
  let dataCount = data.totalCount;

  let transportData = data.data;

  const transformedData =
    transportData.length > 0 &&
    transportData.map((item, i) => ({
      S_N: i + 1,
      id: item.created_by.id,
      LGA: item.lga,
      route: item.route,
      mode: item.mode,
      _id: item._id,
      cost: item.cost,
    }));
  const transportColumns =
    transportData.length > 0 &&
    Object.keys(transformedData[0]).map((item) => ({
      field: item,
      width: item === "route" ? item.length + 200 : 130,
    }));

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

  const handleSave = async (args) => {
    // console.log(args);

    const modifiedData = args.rowData;
    if (args.commandColumn.type === "Save") {
      try {
        await axios
          .patch(`form_response/transport/${modifiedData._id}`, modifiedData)
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

  return transportData.length > 0 ? (
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
        {transportColumns.map(({ field, width }) => (
          <ColumnDirective
            key={field}
            field={field}
            headerText={checkHeaderText(field)}
            width={width}
            visible={field !== "_id"}
            allowEditing={field === "cost"}
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

export default TransportGrid;
