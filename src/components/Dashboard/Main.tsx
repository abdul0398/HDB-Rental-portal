import Towns from "./towns/Main";
// import Streets from "./streets/Main";
import Blocks from "./blocks/Main";
import FlatType from "./flattype/Main";
import Months from "./months/Main";
import Transactions from "./transaction-table/Main";
import TransactionData from "./transaction-table/trnsaction-data";
import Graph from "./graph/Main";

export default function Dashboard() {
    return (
        <section className="mb-52 w-[1300px] mt-5 mx-auto bg-gray-100 shadow-md p-3">
            <Towns />
            <section className="flex mt-5">
                <div className="w-1/5">
                    {/* <Streets /> */}
                </div>
                <Blocks />
                <FlatType />
                <Months />
                <TransactionData />
            </section>
            <section className="flex h-[600px] w-full mt-5">
                <div className="w-1/2 h-full">
                    <h2 className="text-xl text-center">List of HDB Rental Transactions</h2>
                    <Transactions/>
                </div>
                <div className="w-1/2 ms-2 h-full">
                    <h2 className="text-xl text-center">Rental Trend By Flat Type</h2>
                    <div className="bg-white">
                        <div className="w-full p-5 h-full">
                        <Graph/>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}