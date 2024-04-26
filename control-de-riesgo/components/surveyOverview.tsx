import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const SurveyOverview = ({
  completed,
  total,
  lastRespondents,
}: {
  completed: number;
  total: number;
  lastRespondents: string[];
}) => {
  const data = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        label: "# of Votes",
        data: [completed, total - completed],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
    <div className="my-4 w-full md:flex md:justify-between text-white bg-background-3 shadow-lg rounded-lg p-5">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <h3 className="text-lg font-semibold mb-3">Last 5 Respondents</h3>
        <ul className="list-disc pl-5">
          {lastRespondents.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/2 flex-col justify-center items-center">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Survey Completion Rate
        </h3>
        <div style={{ width: "95%", height: "80%" }}>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default SurveyOverview;
