import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useApp, useAuth } from "../../context";
import { UpdatePassword } from "../reusable";
import ChangePassword from "../enumeratorFormTabs/ChangePassword";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const TeamLead = ({ children }) => {
  const { user } = useAuth();
  const { sidebarShown } = useApp();
  // console.log(sidebarShown);

  return user?.firstUse ? (
    <ChangePassword />
  ) : (
    <div className="bg-[#FAF9F9] h-full flex w-full relative">
      <Sidebar />

      <div className="flex-1 flex-col overflow-y-scroll">
        <TopBar />

        <ToastContainer />

        {/* main content */}
        <div className=" z-10 px-3 relative">{children}</div>
      </div>
      {user?.firstUse && <ChangePassword />}
    </div>
  );
};

export default TeamLead;
