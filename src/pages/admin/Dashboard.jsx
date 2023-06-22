import React, { useEffect, useMemo, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropdownCircle } from "react-icons/io";

import MetricsCard from "../../components/MetricsCard";
import { SubmissionRateAdmin } from "../../components/charts";
import CategoryRate from "../../components/charts/CategoryRate";
import OaksSlider from "../../components/Slider";
import axios from "axios";
import { useAuth } from "../../context";
import { FormInputDropDown } from "../../components/form";
import { Loading, NoData, YearDropDown } from "../../components/reusable";
import ChangePassword from "../../components/enumeratorFormTabs/ChangePassword";
import getCurrentYear from "../../lib/helpers";

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
    ? coveredLgas.map((item) => ({
        value: item,
        label: item,
      }))
    : [];

  const getCoveredLgas = () => {
    axios
      .get(`lga_routes`)
      .then((res) =>
        setCoveredLgas(
          res.data.data.map(
            (it) => it.lga.charAt(0).toUpperCase() + it.lga.slice(1)
          )
        )
      )
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
        setTeamLeadsCount(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("admin_dashboard/enumerators_count")
      .then((res) => {
        setEnumeratorsCount(res.data);
      })
      .catch((err) => console.err);
  }, []);

  useEffect(() => {
    try {
      setSubmissionCount(null);
      axios
        .get(
          `team_lead_dashboard/yearly_enumerators?yearFilter=${yearDropdown}`
        )
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
              legendOne="Total team leads"
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
              lead="Submissions"
              guide="No response"
              legendOne="Submission"
              data={enumeratorsCount ?? enumeratorsCount}
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
          {/* {submissionCount ? ( */}
          <SubmissionRateAdmin data={submissionCount ?? submissionCount} />
          {/* ) : (
            <div className="h-64">
              <Loading />
            </div>
          )} */}

          {/* enumerators added vs removed */}
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
