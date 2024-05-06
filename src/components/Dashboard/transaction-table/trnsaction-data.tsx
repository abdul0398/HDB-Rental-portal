import { MyContext } from "@/context/context";
import { useContext } from "react"
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import alltransactions from "@/data/transaction.json";

Chart.register(...registerables);





export default function TransactionData() {

    const allTransaction = alltransactions as any[];


    const { transactions } = useContext(MyContext);

    const maxPrice = Math.max(...transactions.map((transaction) => transaction.monthly_rent));
    const minPrice = Math.min(...transactions.map((transaction) => transaction.monthly_rent));
    const MaxRent = {
        datasets: [
            {
                label: 'Highest Rentals',
                data: [maxPrice, minPrice],
                backgroundColor: [
                    '#303dd7',
                    '#2c2c2c',

                ],
                borderWidth: 0,
            },
        ],
    };

    const MinRent = {
        datasets: [
            {
                label: 'Lowest Rentals',
                data: [minPrice, maxPrice],
                backgroundColor: [
                    '#303dd7',
                    '#2c2c2c',

                ],
                borderWidth: 0,
            },
        ],
    };

    const transactionData = {
        datasets: [
            {
                label: 'Transactions',
                data: [allTransaction.length, allTransaction.length - transactions.length],
                backgroundColor: [
                    '#303dd7',
                    '#2c2c2c',

                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '90%', // Adjust this value to control the thickness of the doughnut's inner border
    };
    return (
        <section className="mx-auto px-2 py-3">
            <div className="flex flex-wrap">
                <div className="border shadow-lg rounded-lg py-3 mx-auto relative bg-white lg:m-3 md:m-3 my-3">
                    <p className="text-center font-bold">
                        Total Transactions
                    </p>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <p className="text-center text-2xl">
                            {transactions.length}
                        </p>
                    </div>
                    <Doughnut data={transactionData} options={options} />
                </div>
                <div className="border shadow-lg rounded-lg py-3 mx-auto relative bg-white lg:m-3 md:m-3 my-3">
                    <p className="text-center font-bold">
                        Highest Rentals
                    </p>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <p className="text-center text-2xl">
                            {maxPrice}$
                        </p>
                    </div>
                    <Doughnut data={MaxRent} options={options} />
                </div>
                <div className="border shadow-lg rounded-lg py-3 mx-auto relative bg-white lg:m-3 md:m-3 my-3">
                    <p className="text-center font-bold">
                        Lowest Rentals
                    </p>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <p className="text-center text-2xl">
                            {minPrice}$
                        </p>
                    </div>
                    <Doughnut data={MinRent} options={options} />
                </div>
            </div>
        </section>
    )

}