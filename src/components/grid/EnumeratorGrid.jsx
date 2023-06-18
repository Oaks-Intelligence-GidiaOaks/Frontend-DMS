import React, { useRef, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Edit,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";

const EnumeratorGrid = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState(data ?? data);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const editOptions = {
    allowEditing: true,
    mode: "Dialog",
    allowDeleting: true,
  };

  const commands = [
    {
      type: "Edit",
      buttonOption: {
        iconCss: "e-icons e-edit",
        cssClass: "e-flat",
      },
    },
  ];

  const handleDelete = (user) => {
    console.log("Delete", user);
  };

  const handleResetPassword = (user) => {
    console.log("Reset Password", user);
  };

  const ActionTemplate = (rowData) => {
    const handleMenuToggle = (event, user) => {
      event.stopPropagation();
      setSelectedUser(user);
      setIsMenuOpen(!isMenuOpen);
      const rect = event.currentTarget.getBoundingClientRect();

      setPopupPosition({
        top: rect.top + rect.height,
        left: rect.left,
      });
    };

    return (
      <div className="action-container">
        <div
          className="hamburger-menu space-y-1 grid place-items-center cursor-pointer"
          onClick={(e) => handleMenuToggle(e, rowData)}
        >
          <div key="action1" className="border-2 border-blue-400 w-6"></div>
          <div key="action2" className="border-2 border-blue-400 w-6"></div>
          <div key="action3" className="border-2 border-blue-400 w-6"></div>
        </div>
        {selectedUser && selectedUser.index === rowData.index && isMenuOpen && (
          <div
            className={`popup-menu fixed flex flex-col gap-2 p-2 rounded bg-blue-50 drop-shdow-sm z-50`}
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            <button
              key="key1"
              className="reset-button "
              onClick={() => handleResetPassword(rowData)}
            >
              Reset Password
            </button>

            <button
              key="key2"
              className="delete-button text-red-500"
              onClick={() => handleDelete(rowData)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  const serialNumberTemplate = (rowData) => {
    return rowData ? Number(rowData.index) + 1 : "";
  };

  const onActionBegin = (args) => {
    // console.log(args);
  };

  const onActionComplete = (args) => {
    // console.log(args);
    if (args.requestType === "save") {
      const { LGA, email, firstName, identity, identityType, lastName, id } =
        args.data;

      const editedEnum = {
        firstName,
        lastName,
        identity,
        identityType,
        id,
        email,
        LGA,
      };

      axios
        .put(`admin/enumerator/${args.data._id}`, editedEnum)
        .then((res) => {
          setTableData((prev) =>
            prev.map((item) =>
              item._id === res.data.user._id ? res.data.user : item
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="z-10">
      <GridComponent
        dataSource={tableData}
        allowPaging={true}
        allowSorting={true}
        editSettings={editOptions}
        pageSettings={{ pageSize: 60 }}
        height={340}
        actionBegin={onActionBegin}
        actionComplete={onActionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective
            width={80}
            allowEditing={false}
            template={serialNumberTemplate}
            headerText="S/N"
          />
          <ColumnDirective isPrimaryKey={true} field="id" width={120} />
          <ColumnDirective width={150} field="firstName" />
          <ColumnDirective width={150} field="lastName" />
          <ColumnDirective width={150} field="email" />
          <ColumnDirective width={150} field="phoneNumber" />
          <ColumnDirective
            width={150}
            allowEditing={false}
            field="identityType"
          />
          <ColumnDirective width={150} field="identity" />
          <ColumnDirective width={150} allowEditing={false} field="role" />
          <ColumnDirective width={150} allowEditing={false} field="state" />
          <ColumnDirective width={150} allowEditing={false} field="LGA" />

          {/* <ColumnDirective
            headerText="Actions"
            allowEditing={false}
            width="100"
            template={ActionTemplate}
          /> */}
          <ColumnDirective headerText="Edit" width={120} commands={commands} />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
      </GridComponent>
    </div>
  );
};

export default EnumeratorGrid;
