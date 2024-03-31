import fetchData from "../../actions/api";
import Towns from "./towns/Main";
import Streets from "./streets/Main";
import Blocks from "./blocks/Main";
import FlatType from "./flattype/Main";
import Months from "./months/Main";
import Transactions from "./transaction-table/Main";

export default function Dashboard() {

    async function start() {
        const api = fetchData('https://data.gov.sg/api/action/datastore_search?resource_id=d_c9f57187485a850908655db0e8cfe651&limit=10000&q=Bedok');
        console.log(api);
    }

    return (
        <section className="min-h-full  w-[1500px] mt-5 mx-auto bg-gray-100 shadow-md p-3">
            <Towns />
            <section className="flex mt-5">
                <div className="w-1/5">
                    <Streets />
                </div>
                <Blocks />
                <FlatType />
                <Months />
                <section className="h-96 mx-auto">
                    <h2 className="text-xl">Transaction Details</h2>
                    <div className="bg-white h-full">
                        <div className="w-full p-5">
                            <h2 className="font-extrabold text-center">Transactions Count</h2>
                            <p className="text-center">1</p>
                        </div>
                        <div className="w-full p-5">
                            <h2 className="font-extrabold text-center">Highest Rentals</h2>
                            <p className="text-center">1</p>
                        </div>
                        <div className="w-full p-5">
                            <h2 className="font-extrabold text-center">Lowest Rentals</h2>
                            <p className="text-center">1</p>
                        </div>
                    </div>
                </section>
            </section>
            <section className="flex h-[600px] w-full mt-5">
                <div className="w-1/2 h-full">
                    <h2 className="text-xl text-center">List of HDB Rental Transactions</h2>
                    <Transactions/>
                </div>
                <div className="w-1/2 h-full ms-2">
                    <h2 className="text-xl text-center">Rental Trend By Flat Type</h2>
                    <div className="bg-white h-full">
                        <div className="w-full p-5">
                            <h2 className="font-extrabold text-center"></h2>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}