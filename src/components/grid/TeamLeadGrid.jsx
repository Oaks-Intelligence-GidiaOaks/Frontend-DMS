import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../../context";
import axios from "axios";
// import { ElectricityColumns, ElectricityRows } from "../../data/formResponses";

const TeamLeadGrid = ({ data }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  let teamLeadsData = data.users;

  const dataColumns = Object.keys(teamLeadsData[0])
    .filter(
      (item) =>
        item !== "avarter" &&
        item !== "createdAt" &&
        item !== "firstUse" &&
        item !== "updatedAt" &&
        item !== "enumerators" &&
        item !== "disabled" &&
        item !== "LGA" &&
        item !== "__v" &&
        item !== ""
    )
    .map((it) => ({
      field: it,
      width: it.length + 150,
    }));

  // console.log(dataColumns);

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

    const { email, firstName, lastName, role, states, id, _id, LGA } = user;

    const transformedUser = {
      email,
      firstName,
      lastName,
      role,
      states,
      LGA,
      id,
      _id,
    };

    navigate(`/admin/team_leads/${user._id}`, {
      state: transformedUser,
    });
  };

  const handleDelete = (user) => {
    console.log("Delete", user);

    if (user) {
      axios
        .put(`admin/user/disable/${user._id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  };

  const handleResetPassword = (user) => {
    console.log("Reset Password", user);
  };

  const ActionTemplate = (rowData) => {
    return (
      <div className="action-container text-[10px]">
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
            className={`popup-menu fixed flex flex-col gap-1 p-2 rounded bg-blue-50 drop-shdow-sm z-50`}
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            <button
              className="see-more-button hover:text-gray-700"
              onClick={() => handleSeeMore(rowData)}
            >
              See More
            </button>

            <button
              className="reset-button hover:text-gray-700"
              onClick={() => handleResetPassword(rowData)}
            >
              Reset Password
            </button>

            <button
              className="delete-button text-red-500 hover:text-red-900"
              onClick={() => handleDelete(rowData)}
            >
              Delete
            </button>

            {user.role === "super_admin" && (
              <button
                className="delete-button text-blue-500 hover:text-gray-700"
                onClick={() => handleDelete(rowData)}
              >
                Make Admin
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="z-10">
      <div className="p-3  text-base font-semibold tracking-tighter">
        Users - Team Leads
      </div>

      <GridComponent
        dataSource={teamLeadsData}
        allowPaging={true}
        allowSorting={true}
        pageSettings={{ pageSize: 50 }}
        allowSelection={false}
        height={400}
      >
        <ColumnsDirective>
          {dataColumns.map(({ field, width }) => (
            <ColumnDirective
              visible={field === "state" || field === "_id" ? false : true}
              key={field}
              field={field}
              width={width}
            />
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

export default TeamLeadGrid;
