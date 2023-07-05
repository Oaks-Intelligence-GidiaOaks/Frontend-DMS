import React, { useEffect, useState } from "react";
import MetricsCard from "../../components/MetricsCard";
import SubmissionRate from "../../components/charts/SubmissionRate";
import CategoryRate from "../../components/charts/CategoryRate";
import OaksSlider from "../../components/Slider";
import axios from "axios";
import { useAuth } from "../../context";
import { FormInputDropDown } from "../../components/form";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import {
  Loading,
  NoData,
  UpdatePassword,
  YearDropDown,
} from "../../components/reusable";
import getCurrentYear from "../../lib/helpers";
import { FluctuationRates } from "../../components/primitives";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [yearDropdown, setYearDropdown] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [priceFluctuation, setPriceFluctuation] = useState(null);
  const [lga, setLga] = useState(user.LGA[0]);
  const [yearlyEnum, setYearlyEnum] = useState(null);
  const [enumeratorsCount, setEnumeratorsCount] = useState(null);
  const [submissionRate, setSubmissionRate] = useState(null);
  const [lgaCount, setLgaCount] = useState(null);

  let selectLGA = user.LGA.map((item) => ({
    value: item,
    label: item.charAt(0).toUpperCase() + item.slice(1),
  }));

  useEffect(() => {
    try {
      setPriceFluctuation(null);
      axios
        .get(`team_lead_dashboard/price_fluctuation?lgaFilter=${lga}`)
        .then((res) => {
          setPriceFluctuation(res.data);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, [lga]);

  useEffect(() => {
    try {
      setYearlyEnum(null);
      axios
        .get(
          `team_lead_dashboard/yearly_enumerators?yearFilter=${yearDropdown}`
        )
        .then((res) => {
          setYearlyEnum(res.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  }, [yearDropdown]);

  useEffect(() => {
    axios
      .get("team_lead_dashboard/enumerators_count")
      .then((res) => setEnumeratorsCount(res.data))
      .catch((err) => console.error);

    axios
      .get("team_lead_dashboard/submission_rate")
      .then((res) => setSubmissionRate(res.data))
      .catch((err) => console.error(err));

    axios
      .get("team_lead_dashboard/lga_count")
      .then((res) => setLgaCount(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDropdownSelect = () => {
    setShowDropdown((prev) => !prev);
  };
  const handleSelectOption = (year) => {
    setYearDropdown(year);
    setShowDropdown(false);
  };

  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto  mt-8 pb-4 lg:w-5/6">
        <div className="flex items-center justify-between gap-3 overflow-x-scroll metrics-scrollbar">
          {enumeratorsCount ? (
            <MetricsCard
              key={"1"}
              lead="Enumerators"
              data={enumeratorsCount ?? enumeratorsCount}
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

          {submissionRate ? (
            <MetricsCard
              key={"2"}
              lead="Submission rate"
              guide="Not submitted"
              legendOne="Submission"
              data={submissionRate ?? submissionRate}
              legendTwo="Not submitted"
            />
          ) : (
            <div className="h-32 grid place-items-center w-1/3 p-2 drop-shadow-sm bg-white">
              <Loading />
            </div>
          )}

          {lgaCount ? (
            <MetricsCard
              key={"3"}
              lead="Total LGAs"
              leadCount="16"
              data={lgaCount ?? lgaCount}
              guide="Unassigned LGAs"
              guideCount="4"
              legendOne="Total LGAs"
              legendTwo="Unassigned LGAs"
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
            <p className="flex-1 text-[#00BCD4]">Enumerators </p>

            <div className="flex flex-col px-5">
              <p>
                {". "} <span>Added</span>
              </p>
              <p>
                {". "} <span>Removed</span>
              </p>
            </div>

            <YearDropDown
              startYear={2019}
              endYear={getCurrentYear()}
              selectedYear={yearDropdown}
              onChange={(selectedValue) => handleSelectOption(selectedValue)}
            />
          </div>

          {/* charts */}
          {yearlyEnum ? (
            <SubmissionRate data={yearlyEnum ?? yearlyEnum} />
          ) : (
            <div className="h-32">
              <Loading />
            </div>
          )}
        </div>
      </div>

      {/* fluctuation rates */}
      <FluctuationRates />
    </div>
  );
};

export default Dashboard;
