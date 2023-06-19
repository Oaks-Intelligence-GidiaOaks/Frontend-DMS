import React from "react";
import right from "../../assets/icons/right.svg";

import SidebarItem from "./SidebarItem";
import RecentActivity from "../RecentActivity";
import { NavLink } from "react-router-dom";
import { useApp, useAuth } from "../../context";
import {
  Home,
  FilterNone,
  Groups,
  OpenWith,
  Logout,
} from "@mui/icons-material";
import LogoutButton from "../LogoutButton";
import { GiMightyForce } from "react-icons/gi";

const Sidebar = () => {
  const { setCurrentPage, sidebarShown, setSidebarShown } = useApp();
  const { user } = useAuth();

  const activeStyle = "bg-gray-200 p-3 mt-3";
  const nonActiveStyle = "p-3 mt-3";

  const handleNavLinkClick = () => {
    if (sidebarShown) {
      setSidebarShown(false);
    }
    setCurrentPage("profile");
  };

  return (
    <div
      className={`w-72 xs:absolute md:static top-0 left-0 ${
        sidebarShown ? "xs:initial" : "xs:hidden"
      } sm:block left-0 z-30 lg:shrink-0 h-full text-sm bg-white `}
    >
      <div className="ml-10 flex flex-col h-full">
        <p className="mt-2 capitalize p-1 px-2 text-white bg-oaksgreen w-fit flex items-center gap-2 rounded">
          <GiMightyForce />
          {user.role.replace("_", " ")}
        </p>

        <NavLink
          className={({ isActive }) =>
            isActive ? activeStyle : nonActiveStyle
          }
          onClick={handleNavLinkClick}
          to="/profile"
        >
          <div className="flex items-start ">
            <img
              src={
                user.avatar.url ||
                `https://res.cloudinary.com/emmaotuonye1/image/upload/v1687122736/avatars/cmogk2u8cxngvjcenow2.png`
              }
              className="h-10 w-10 border rounded-full mr-2"
              alt="avatar"
            />
            <div className="text-[12px] p-1">
              <p className="text-[16px]">
                {user.firstName} {user.lastName}{" "}
              </p>
              <span>{user.id}</span>
            </div>

            <img src={right} alt="" className="ml-auto p-2" />
          </div>
        </NavLink>

        {/* nav links */}
        <div className="mt-8 space-y-2">
          <SidebarItem Icon={Home} key="1" text="Home" active link="home" />

          <SidebarItem
            key="2"
            text="Enumerators"
            Icon={Groups}
            link="enumerators"
          />

          <SidebarItem
            key="3"
            text="Form responses"
            Icon={FilterNone}
            link="responses"
          />

          <SidebarItem
            key="4"
            text="Response tracker"
            Icon={OpenWith}
            link="tracker"
          />

          <SidebarItem
            key="5"
            text="Master list"
            Icon={OpenWith}
            link="master"
          />

          <LogoutButton />
        </div>

        {/* recent activities */}
        {/* <div className="mt-auto pb-2 h-56 flex flex-col ">
          <p className="mb-3 font-bold">Recent Actvities</p>

          <div
            className="space-y-3 overflow-y-scroll scrollbar-hidee text-xs "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <RecentActivity key="1" Icon={user} />
            <RecentActivity key="2" Icon={user} />
            <RecentActivity key="3" Icon={user} />
            <RecentActivity key="4" Icon={user} />
            <RecentActivity key="5" Icon={user} />
            <RecentActivity key="6" Icon={user} />
            <RecentActivity key="7" Icon={user} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
