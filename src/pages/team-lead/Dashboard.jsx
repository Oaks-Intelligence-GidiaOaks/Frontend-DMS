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

  let selectLGA = user.LGA.map((item) => ({ value: item, label: item }));

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
        <div className="flex items-center justify-between gap-3 overflow-x-scroll lg:overflow-x-hidden">
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
              lead="Total LGA"
              leadCount="16"
              data={lgaCount ?? lgaCount}
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
            <p className="flex-1 text-[#00BCD4]">Enumerators </p>

            <div className="flex flex-col px-5">
              <p>
                {". "} <span>Added</span>
              </p>
              <p>
                {". "} <span>Removed</span>
              </p>
            </div>

            {/* <div className="flex items-start space-x-2 flex-col relative">
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
            </div> */}

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
      <div className=" rounded-md p-3 mt-2 lg:ml-[6rem] min-h-[18rem]">
        <div className="flex flex-row justify-between items-center">
          <p>Price fluctuation rate</p>

          <div className="w-[160px]">
            <FormInputDropDown
              index="z-20"
              data={selectLGA}
              onChange={(selectedValue) => setLga(selectedValue)}
            />
          </div>
        </div>

        {!priceFluctuation ? (
          <Loading />
        ) : priceFluctuation.length > 1 ? (
          <OaksSlider slideDefault={4} break1={2} break2={2} break3={1}>
            {priceFluctuation.map((item, i) => (
              <CategoryRate key={i} Product={item} />
            ))}
          </OaksSlider>
        ) : (
          <div className="h-32 ">
            <NoData text="No Data Available for this LGA" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
