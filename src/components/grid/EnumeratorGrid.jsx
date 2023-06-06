import React, { useState } from "react";
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
import { ElectricityColumns, ElectricityRows } from "../../data/formResponses";

const EnumeratorGrid = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

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

  const handleSeeMore = (user) => {
    console.log("See More", user);
  };

  const handleDelete = (user) => {
    console.log("Delete", user);
  };

  const handleResetPassword = (user) => {
    console.log("Reset Password", user);
  };

  const ActionTemplate = (rowData) => {
    return (
      <div className="action-container">
        <div
          className="hamburger-menu space-y-1 grid place-items-center cursor-pointer"
          onClick={(e) => handleMenuToggle(e, rowData)}
        >
          <div className="border-2 border-blue-400 w-6"></div>
          <div className="border-2 border-blue-400 w-6"></div>
          <div className="border-2 border-blue-400 w-6"></div>
        </div>
        {selectedUser && selectedUser.index === rowData.index && isMenuOpen && (
          <div
            className={`popup-menu fixed flex flex-col gap-2 p-2 rounded bg-blue-50 drop-shdow-sm z-50`}
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            <button
              className="see-more-button"
              onClick={() => handleSeeMore(rowData)}
            >
              See More
            </button>

            <button
              className="reset-button "
              onClick={() => handleResetPassword(rowData)}
            >
              Reset Password
            </button>

            <button
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

  return (
    <div className="z-10">
      <GridComponent
        dataSource={ElectricityRows}
        allowPaging={true}
        allowSorting={true}
        pageSettings={{ pageSize: 50 }}
        allowSelection={false}
        height={400}
      >
        <ColumnsDirective>
          {ElectricityColumns.map(({ field, width }) => (
            <ColumnDirective key={field} field={field} width={width} />
          ))}
          <ColumnDirective
            headerText="Actions"
            width="100"
            template={ActionTemplate}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
      </GridComponent>
    </div>
  );
};

export default EnumeratorGrid;
