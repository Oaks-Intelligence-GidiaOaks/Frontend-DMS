import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../../context";
import { IconButton } from "@mui/material";

const SidebarItem = ({ text, Icon, active, link }) => {
  const { setCurrentPage, setSidebarShown, sidebarShown } = useApp();

  const activeStyle = "bg-oaksgreen text-white flex items-center p-3 rounded-l";
  const normalStyle = "flex items-center p-3 rounded-l";

  const handleNavLinkClick = () => {
    if (sidebarShown) {
      setSidebarShown((prevState) => !prevState);
    }
    setCurrentPage(link);
  };

  return (
    <NavLink
      onClick={handleNavLinkClick}
      className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
      to={`/${link}`}
    >
      <div className="flex items-center">
        <Icon className="h-4 w-4 " />
        <span className="pl-3 capitalize ">{text}</span>
      </div>
    </NavLink>
  );
};

export default SidebarItem;
