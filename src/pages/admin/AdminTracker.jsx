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

  let transChartTime = null;

  if (timeOfSub) {
    let chidinma = timeOfSub
      .filter((item) => allLgasChidinma.includes(item.lga))
      .map((item) => ({ ...item, lga: `Chidinma` }))[0];

    let toju = timeOfSub
      .filter((item) => allLgasToju.includes(item.lga))
      .map((item) => ({ ...item, lga: `Toju` }))[0];

    let timi = timeOfSub
      .filter((item) => allLgasTimi.includes(item.lga))
      .map((item) => ({ ...item, lga: `Timi` }))[0];

    let akunna = timeOfSub
      .filter((item) => allLgasAkunna.includes(item.lga))
      .map((item) => ({ ...item, lga: `Akunna` }))[0];

    let chinyere = timeOfSub
      .filter((item) => allLgasChinyere.includes(item.lga))
      .map((item) => ({ ...item, lga: `Chinyere` }))[0];

    transChartTime = new Array();
    // transChartTime.push(...[chidinma]);
    if (chidinma !== undefined) {
      transChartTime.push(chidinma);
    }
    if (toju !== undefined) {
      transChartTime.push(chidinma);
    }
    if (timi !== undefined) {
      transChartTime.push(chidinma);
    }
    if (akunna !== undefined) {
      transChartTime.push(chidinma);
    }
    if (chinyere !== undefined) {
      transChartTime.push(chidinma);
    }
  }

  useEffect(() => {
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
    <div className="border flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
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
          <MeshedLineChart data={transChartTime ?? transChartTime} />
        </div>
      </div>
    </div>
  );
};

export default AdminTracker;
