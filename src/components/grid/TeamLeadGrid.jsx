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
import { TableModal } from "../reusable";

const TeamLeadGrid = ({ data }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [tableModal, setTableModal] = useState(null);

  let teamLeadsData = data.users;

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
    const {
      email,
      firstName,
      lastName,
      role,
      states,
      id,
      _id,
      LGA,
      avatar,
      phoneNumber,
    } = user;

    const transformedUser = {
      email,
      firstName,
      lastName,
      phoneNumber,
      role,
      states,
      LGA,
      id,
      _id,
      avatar,
    };

    navigate(`/admin/team_leads/${user._id}`, {
      state: transformedUser,
    });
  };

  const handleDelete = (user) => {
    if (user) {
      axios
        .put(`admin/user/disable/${user._id}`)
        .then((res) => {
          setIsMenuOpen(false);
          setTableModal(`Disabled user id ${user.id} successfully`);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleResetPassword = (user) => {
    const { id } = user;

    setIsMenuOpen(false);

    axios
      .put("password/reset", { id: id })
      .then((res) => {
        setTableModal(`Password reset for ${id} successful`);
      })
      .catch((err) => console.log(err));
  };

  const handleMakeAdmin = (user) => {
    const { firstName, lastName, phoneNumber, role, id, states, LGA, email } =
      user;

    axios
      .put(`admin/user/${user._id}`, {
        firstName,
        lastName,
        phoneNumber,
        role: "admin",
        email,
        LGA,
        states,
        id,
      })
      .then((res) => {
        console.log(res.data);
        setIsMenuOpen(false);
        setTableModal(`User ${user.id} upgraded to Admin`);
      })
      .catch((err) => console.error(err));
  };

  const serialNumberTemplate = (rowData) => {
    return rowData ? Number(rowData.index) + 1 : "";
  };

  const ActionTemplate = (rowData) => {
    
    return (
      <div className="action-container text-[10px]">
        <div
          className="hamburger-menu space-y-1 grid place-items-center cursor-pointer"
          onClick={(e) => handleMenuToggle(e, rowData)}
        >
          <div className="border border-blue-400 w-6"></div>
          <div className="border border-blue-400 w-6"></div>
          <div className="border border-blue-400 w-6"></div>
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
                onClick={() => handleMakeAdmin(rowData)}
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
    <div className="z-10 relative">
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
          <ColumnDirective
            headerText="S/N"
            template={serialNumberTemplate}
            width={80}
          />

          <ColumnDirective
            field="firstName"
            headerText="First name"
            width={130}
          />
          <ColumnDirective
            field="lastName"
            headerText="Last name"
            width={130}
          />
          <ColumnDirective field="email" headerText="Email" width={210} />
          <ColumnDirective field="id" headerText="Id" width={130} />
          {/* <ColumnDirective field="states" headerText="States" width={130} /> */}
          <ColumnDirective field="role" headerText="Role" width={130} />

          <ColumnDirective
            headerText="Actions"
            width="100"
            template={ActionTemplate}
          />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, CommandColumn]} />
      </GridComponent>

      {tableModal && (
        <div className="absolute top-0 bg-[rgba(0,0,0,.2)] h-full w-full grid place-items-center">
          <TableModal
            text={tableModal}
            closeModal={() => setTableModal(null)}
          />
        </div>
      )}
    </div>
  );
};

export default TeamLeadGrid;
