import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useApp, useAuth } from "../../context";
import AdminSidebar from "./AdminSidebar";
import ChangePassword from "../enumeratorFormTabs/ChangePassword";

const Admin = ({ children }) => {
  const { sidebarShown } = useApp();
  const { user } = useAuth();

  return (
    <div className="bg-[#FAF9F9] h-full flex w-full relative">
      <AdminSidebar />

      <div className="flex-1 flex-col overflow-y-scroll">
        <TopBar />

        {/* main content */}
        <div className=" z-10 px-3 relative">{children}</div>
      </div>
      {user?.firstUse && <ChangePassword />} 
    </div>
  );
};

export default Admin;
