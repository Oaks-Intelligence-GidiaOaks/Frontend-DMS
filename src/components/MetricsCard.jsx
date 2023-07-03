import React from "react";
import Curve from "/Curve.svg";
import Pie from "./charts/Pie";

const MetricsCard = ({
  lead,
  leadCount,
  guide,
  guideCount,
  legendOne,
  legendTwo,
  data,
}) => {
  // team_lead
  let totalEnumerators = data?.totalEnumerators;
  let submitted = data.submited;
  // let totalLga = data.totalLga;
  let totalLgas = data.assignedLga;

  // admin
  let totalTeamLeads = data.totalTeamLead;

  let newlyAdded = data.newlyAdded;
  let notSubmitted = data.notSubmited;
  let unAssignedLga = data.totalLga - data.assignedLga;

  // admin
  const getValue1 = (val, vall, valll, vallll) => {
    if (val || val === 0) {
      return val;
    } else if (vall || vall === 0) {
      return vall;
    } else if (valll || valll === 0) {
      return valll;
    } else {
      return vallll;
    }
  };

  const getValue2 = (val, vall, valll) => {
    if (val || val === 0) {
      return val;
    } else if (vall || vall === 0) {
      return vall;
    } else {
      return valll;
    }
  };

  const transformedData = Object.entries(data).map((item) => ({
    id: item[0],
    value: item[1],
  }));

  const transformedLgaData = [
    { id: "unAssignedLga", value: unAssignedLga },
    { id: "totalLgas", value: totalLgas },
  ];

  return (
    <div className="rounded-md w-fit shrink-0 relative bg-white px-3 py-3 text-sm drop-shadow-sm flex">
      <div className="pr-6">
        <p className="font-bold flex gap-1">
          <span>{lead}: </span>
          <span>
            {getValue1(totalEnumerators, submitted, totalLgas, totalTeamLeads)}
          </span>
        </p>

        <p className="text-xs">
          {guide}: {getValue2(newlyAdded, notSubmitted, unAssignedLga)}
        </p>
      </div>

      <div className="text-xs">
        {/* chart */}
        <div className="h-[70px] w-[70px] ml-auto">
          {data.totalLga ? (
            <Pie iR={0} data={transformedLgaData} />
          ) : (
            <Pie iR={0} data={transformedData} />
          )}
        </div>

        <div className="">
          <div className="flex items-center sdivace-x-1">
            <div className="h-2 w-2 bg-yellow-500 mr-1" />
            <span>{legendOne}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-orange-500 mr-1" />
            <span>{legendTwo}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0">
        {/* pie chart goes here */}
        <img src={Curve} alt="" />
      </div>
    </div>
  );
};

export default MetricsCard;
