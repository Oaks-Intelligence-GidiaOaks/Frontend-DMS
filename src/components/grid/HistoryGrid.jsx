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

const HistoryGrid = ({ data }) => {


    let tableData = data.map((item) => ({
        ...item,
        created_at: item.created_at
            ? arrangeTime(item.created_at)
            : item.updatedAt
                ? arrangeTime(item.updatedAt)
                : item.updatedAt,
        status: item.description,
    }));

    // Modify the data by trimming "::ffff:" from ip_address
    const modifiedTableData = tableData.map((item) => {
        if (item.ip_address && item.ip_address.startsWith("::ffff:")) {
            item.ip_address = item.ip_address.replace("::ffff:", "").trim();
        }
        return item;
    });

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
            // allowSorting={true}
            pageSettings={pageSettings}
            allowEditing={true}
            editSettings={editSettings}
            height={310}
        >
            <ColumnsDirective>
                <ColumnDirective
                    headerText="S/N"
                    width={80}
                    template={serialNumberTemplate}
                />

                <ColumnDirective field="name" headerText="Name" width={150} />
                <ColumnDirective field="title" headerText="Title" width={120} />
                <ColumnDirective field="id" headerText="Id" width={120} />
                <ColumnDirective field="ip_address" headerText="Ip address" width={120} />
                <ColumnDirective field="status" headerText="Actions" width={150} />

                <ColumnDirective
                    field="created_at"
                    headerText="Transaction date/time"
                    width={170}
                />
                <ColumnDirective
                    field="form_id"
                    headerText="Form id"
                    visible={false}
                    width={120}
                />
            </ColumnsDirective>

            <Inject services={[Sort, Edit, Toolbar, Edit]} />
        </GridComponent>
    ) : (
        <div className="grid place-items-center w-full">
            <span>loading..</span>
        </div>
    );
};

export default HistoryGrid;
