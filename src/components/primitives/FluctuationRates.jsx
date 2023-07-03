import React, { useEffect, useMemo, memo, useState } from "react";
import { FormInputDropDown } from "../form";
import { Loading, NoData } from "../reusable";
import OaksSlider from "../Slider";
import CategoryRate from "../charts/CategoryRate";
import axios from "axios";
import { useAuth } from "../../context";

const FluctuationRates = memo(({ admin }) => {
  const { user } = useAuth();
  // component states
  const [coveredLgas, setCoveredLgas] = useState(null);
  const [lga, setLga] = useState(user.LGA[0]);
  const [priceFluctuation, setPriceFluctuation] = useState(null);

  let selectLGA = admin
    ? coveredLgas
      ? coveredLgas.map((item) => ({
          value: item,
          label: item,
        }))
      : []
    : user.LGA.map((item) => ({
        value: item,
        label: item.charAt(0).toUpperCase() + item.slice(1),
      }));

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
        .get(
          `${
            admin ? "admin_dashboard" : "team_lead_dashboard"
          }/price_fluctuation?lgaFilter=${lga}`
        )
        .then((res) => {
          setPriceFluctuation(res.data);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, [lga]);

  return (
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
        <div className="w-full flex flex-wrap gap-2 h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
          {priceFluctuation?.map((item, i) => (
            <CategoryRate key={i} Product={item} />
          ))}
        </div>
      ) : (
        <NoData text="No Data Available for this LGA" />
      )}
    </div>
  );
});

export default FluctuationRates;
