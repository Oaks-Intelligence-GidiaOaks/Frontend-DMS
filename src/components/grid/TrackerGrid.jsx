import React, { useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Edit,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

const arrangeTime = (time) => {
  const passedDate = new Date(time);
  const formattedDate = passedDate.toLocaleDateString("en-US", {
    timeZone: "Africa/Lagos",
  });
  const formattedTime = passedDate.toLocaleTimeString("en-US", {
    timeZone: "Africa/Lagos",
    hour: "numeric",
    minute: "numeric",
  });

  return `${formattedDate} ${formattedTime}`;
};

const TrackerGrid = ({ data }) => {

  console.log(data, "Data");
  let tableData = data.map((item) => ({
    ...item,
    created_at: item.created_at
      ? item.created_at
        ? arrangeTime(item.created_at)
        : item.created_at
      : item.updated_at
      ? arrangeTime(item.updated_at)
      : item.updated_at,
    status: item.status ? "submitted" : "no response",
  }));

  const pageSettings = { pageSize: 35 };

  const editSettings = {
    allowEditing: false,
  };

  const serialNumberTemplate = (rowData) => {
    return rowData ? Number(rowData.index) + 1 : "";
  };

  return data ? (
    <GridComponent
      dataSource={tableData}
      allowPaging={true}
      allowSorting={true}
      pageSettings={pageSettings}
      allowEditing={true}
      editSettings={editSettings}
      height={210}
    >
      <ColumnsDirective>
        <ColumnDirective
          headerText="S/N"
          width={80}
          template={serialNumberTemplate}
        />
        <ColumnDirective
          field="first_name"
          headerText="First name"
          width={150}
        />
        <ColumnDirective field="last_name" headerText="Last name" width={150} />
        <ColumnDirective field="id" headerText="Id" width={120} />
        <ColumnDirective field="state" headerText="State" width={120} />
        <ColumnDirective field="lga" headerText="LGA" width={150} />
        <ColumnDirective field="status" headerText="Status" width={150} />

        <ColumnDirective
          field="created_at"
          headerText="Submission time"
          width={170}
        />
        <ColumnDirective
          field="form_id"
          headerText="Form id"
          visible={false}
          width={120}
        />
      </ColumnsDirective>

      <Inject services={[Page, Sort, Edit]} />
    </GridComponent>
  ) : (
    <div className="grid place-items-center w-full">
      <span>loading..</span>
    </div>
  );
};

export default TrackerGrid;
