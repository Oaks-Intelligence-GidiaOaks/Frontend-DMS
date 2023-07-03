import React, { useEffect, useState } from "react";
import axios from "axios";
import { UpdateLgaRoutes, CreateLgaRoutes } from "../../components/primitives";

const AdminNewRoute = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [lgaRoutes, setLgaRoutes] = useState([]);

  useEffect(() => {
    axios
      .get(`lga_routes`)
      .then((res) => setLgaRoutes(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  let activeTabStyle =
    "bg-blue-500 text-white my-6  p-2 cursor-pointer rounded";
  let nonActiveTabStyle = "text-black my-6 cursor-pointer rounded";

  return (
    <div className="lg:w-3/5 lg:pl-16">
      <div className="flex items-center space-x-6">
        <div
          className={
            activeTab === "create" ? activeTabStyle : nonActiveTabStyle
          }
          onClick={() => {
            setActiveTab("create");
          }}
        >
          <h2 className="text-sm font-bold ">Create New LGA Route</h2>
        </div>

        <div
          className={
            activeTab === "update" ? activeTabStyle : nonActiveTabStyle
          }
          onClick={() => {
            setActiveTab("update");
          }}
        >
          <h2 className="text-sm font-bold ">Update LGA Route</h2>
        </div>
      </div>

      {activeTab === "create" ? (
        <CreateLgaRoutes lgaRoutes={lgaRoutes} />
      ) : (
        <UpdateLgaRoutes lgaRoutes={lgaRoutes} />
      )}
    </div>
  );
};

export default AdminNewRoute;
