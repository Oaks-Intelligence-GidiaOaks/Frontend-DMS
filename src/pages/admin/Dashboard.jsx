import React, { useEffect, useMemo, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropdownCircle } from "react-icons/io";

import MetricsCard from "../../components/MetricsCard";
import { SubmissionRateAdmin } from "../../components/charts";
import CategoryRate from "../../components/charts/CategoryRate";
import OaksSlider from "../../components/Slider";
import axios from "axios";
import { Loading, YearDropDown } from "../../components/reusable";
import getCurrentYear from "../../lib/helpers";
import { FluctuationRates } from "../../components/primitives";

const Dashboard = () => {
  const [yearDropdown, setYearDropdown] = useState("");

  const [totalLgas, setTotalLgas] = useState(null);
  const [enumeratorsCount, setEnumeratorsCount] = useState(null);
  const [teamLeadsCount, setTeamLeadsCount] = useState(null);
  const [submissionRate, setSubmissionRate] = useState(null);

  useEffect(() => {
    axios.get("admin_dashboard/lga_count").then((res) => {
      setTotalLgas(res.data);
    });

    axios
      .get("admin_dashboard/team_leads_count")
      .then((res) => {
        setTeamLeadsCount(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(`team_lead_dashboard/submission_rate`)
      .then((res) => setSubmissionRate(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`admin_dashboard/enumerators_count?yearFilter=${yearDropdown}`)
      .then((res) => {
        setEnumeratorsCount(res.data);
      })
      .catch((err) => console.err);
  }, [yearDropdown]);

  const handleSelectOption = (year) => {
    setYearDropdown(year);
  };

  return (
    <div className="">
      <div className="mx-auto  mt-8 pb-4 lg:w-5/6">
        <div className="flex items-center justify-between gap-3 overflow-x-scroll metrics-scrollbar">
          {teamLeadsCount ? (
            <MetricsCard
              key={"1"}
              lead="Team leads"
              data={teamLeadsCount}
              guide="Newly added"
              guideCount="2"
              legendOne="Total team leads"
              legendTwo="Newly added"
            />
          ) : (
            <div className="h-32 grid place-items-center w-1/3 p-2 drop-shadow-sm bg-white">
              <Loading />
            </div>
          )}

          {submissionRate ? (
            <MetricsCard
              key={"2"}
              lead="Submissions"
              guide="No response"
              legendOne="Submission"
              data={submissionRate ?? submissionRate}
              legendTwo="No response"
            />
          ) : (
            <div className="h-32 grid place-items-center w-1/3 p-2 drop-shadow-sm bg-white">
              <Loading />
            </div>
          )}

          {totalLgas ? (
            <MetricsCard
              key={"3"}
              lead="Total LGAs"
              leadCount="16"
              data={totalLgas ?? totalLgas}
              guide="Unassigned LGAs"
              guideCount="4"
              legendOne="Total LGAs"
              legendTwo="Unasigned LGAs"
            />
          ) : (
            <div className="h-32 grid place-items-center w-1/3 p-2 drop-shadow-sm bg-white">
              <Loading />
            </div>
          )}
        </div>

        {/* timely charts */}
        <div className="bg-white drop-shadow-sm p-3 mt-6 text-sm rounded-sm w-full lg:px-16">
          <div className="flex items-start">
            <div className="flex-1">
              <p className="flex-1 text-[#00BCD4]">Enumerators </p>
              <p className="flex-1 text-xs">Added vs Removed </p>
            </div>

            <div className="flex flex-col px-5">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-yellow-500 mr-1" />{" "}
                <span>Added</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-red-500 mr-1" /> <span>Removed</span>
              </div>
            </div>

            <YearDropDown
              startYear={2019}
              endYear={getCurrentYear()}
              selectedYear={yearDropdown}
              onChange={(selectedValue) => handleSelectOption(selectedValue)}
            />
          </div>

          {/* charts */}
          <SubmissionRateAdmin data={enumeratorsCount ?? enumeratorsCount} />
        </div>
      </div>

      {/* fluctuation rates */}
      <FluctuationRates admin />
    </div>
  );
};

export default Dashboard;
