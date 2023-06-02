import React from "react";

const RecentActivity = ({ Icon }) => {
  return (
    <div>
      <span className="text-gray-500 text-sm">30 mins ago</span>
      <div className="flex items-center">
        <img src={Icon} alt="actvity icon" />
        <span className="pl-3">Added an enumerator</span>
      </div>
    </div>
  );
};

export default RecentActivity;
