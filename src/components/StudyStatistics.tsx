'use client'
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CategoryScale } from "chart.js";

Chart.register(...registerables);
Chart.register(CategoryScale);

const StudyStatistics = () => {
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Engagement",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Articles", "Videos", "Quizzes", "Discussions"],
    datasets: [
      {
        label: "Interactions",
        data: [25, 30, 15, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="study-statistics p-4 mt-16 ">
      <h2 className="text-3xl font-bold mb-10 font-alegreya ">
        Study Statistics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b border-gray-200">
            User Engagement Over Time
          </h3>
          <div className="p-4">
            <Line
              data={lineChartData}
              options={{ scales: { x: { type: "category" } } }}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold p-4 border-b border-gray-200">
            Past Interactions
          </h3>
          <div className="p-4">
            <Bar data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStatistics;
