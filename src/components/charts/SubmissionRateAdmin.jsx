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
  const submitted = [];
  const notSubmitted = [];

  data?.map((item) => {
    labels.push(item.month);
    submitted.push(item.submitted);
    notSubmitted.push(item.notSubmitted);
  });

  const transformedData = {
    labels,
    datasets: [
      {
        label: "Added",
        data: submitted,
        backgroundColor: "#FFAD10",
      },
      {
        label: "Removed",
        data: notSubmitted,
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
