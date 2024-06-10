import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const PostsChart = () => {
  const chartContainer = useRef<any>(null);
  const [percentageChange, setPercentageChange] = useState<any>(null);
  const [trendIcon, setTrendIcon] = useState<any>(null);
  const [trendColor, setTrendColor] = useState<any>(null);

  useEffect(() => {
    const userData = {
      labels: ["January", "February", "March", "April"],
      datasets: [
        {
          label: "Posts",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          data: [10, 120, 100, 80],
        },
      ],
    };

    const userValues = userData.datasets[0].data;
    const percentageChanges = userValues.map((value, index) => {
      if (index === 0) return 0;
      return ((value - userValues[index - 1]) / userValues[index - 1]) * 100;
    });

    const lastMonthChange = percentageChanges[percentageChanges.length - 1];

    if (lastMonthChange > 0) {
      setTrendIcon("↑");
      setTrendColor("green");
      setPercentageChange(lastMonthChange);
    } else if (lastMonthChange < 0) {
      setTrendIcon("↓");
      setTrendColor("red");
      setPercentageChange(lastMonthChange);
    } else {
      setTrendIcon("-");
      setTrendColor("#333");
      setPercentageChange(lastMonthChange);
    }

    const ctx = chartContainer?.current
      ?.querySelector("canvas")
      .getContext("2d");
    const userChart = new Chart(ctx, {
      type: "line",
      data: userData,
      options: {
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      userChart.destroy();
    };
  }, []);

  return (
    <div className="chart-container h-[250px] w-[22vw]" ref={chartContainer}>
      <div className="flex justify-between">
        <div>
          <h3>Total Posts</h3>
          <p>
            <strong>32,023</strong>
          </p>
        </div>

        <div className="flex justify-end ">
          <span className="trend-icon " style={{ color: trendColor }}>
            {trendIcon}
          </span>
          {percentageChange !== null && (
            <p className="flex flex-col text-sm mt-1">
              <span className="percentage-change" style={{ color: trendColor }}>
                {percentageChange.toFixed(2)}%
              </span>
              this month
            </p>
          )}
        </div>
      </div>
      <canvas></canvas>
      <style jsx>{`
        .chart-container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 20px;
          font-family: Arial, sans-serif;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0;
        }
        canvas {
          max-width: 100%;
        }
        .trend-icon {
          font-size: 20px;
          margin-left: 10px;
          margin-top: -4px;
        }
        .percentage-change {
          font-size: 16px;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default PostsChart;
