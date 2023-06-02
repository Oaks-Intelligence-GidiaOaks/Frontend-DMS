import React from "react";
import cutlery from "../../assets/icons/cutlery.svg";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { PriceFluctuationData } from "../../data/charts/PriceFluctuationData";
import PriceFluctuationChart from "./PriceFluctuationChart";
import { PercentageBar } from "../../components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["Wk1", "Wk2", "Wk3", "Wk4"];

export const data = {
  labels,
  datasets: [
    {
      data: [6, 10, 3, 17, 28],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const CategoryRate = ({ Product }) => {
  // console.log(Product);

  const transformedProd = {
    id: Product?.name,
    data: Product?.weeklyPrice.sort((a, b) => a - b).reverse(),
    // .map((item) => ({
    //   x: `Week ${item.x}`,
    //   y: item.y,
    // })),
  };

  // console.log(transformedProd);

  return (
    <div className="flex flex-col text-xs shrink-0 flex-grow-0 space-y-2 rounded-lg w-[276px] p-4 bg-white drop-shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={cutlery} alt="Icon" />
          <span className="font-semibold">{Product.name}</span>
        </div>
      </div>

      {/* main chart */}
      <div className="h-36 w-full ">
        <PriceFluctuationChart data={[transformedProd]} />
      </div>

      <div className="flex flex-col">
        <p className="text-xs py-2">Percentage increase</p>
        <PercentageBar value={Product?.priceChange} />
      </div>
    </div>
  );
};

export default CategoryRate;
