import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, ChartOptions } from "chart.js";
import { registerables } from "chart.js";
import { MyContext } from "@/context/context";
import { convertDateFormat } from "../../../../../../libs/tools";

// Register the CategoryScale plugin
Chart.register(...registerables);

// Defining the LineChart component
const TransactionGraph = () => {
  const [isLoading, setLoading] = useState(true);
  const { transactions } = useContext(MyContext);
  const [dynamicDataset, setData] = useState<any[]>([]);
  const [dynamicLabels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const aggregatedData = {};

    // Aggregate transactions by rent_approval_date and flat_type
    transactions.forEach((transaction) => {
      const date = transaction.rent_approval_date;

      if (!aggregatedData[date]) {
        aggregatedData[date] = 0;
      }

      aggregatedData[date] += 1;
    });
    const labels: string[] = Object.keys(aggregatedData);

    labels.sort();
    const labelsDate = labels.map((date) => convertDateFormat(date));
    const datasets: any[] = [];

    // Create a dataset for each flat type
    datasets.push({
      label: "Transactions",
      data: labels.map((date) => aggregatedData[date]),
      fill: false,
      borderColor: "white",
      color: "white",
      tension: 0.1,
    });
    datasets.sort((a, b) => a.label.localeCompare(b.label));
    setData(datasets);
    setLabels(labelsDate);
    setLoading(false);
  }, [transactions]);

  const data = {
    labels: dynamicLabels,
    datasets: dynamicDataset,
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,

    scales: {
      y: {
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
    plugins: {
      legend: {
        labels: {
          color: "white", // Change the color of the legend labels
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Line height={600} width={1300} data={data} options={options} />
    </div>
  );
};

export default TransactionGraph;
