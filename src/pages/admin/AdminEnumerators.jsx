import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Pie from "../../components/charts/Pie";
import { data } from "../../data/chartData";
import { useLocation, useParams } from "react-router-dom";
import { TeamLeadGrid } from "../../components/grid";
import { Link, useNavigate } from "react-router-dom";
import EnumeratorGrid from "../../components/grid/EnumeratorGrid";

const AdminEnumerators = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  let teamLeadData = location.state;

  // const { LGA, email, firstName, id, lastName, role, states, _id } =
  //   teamLeadData;
  // console.log(teamLeadData);

  const [tableData, setTableData] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const memoizedTeamLeads = useMemo(() => {
    return () =>
      axios
        .get(`/admin/team_lead_enumerators/${id}`)
        .then((res) => {
          setTableData(res.data);
        })
        .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => memoizedTeamLeads, []);

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center flex-wrap gap-2 xs:text-[10px]">
        <div className="rounded p-3 flex items-center gap-2 text-xs">
          <p className="text-sm font-semibold">
            {" "}
            {`${teamLeadData.firstName} ${teamLeadData.lastName}`} - Team Lead{" "}
          </p>
        </div>

        <div className="rounded bg-primary p-3 flex items-center gap-2 text-xs">
          <p className="text-white">Total Enumerators</p>
          <p className="rounded p-1 text-primary bg-white">
            {tableData && tableData?.totalTeamLead}
          </p>
        </div>

        <div
          onClick={() => navigate(-1)}
          className="rounded bg-white border border-primary text-primary flex items-center p-3 gap-12 sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between"
        >
          <span>-</span>
          <p>Back</p>
        </div>

        <div
          onClick={() =>
            navigate(`/admin/profile/${id}`, {
              state: teamLeadData,
            })
          }
          className="rounded bg-white border border-primary text-primary flex items-center p-3 gap-12 sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between"
        >
          <p>About</p>
          <span>+</span>
        </div>
      </div>

      {/* table */}
      <div className="bg-white  w-full text-xs">
        <div className="p-2 font-semibold text-base tracking-tighter">
          Users - Enumerators
        </div>

        {tableData?.enumerators.length > 0 ? (
          <EnumeratorGrid data={tableData.enumerators} />
        ) : (
          <p>No enumerators yet...</p>
        )}
      </div>
    </div>
  );
};

export default AdminEnumerators;
