import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      gridLines: {
        display: false,
      },
    },
    y: {
      gridLines: {
        display: false,
      },
    },
  },
};

const SubmissionRate = ({ data }) => {
  const labels = [];
  const added = [];
  const removed = [];

  data?.map((item) => {
    labels.push(item?.month);
    added.push(item?.added);
    removed.push(item?.removed);
  });

  const transformedData = {
    labels,
    datasets: [
      {
        label: "Added",
        data: added,
        backgroundColor: "#FFAD10",
      },
      {
        label: "Removed",
        data: removed,
        backgroundColor: "#FA0D0D",
      },
    ],
  };
  return (
    <div className="mt-2 h-72">
      <Bar options={options} data={transformedData} />
    </div>
  );
};

export default SubmissionRate;
