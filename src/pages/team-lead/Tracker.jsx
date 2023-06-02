import React, { useEffect, useState } from "react";
import TrackerGrid from "../../components/grid/TrackerGrid";
import MeshedLineChart from "../../components/charts/MeshedLineChart";
import { MeshedLineChartData } from "../../data/charts";
import axios from "axios";

const Tracker = () => {
  const [trackerData, setTrackerData] = useState(null);
  const [timeOfSub, setTimeOfSub] = useState(null);

  let submitted = trackerData && trackerData.totalSubmission;
  let noResponse =
    trackerData && trackerData.totalEnumerators - trackerData?.totalSubmission;

  if (timeOfSub) {
    console.log("time of submission", timeOfSub);
  }

  let firstChart = timeOfSub && timeOfSub.slice(0, 10);
  let secondChart = timeOfSub && timeOfSub.length > 10 && timeOfSub.slice(10);

  useEffect(() => {
    axios
      .get("form_response/response_tracker")
      .then((res) => setTrackerData(res.data))
      .catch((err) => console.log(err));

    axios
      .get("form_response/submission_time")
      .then((res) => setTimeOfSub(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="border flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center flex-wrap gap-3">
        <div className="rounded bg-primary p-3 flex items-center justify-between  xs:flex-1 md:flex-initial gap-6 xs:gap-16 shrink-0 text-xs">
          <p className="text-white">Submitted</p>
          <p className="rounded p-1 text-primary bg-white">{submitted}</p>
        </div>

        <div className="flex p-3 lg:ml-8 items-center gap-6 w-fit rounded bg-white">
          <p className="">No response</p>
          <p className="text-primary p-1 bg-gray-200 rounded text-sm">
            {noResponse}
          </p>
        </div>
      </div>

      {/* table */}
      <div className="bg-white  w-full">
        <TrackerGrid data={trackerData} />
      </div>

      {/* chart */}
      <div className="p-3 flex flex-col lg:flex-row gap-3 rounded-xl drop-shadow-lg ">
        {firstChart && (
          <div className="h-72 lg:w-1/2 bg-white rounded drop-shadow-lg">
            <MeshedLineChart data={firstChart} />
          </div>
        )}

        {secondChart && (
          <div className="h-72 lg:w-1/2 bg-white rounded drop-shadow-lg">
            <MeshedLineChart data={secondChart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
