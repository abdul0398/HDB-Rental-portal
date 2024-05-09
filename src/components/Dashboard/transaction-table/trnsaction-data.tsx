import { MyContext } from "@/context/context";
import { useContext } from "react"


export default function TransactionData() {
    const { transactions } = useContext(MyContext);

    const maxPrice = Math.max(...transactions.map((transaction) => transaction.monthly_rent));
    const minPrice = Math.min(...transactions.map((transaction) => transaction.monthly_rent));
    return (
        <section className="mx-auto px-2 py-3 w-full">
            <div className="w-full flex justify-center">
                <div className="lg:w-2/3 md:w-2/3 w-full flex md:flex-row lg:flex-row flex-col  py-2 px-5">
                    <div className="mx-2 my-1 bg-white shadow-lg py-4 rounded-lg transition h-36 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 w-full md:w-1/3 lg:w-1/3 border border-b-0 border-l-0">
                        <p className="text-center lg:text-l md:text-l overflow-hidden">Transactions</p>
                        <div className=" mt-5 flex items-center justify-center">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">{transactions.length}</p>
                        </div>
                    </div>
                    <div className="mx-2 my-1 bg-white shadow-lg py-4 rounded-lg transition h-36 ease-in-out delay-150  hover:-translate-y-1 border hover:scale-110 duration-300 w-full md:w-1/3 lg:w-1/3">
                        <p className="text-center lg:text-l md:text-l">Highest Rentals</p>
                        <div className="mt-5 flex items-center justify-center">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">${maxPrice}</p>
                        </div>
                    </div>
                    <div className="mx-2 my-1 bg-white shadow-lg py-4 rounded-lg transition h-36 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 w-full md:w-1/3 lg:w-1/3 border border-b-0 border-l-0 flex flex-col">
                        <p className="text-center lg:text-l md:text-l">Lowest Rentals</p>
                        <div className="mt-5 flex items-center justify-center bottom-0">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">${minPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}