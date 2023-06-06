import React, { useEffect, useState } from "react";
import MetricsCard from "../../components/MetricsCard";
import { SubmissionRateAdmin } from "../../components/charts";
import CategoryRate from "../../components/charts/CategoryRate";
import OaksSlider from "../../components/Slider";
import axios from "axios";
import { useAuth } from "../../context";
import { FormInputDropDown } from "../../components/form";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [priceFluctuation, setPriceFluctuation] = useState(null);
  const [lga, setLga] = useState(user.LGA[0]);
  const [totalLgas, setTotalLgas] = useState(null);
  const [yearlyEnum, setYearlyEnum] = useState(null);
  const [enumeratorsCount, setEnumeratorsCount] = useState(null);
  const [teamLeadsCount, setTeamLeadsCount] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(null);

  let selectLGA = user.LGA.map((item) => ({ value: item, label: item }));

  // console.log(user);

  useEffect(() => {
    axios
      .get(`admin_dashboard/price_fluctuation?lgaFilter=${lga}`)
      .then((res) => {
        console.log("price fluctuation:", priceFluctuation);
        setPriceFluctuation(res.data);
      })
      .catch((err) => console.error(err));
  }, [lga]);

  useEffect(() => {
    axios.get("admin_dashboard/lga_count").then((res) => {
      setTotalLgas(res.data);
      // console.log(res.data);
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
    axios
      .get("admin_dashboard/submission_count")
      .then((res) => {
        // console.log(res.data);
        setSubmissionCount(res.data.submissionsArray);
      })
      .catch((err) => console.err);
  }, []);

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
              <p>loading...</p>
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
              <p>loading...</p>
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
              <p>loading...</p>
            </div>
          )}
        </div>

        {/* timely charts */}
        <div className="bg-white drop-shadow-sm p-3 mt-6 text-sm rounded-sm w-full lg:px-16">
          <div className="flex items-start">
            <p className="flex-1">
              <p className="flex-1 text-[#00BCD4]">Submission Rate </p>
              <p className="flex-1 text-xs">Submitted vs No response </p>
            </p>

            <div className="flex flex-col px-5">
              <p>
                {". "} <span>Submitted</span>
              </p>
              <p>
                {". "} <span>No response</span>
              </p>
            </div>

            <div className="flex items-start border space-x-2">
              <span>Year</span>

              <span>2023</span>
            </div>
          </div>

          {/* charts */}
          {submissionCount ? (
            <SubmissionRateAdmin data={submissionCount ?? submissionCount} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* fluctuation rates */}
      <div className=" rounded-md p-3 mt-6 lg:ml-[6rem] border h-72">
        <div className="flex flex-row justify-between items-center">
          <p>Average price fluctuation rate</p>

          <div className="w-[200px]">
            <FormInputDropDown
              index="z-20"
              data={selectLGA}
              onChange={(selectedValue) => setLga(selectedValue)}
            />
          </div>
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
