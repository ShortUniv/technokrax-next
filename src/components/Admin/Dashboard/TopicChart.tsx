import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const TopTopicsChart = () => {
  const chartContainer = useRef<any>(null);

  useEffect(() => {
    // Example data for top performing topics
    const topTopicsData = {
      labels: [
        "AI",
        "Machine Learning",
        "Data Science",
        "Web Development",
        "Cloud Computing",
        "Cybersecurity",
        "Blockchain",
        "Internet of Things",
        "Mobile Development",
        "Augmented Reality",
      ],
      datasets: [
        {
          label: "Top Performing Topics",
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 205, 86, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
          data: [95, 90, 85, 80, 75, 70, 65, 60, 55, 50], // Example performance scores
        },
      ],
    };

    const ctx = chartContainer?.current?.getContext("2d");
    const topTopicsChart = new Chart(ctx, {
      type: "bar",
      data: topTopicsData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Performance",
            },
          },
          x: {
            title: {
              display: true,
              text: "Topics",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 15,
              usePointStyle: true,
              padding: 20,
            },
          },
        },
      },
    });

    return () => {
      topTopicsChart.destroy();
    };
  }, []);

  return (
    <div className="chart-container min-w-[48vw] h-[400px] ">
      <div>
        <h3 className="items-center flex justify-center p-1">
          Top Performing Topics
        </h3>
      </div>
      <canvas ref={chartContainer}></canvas>
      <style jsx>{`
        .chart-container {
          margin: 0px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default TopTopicsChart;
