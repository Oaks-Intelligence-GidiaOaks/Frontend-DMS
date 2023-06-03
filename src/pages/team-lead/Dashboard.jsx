import React, { useEffect, useState } from "react";
import MetricsCard from "../../components/MetricsCard";
import SubmissionRate from "../../components/charts/SubmissionRate";
import CategoryRate from "../../components/charts/CategoryRate";
import OaksSlider from "../../components/Slider";
import axios from "axios";
import { useAuth } from "../../context";
import { FormInputDropDown } from "../../components/form";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [priceFluctuation, setPriceFluctuation] = useState(null);
  const [lga, setLga] = useState(user.LGA[0]);
  const [yearlyEnum, setYearlyEnum] = useState(null);
  const [enumeratorsCount, setEnumeratorsCount] = useState(null);
  const [submissionRate, setSubmissionRate] = useState(null);
  const [lgaCount, setLgaCount] = useState(null);

  let selectLGA = user.LGA.map((item) => ({ value: item, label: item }));

  if (priceFluctuation) {
    console.log(priceFluctuation);
  }

  useEffect(() => {
    try {
      setPriceFluctuation(null);
      console.log("lga changed...");
      axios
        .get(`team_lead_dashboard/price_fluctuation?lgaFilter=${lga}`)
        .then((res) => {
          // setLga(null);
          setPriceFluctuation(res.data);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, [lga]);

  useEffect(() => {
    axios
      .get(`team_lead_dashboard/yearly_enumerators`)
      .then((res) => setYearlyEnum(res.data))
      .catch((err) => console.log(err));

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
              <p>loading...</p>
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
              <p>loading...</p>
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
              <p>loading...</p>
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

            <div className="flex items-start border space-x-2">
              <span>Year</span>

              <span>2023</span>
            </div>
          </div>

          {/* charts */}
          <SubmissionRate data={yearlyEnum ?? yearlyEnum} />
        </div>
      </div>

      {/* fluctuation rates */}
      <div className=" rounded-md p-3 mt-6 lg:ml-[6rem] border h-72">
        <div className="flex flex-row justify-between items-center">
          <p>Average price fluctuation rate</p>

          <FormInputDropDown
            index="z-20"
            data={selectLGA}
            onChange={(selectedValue) => setLga(selectedValue)}
          />
        </div>

        <OaksSlider slideDefault={4} break1={2} break2={2} break3={1}>
          {priceFluctuation ? (
            priceFluctuation.length < 1 ? (
              <div className="grid place-items-center h-36 border w-full">
                <p>no data available for this LGA</p>
              </div>
            ) : (
              priceFluctuation.map((item, i) => (
                <CategoryRate key={i} Product={item} />
              ))
            )
          ) : (
            <p className="text-center my-auto font-bold">loading</p>
          )}
        </OaksSlider>
      </div>
    </div>
  );
};

export default Dashboard;
