import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
interface UserData {
  name: string;
  responses: number;
}

const UserResponseChart = ({ userData }: { userData: UserData[] }) => {
  const data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  } = {
    labels: userData.map((user: UserData) => user.name),
    datasets: [
      {
        label: "Number of Responses",
        data: userData.map((user: UserData) => user.responses),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="my-4 w-full md:w-7/12 md:flex md:justify-between bg-background-3 shadow-lg rounded-lg p-5">
      <div style={{ width: "100%", height: "200px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserResponseChart;
