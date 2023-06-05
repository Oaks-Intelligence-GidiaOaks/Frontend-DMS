import React, { useState, useEffect } from "react";
import { Enum, TeamLeadGrid } from "./grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {MdKeyboardArrowLeft} from "react-icons/md"

const TeamLeadEnumerator = () => {
  const { _id } = useParams();

  const [teamLeadData, setTeamLeadData] = useState();
  let allEnumeratorData = teamLeadData?.users?.enumerators;
  console.log({ allEnumeratorData });

  useEffect(() => {
    axios
      .get(`/admin/team_lead_enumerators/${_id}`)
      .then((res) => {
        console.log(res.data);
        setTeamLeadData(res.data);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  return (
    <div className="border flex text-xs flex-col gap-6 h-full sm:mx-6 lg:mx-auto lg:w-[90%] mt-6">
      <div className="flex items-center justify-between gap-2 xs:text-[10px]">
        <div className="flex items-center justify-between">
          <div className=" p-3 flex items-center gap-2 text-xs">
            <p className="text-[#4A4848] text-[16px] leading-[24px] font-medium">
              Maria Grey - Team lead
            </p>
            <p className="rounded p-1 text-primary bg-white"></p>
          </div>

          <div className="flex p-3 md:ml-8 items-center gap-6 w-fit rounded bg-[#FFAD10]">
            <p className="text-[12px] leading-[18px] font-medium">
              Total Enumerators
            </p>
            <p className="text-[#4A4848] p-1 bg-gray-200 rounded text-[12px] leading-[18px] font-medium">
              500
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-6 w-fit rounded bg-[#82b22e] py-2">
            <p className="text-[#4A4848] p-1 bg-gray-200 rounded text-[12px] leading-[18px] font-medium">
              <MdKeyboardArrowLeft />
            </p>
            <button className="rounded bg-[#82B22E]  text-white flex items-center sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 ">
              Back
            </button>
          </div>

          <button className="rounded border bg-white border-[#82B22E]  text-[#82B22E] flex items-center py-2 px-7 sm:ml-auto cursor-pointer sm:flex-initial xs:flex-1 xs:justify-between">
            About
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadEnumerator;
