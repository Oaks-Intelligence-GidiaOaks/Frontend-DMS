import React from "react";
import Group from "../../assets/icons/Group.svg";
import sun from "../../assets/icons/sun.svg";
import Star from "../../assets/icons/Star.svg";
import refresh from "../../assets/icons/refresh.svg";
import bell from "../../assets/icons/bell.svg";
import Search from "../../assets/icons/Search.svg";
import { useApp } from "../../context";
import { AiOutlineMenu } from "react-icons/ai";

const TopBar = () => {
  const { currentPage, setSidebarShown, sidebarShown } = useApp();

  // console.log(currentPage);

  return (
    <div className="p-2 px-6 drop-shadow-sm flex sticky top-0 bg-white w-full z-50">
      <div className="flex space-x-3 items-center flex-1  capitalize">
        <div className="sm:hidden xs:block">
          <AiOutlineMenu
            style={{ marginRight: "13px" }}
            onClick={() => setSidebarShown(!sidebarShown)}
          />
        </div>
        <span className="hidden md:inline">Dashboard/</span> {currentPage}
      </div>

      <div className="ml-auto flex space-x-3 items-center md:pl-8 lg:ml-28">
        <img src={sun} alt="" />
        <img src={refresh} alt="" />
        <img src={bell} alt="" />
      </div>
    </div>
  );
};

export default TopBar;
