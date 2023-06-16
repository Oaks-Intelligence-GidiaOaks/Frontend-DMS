import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useApp, useAuth } from "../../context";
import { UpdatePassword } from "../reusable";

const TeamLead = ({ children }) => {
  const { user } = useAuth();
  const { sidebarShown } = useApp();
  // console.log(sidebarShown);

  return (
    <div className="bg-[#FAF9F9] h-full flex w-full relative">
      <Sidebar />

      <div className="flex-1 flex-col overflow-y-scroll">
        <TopBar />

        {/* main content */}
        <div className=" z-10 px-3 relative">{children}</div>
      </div>
    </div>
  );
};

export default TeamLead;
