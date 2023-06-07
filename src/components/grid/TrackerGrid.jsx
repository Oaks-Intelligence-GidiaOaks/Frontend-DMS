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
  const formattedDate = passedDate.toLocaleDateString();
  const formattedTime = passedDate.toLocaleTimeString();

  return `${formattedDate} ${formattedTime}`;
};

const TrackerGrid = ({ data }) => {
  console.log(data);

  let tableData = data.map((item) => ({
    ...item,
    created_at: item.created_at
      ? arrangeTime(item.created_at)
      : item.created_at,
    status: item.status ? "submitted" : "no response",
  }));

  const pageSettings = { pageSize: 35 };

  const editSettings = {
    allowEditing: false,
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
        <ColumnDirective field="first_name" width={150} />
        <ColumnDirective field="last_name" width={150} />
        <ColumnDirective field="id" width={120} />
        <ColumnDirective field="state" width={120} />
        <ColumnDirective field="lga" width={150} />
        <ColumnDirective field="status" width={150} />

        <ColumnDirective
          field="created_at"
          headerText="submission_time"
          width={170}
        />
        <ColumnDirective field="form_id" visible={false} width={120} />
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
