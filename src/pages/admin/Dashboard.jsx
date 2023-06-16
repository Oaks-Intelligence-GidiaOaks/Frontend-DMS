import React, { useEffect, useMemo, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropdownCircle } from "react-icons/io";

import MetricsCard from "../../components/MetricsCard";
import { SubmissionRateAdmin } from "../../components/charts";
import CategoryRate from "../../components/charts/CategoryRate";
import OaksSlider from "../../components/Slider";
import axios from "axios";
import { useAuth } from "../../context";
import { FormInputDropDown } from "../../components/form";
import { Loading, NoData } from "../../components/reusable";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [yearDropdown, setYearDropdown] = useState("");
  const [priceFluctuation, setPriceFluctuation] = useState(null);
  const [lga, setLga] = useState(user.LGA[0]);
  const [totalLgas, setTotalLgas] = useState(null);
  const [yearlyEnum, setYearlyEnum] = useState(null);
  const [enumeratorsCount, setEnumeratorsCount] = useState(null);
  const [teamLeadsCount, setTeamLeadsCount] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(null);
  const [coveredLgas, setCoveredLgas] = useState(null);

  let selectLGA = coveredLgas
    ? coveredLgas.map((item) => ({ value: item, label: item }))
    : [];

  const getCoveredLgas = () => {
    axios
      .get(`lga_routes`)
      .then((res) => setCoveredLgas(res.data.data.map((it) => it.lga)))
      .catch((err) => console.error(err));
  };

  useMemo(getCoveredLgas, []);

  useEffect(() => {
    setPriceFluctuation(null);

    try {
      axios
        .get(`admin_dashboard/price_fluctuation?lgaFilter=${lga}`)
        .then((res) => {
          setPriceFluctuation(res.data);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, [lga]);

  useEffect(() => {
    axios.get("admin_dashboard/lga_count").then((res) => {
      setTotalLgas(res.data);
    });

    axios
      .get("admin_dashboard/team_leads_count")
      .then((res) => {
        // console.log(res.data);
        setTeamLeadsCount(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("admin_dashboard/enumerators_count")
      .then((res) => {
        // console.log(res.data);
        setEnumeratorsCount(res.data);
      })
      .catch((err) => console.err);
  }, []);

  useEffect(() => {
    try {
      setSubmissionCount(null);
      axios
        .get(`admin_dashboard/submission_count?yearFilter=${yearDropdown}`)
        .then((res) => {
          setSubmissionCount(res.data.submissionsArray);
        })
        .catch((err) => console.err);
    } catch (err) {
      console.error(err);
    }
  }, [yearDropdown]);

  const handleDropdownSelect = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelectOption = (year) => {
    setYearDropdown(year);
    setShowDropdown(false);
  };

  return (
    <div className="">
      <div className="mx-auto  mt-8 pb-4 lg:w-5/6">
        <div className="flex items-center justify-between gap-3 overflow-x-scroll lg:overflow-x-hidden">
          {teamLeadsCount ? (
            <MetricsCard
              key={"1"}
              lead="Team leads"
              data={teamLeadsCount}
              guide="Newly added"
              guideCount="2"
              legendOne="Total enumerators"
              legendTwo="Newly added"
            />
          ) : (
            <div className="h-32 grid place-items-center w-1/3 p-2 drop-shadow-sm bg-white">
              <Loading />
            </div>
          )}

          {enumeratorsCount ? (
            <MetricsCard
              key={"2"}
              lead="Enumerators"
              guide="Newly added"
              legendOne="Enumerators"
              data={enumeratorsCount ?? enumeratorsCount}
              legendTwo="Newly added"
            />
          ) : (
            <div className="h-32 grid place-items-center w-1/3 p-2 drop-shadow-sm bg-white">
              <Loading />
            </div>
          )}

          {totalLgas ? (
            <MetricsCard
              key={"3"}
              lead="Total LGA"
              leadCount="16"
              data={totalLgas ?? totalLgas}
              guide="LGA Assigned"
              guideCount="4"
              legendOne="Total LGA"
              legendTwo="LGA Assigned"
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
              <p className="flex-1 text-[#00BCD4]">Submission Rate </p>
              <p className="flex-1 text-xs">Submitted vs No response </p>
            </div>

            <div className="flex flex-col px-5">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-yellow-500 mr-1" />{" "}
                <span>Submitted</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-red-500 mr-1" />{" "}
                <span>No response</span>
              </div>
            </div>

            <div className="flex items-start space-x-2 flex-col relative">
              <div className="flex items-center space-x-4">
                <span>Year</span>
                <button
                  onClick={handleDropdownSelect}
                  className="flex items-center gap-3 rounded p-2 bg-light-gray"
                >
                  {yearDropdown ?? "2023"} <IoMdArrowDropdownCircle />
                </button>
              </div>

              {showDropdown && (
                <div>
                  <ul className="absolute w-20 border rounded drop-shadow-sm flex flex-col gap-2 bg-white right-0">
                    <li
                      onClick={() => handleSelectOption(2023)}
                      className="cursor-pointer border-b p-2"
                    >{`2023`}</li>
                    <li
                      onClick={() => handleSelectOption(2022)}
                      className="cursor-pointer border-b p-2"
                    >{`2022`}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* charts */}
          {submissionCount ? (
            <SubmissionRateAdmin data={submissionCount ?? submissionCount} />
          ) : (
            <div className="h-64">
              <Loading />
            </div>
          )}
        </div>
      </div>

      {/* fluctuation rates */}
      <div className=" rounded-md p-3 mt-4 lg:ml-[6rem] min-h-[18rem] max-h-auto">
        <div className="flex flex-row justify-between items-center">
          <p>Price Fluctuation Rate</p>

          <div className="w-[200px]">
            <FormInputDropDown
              index="z-20"
              data={selectLGA}
              onChange={(selectedValue) => setLga(selectedValue)}
            />
          </div>
        </div>

        {!priceFluctuation ? (
          <Loading />
        ) : priceFluctuation?.length > 0 ? (
          <OaksSlider slideDefault={4} break1={2} break2={2} break3={1}>
            {priceFluctuation?.map((item, i) => (
              <CategoryRate key={i} Product={item} />
            ))}
          </OaksSlider>
        ) : (
          <NoData text="No Data Available for this LGA" />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
