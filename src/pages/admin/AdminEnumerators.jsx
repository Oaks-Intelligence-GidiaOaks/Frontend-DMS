import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { NoData } from "../../components/reusable";
import { useNavigate } from "react-router-dom";
import EnumeratorGrid from "../../components/grid/EnumeratorGrid";
import { IoIosArrowBack } from "react-icons/io";

const AdminEnumerators = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  let teamLeadData = location.state;

  const [tableData, setTableData] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  let totalEnumerators = tableData && tableData.enumerators.length;

  useEffect(() => {
    axios
      .get(`/admin/team_lead_enumerators/${id}`)
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center flex-wrap gap-2 xs:text-[10px]">
        <div className="rounded p-3 flex items-center gap-2 text-xs">
          <p className="text-sm font-semibold">
            {" "}
            {`${teamLeadData.firstName} ${teamLeadData.lastName}`} - Team Lead{" "}
          </p>
        </div>

        <div className="rounded bg-oaksyellow p-3 flex items-center ml-auto gap-2 text-xs">
          <p className="text-white">Total Enumerators</p>
          <p className="rounded p-1 text-oaksyellow bg-white">
            {totalEnumerators}
          </p>
        </div>

        <div
          onClick={() => navigate(-1)}
          className="rounded cursor-pointer ml-auto border bg-oaksgreen px-6  lg:ml-auto bg-oaksGreen p-3 flex items-center gap-3 text-xs"
        >
          <div className="p-1 bg-white text-ecnter rounded">
            <IoIosArrowBack />
          </div>
          <p className="text-white">Back</p>
        </div>

        <div
          onClick={() =>
            navigate(`/admin/profile/${id}`, {
              state: teamLeadData,
            })
          }
          className="rounded bg-white border border-oaksgreen text-oaksgreen flex items-center p-3 gap-12  cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between"
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
          <NoData text="No enumerator yet" />
        )}
      </div>
    </div>
  );
};

export default AdminEnumerators;
