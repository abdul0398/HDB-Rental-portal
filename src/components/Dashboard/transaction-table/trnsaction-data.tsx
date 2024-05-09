import { MyContext } from "@/context/context";
import { useContext } from "react"


export default function TransactionData() {
    const { transactions } = useContext(MyContext);

    const maxPrice = Math.max(...transactions.map((transaction) => transaction.monthly_rent));
    const minPrice = Math.min(...transactions.map((transaction) => transaction.monthly_rent));
    return (
        <section className="mx-auto px-2 py-3 w-full">
            {/* <h2 className="text-center text-xl w-full mb-10">Transaction Data</h2> */}
            <div className="w-full flex justify-center">
                <div className="border shadow-lg rounded-lg relative lg:w-1/2 md:w-1/2 w-full bg-white flex py-2 px-5">
                    <div className="w-1/3 h-56 border-t-0 border border-b-0 border-l-0">
                        <p className="text-center lg:text-xl md:text-xl ">Total Transactions</p>
                        <div className="mt-5 h-40 flex items-center justify-center">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">{transactions.length}</p>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <p className="text-center lg:text-xl md:text-xl">Highest Rentals</p>
                        <div className="mt-5 h-40 flex items-center justify-center">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">${maxPrice}</p>
                        </div>
                    </div>
                    <div className="w-1/3 h-56 border-t-0 border border-b-0 border-r-0">
                        <p className="text-center lg:text-xl md:text-xl">Lowest Rentals</p>
                        <div className="mt-5 h-40 flex items-center justify-center">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">${minPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}