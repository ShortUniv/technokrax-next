'use client'
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SourceOfLeadsChart = () => {
  const chartContainer = useRef<any>(null);

  useEffect(() => {
    // Example data for source of leads
    if (chartContainer?.current) {

    const sourceOfLeadsData = {
      labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
      datasets: [{
        label: 'Source of Leads',
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 1,
        data: [60, 30, 5, 5], // Example percentages of leads
      }]
    };

    const ctx = chartContainer?.current?.getContext('2d');
    const sourceOfLeadsChart = new Chart(ctx, {
      type: 'pie',
      data: sourceOfLeadsData,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });

    return () => {
      sourceOfLeadsChart.destroy();
    };
  }
  }, []);

  return (
    <div className="chart-container w-[22vw] h-[350px]">
        <h3 className='flex justify-center pb-2'>Leads By Source</h3>
      <canvas ref={chartContainer}></canvas>
      <style jsx>{`
        .chart-container {
        //   max-width: 400px;
          margin: 0px ;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default SourceOfLeadsChart;
