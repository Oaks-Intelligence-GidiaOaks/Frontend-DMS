import React, { useEffect, useState } from "react";
import TrackerGrid from "../../components/grid/TrackerGrid";
import MeshedLineChart from "../../components/charts/MeshedLineChart";
import {
  allLgasChidinma,
  allLgasAkunna,
  allLgasChinyere,
  allLgasTimi,
  allLgasToju,
} from "../../data/charts";
import axios from "axios";
import { Loading } from "../../components/reusable";

const AdminTracker = () => {
  const [trackerData, setTrackerData] = useState(null);
  const [timeOfSub, setTimeOfSub] = useState(null);
  const [allTeamLeads, setAllTeamLeads] = useState(null);

  let transChartTime = null;

  if (timeOfSub && allTeamLeads) {
    transChartTime = [];

    allTeamLeads.map((lead) => {
      let leadData = timeOfSub.filter((submission) =>
        lead?.LGA.includes(submission?.lga)
      );

      if (leadData.length > 0) {
        let newLeadData = leadData.map((item) => ({
          ...item,
          lga: lead.firstName,
        }))[0];

        transChartTime.push(newLeadData);
      }
    });
  }

  useEffect(() => {
    axios
      .get(`admin/team_lead`)
      .then((res) => {
        setAllTeamLeads(res.data.users);
      })
      .catch((err) => console.error(err));

    axios
      .get("form_response/admin_response_tracker")
      .then((res) => {
        setTrackerData(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("form_response/all_submission_time")
      .then((res) => {
        setTimeOfSub(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  let submitted =
    trackerData &&
    trackerData?.results?.filter((item) => item.status === true).length;

  let noResponse =
    submitted &&
    trackerData?.results?.filter((item) => item.status === false).length;

  return (
    <div className="flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center flex-wrap gap-3">
        <div className="rounded bg-primary p-3 flex items-center justify-between  xs:flex-1 md:flex-initial gap-6 xs:gap-16 shrink-0 text-xs">
          <p className="text-white">Submitted</p>
          <p className="rounded p-1 text-primary bg-white">
            {submitted ?? submitted}
          </p>
        </div>

        <div className="flex p-3 lg:ml-8 items-center gap-6 w-fit rounded bg-white">
          <p className="">No response</p>
          <p className="text-primary p-1 bg-gray-200 rounded text-sm">
            {noResponse ?? noResponse}
          </p>
        </div>
      </div>

      {/* table */}
      <div className="bg-white  w-full">
        {!trackerData ? (
          <div className="h-32">
            <Loading />
          </div>
        ) : (
          <TrackerGrid data={trackerData.results} />
        )}
      </div>

      {/* chart */}
      <div className="p-3 flex flex-col lg:flex-row overflow-x-scroll gap-3 rounded-xl drop-shadow-lg ">
        <div className="h-72 lg:w-1/2 bg-white rounded drop-shadow-lg p-2">
          {transChartTime && <MeshedLineChart data={transChartTime} />}
        </div>
      </div>
    </div>
  );
};

export default AdminTracker;
