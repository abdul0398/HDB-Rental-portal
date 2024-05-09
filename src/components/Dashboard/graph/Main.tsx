import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { MyContext } from "@/context/context";
import { convertDateFormat } from "../../../../libs/tools";

// Register the CategoryScale plugin
Chart.register(...registerables);

const colorArray = {
    "1-ROOM": "#FFD300",
    "2-ROOM": "#FF9300",
    "3-ROOM": "#0093d4",
    "4-ROOM": "#901c1b",
    "5-ROOM": "#9ddb4b",
    "EXECUTIVE": "#00308F",
}
// Defining the LineChart component
const Graph = () => {
    const [isLoading, setLoading] = useState(true);
    const { transactions } = useContext(MyContext);
    const [dynamicDataset, setData] = useState<any[]>([]);
    const [dynamicLabels, setLabels] = useState<string[]>([])

    useEffect(() => {
        const aggregatedData: {
            [date: string]: {
                [faltype: string]: {
                    totalRent: number,
                    count: number
                }
            }
        } = {};

        // Aggregate transactions by rent_approval_date and flat_type
        transactions.forEach(transaction => {
            const date = transaction.rent_approval_date;
            const flatType = transaction.flat_type;
            const rent = parseInt(transaction.monthly_rent);

            if (!aggregatedData[date]) {
                aggregatedData[date] = {};
            }

            if (!aggregatedData[date][flatType]) {
                aggregatedData[date][flatType] = { totalRent: 0, count: 0 };
            }

            aggregatedData[date][flatType].totalRent += rent;
            aggregatedData[date][flatType].count += 1;
        });
        const labels: string[] = Object.keys(aggregatedData);

        labels.sort();
        const labelsDate = labels.map((date) => convertDateFormat(date));
        const datasets: any[] = [];

        // Create a dataset for each flat type
        labels.forEach(date => {
            const flatTypes = Object.keys(aggregatedData[date]);
            flatTypes.forEach(flatType => {
                if (!datasets.find(dataset => dataset.label === flatType)) {
                    datasets.push({
                        label: flatType,
                        data: [],
                        borderColor: colorArray[flatType],
                        fill: false,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointHoverRadius: 10,
                    });
                }

                const totalRent = aggregatedData[date][flatType].totalRent;
                const count = aggregatedData[date][flatType].count;
                const averageRent = Math.floor(totalRent / count);

                const dataset = datasets.find(dataset => dataset.label === flatType);
                dataset.data.push(averageRent);
            });

        });
        datasets.sort((a, b) => a.label.localeCompare(b.label));
        setData(datasets);
        setLabels(labelsDate);
        setLoading(false);
    }, [transactions]);

    const data = {
        labels: dynamicLabels,
        datasets: dynamicDataset
    };

    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="h-full">
            <Line height={600} width={1300} data={data} options={options} />
        </div>
    );
};

export default Graph;
