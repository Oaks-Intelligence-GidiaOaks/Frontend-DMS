import React, { useEffect, useState } from "react";
import axios from "axios";

import { TeamLeadGrid } from "../../components/grid";
import { Link } from "react-router-dom";

const TeamLeads = () => {
  const [tableData, setTableData] = useState(null);
  // const [isloading, setIsLoading] = useState(true)

  if (tableData) {
    // console.log(tableData);
  }

  useEffect(() => {
    axios
      .get("admin/team_lead")
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="border flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center flex-wrap gap-2 xs:text-[10px]">
        <div className="rounded bg-primary p-3 flex items-center gap-2 text-xs">
          <p className="text-white">Total Team Leads</p>
          <p className="rounded p-1 text-primary bg-white">
            {tableData && tableData?.totalTeamLead}
          </p>
        </div>

        <div className="flex p-3 md:ml-8 items-center gap-6 w-fit rounded bg-white">
          <p className="">Recently Added</p>
          <p className="text-primary p-1 bg-gray-200 rounded text-sm">
            {tableData && tableData?.newlyAdded}
          </p>
        </div>

        <Link
          to="/admin/add"
          onClick={() => {}}
          className="rounded bg-white border border-primary text-primary flex items-center p-3 gap-12 sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between"
        >
          <p>Add new</p>
          <span>+</span>
        </Link>

        <Link
          to="/admin/new-lga"
          onClick={() => {}}
          className="rounded bg-white border border-primary text-primary flex items-center p-3 gap-12 sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between"
        >
          <p>Enroll new Lga</p>
          <span>+</span>
        </Link>
      </div>

      {/* table */}
      <div className="bg-white  w-full text-xs">
        {tableData?.users.length > 0 ? (
          <TeamLeadGrid data={tableData ?? tableData} />
        ) : (
          <p>You have no team leads yet...</p>
        )}
      </div>
    </div>
  );
};

export default TeamLeads;
