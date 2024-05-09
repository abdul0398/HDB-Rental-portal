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
                <div className=" relative lg:w-1/2 md:w-1/2 w-full flex py-2 px-5">
                    <div className="bg-white shadow-lg rounded-lg transition h-36 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 w-1/3 border border-b-0 border-l-0">
                        <p className="text-center lg:text-xl md:text-xl overflow-hidden">Total Transacactions</p>
                        <div className=" mt-5 flex items-center justify-center">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">{transactions.length}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg transition h-36 ease-in-out delay-150  hover:-translate-y-1 border hover:scale-110 duration-300 w-1/3">
                        <p className="text-center lg:text-xl md:text-xl">Highest Rentals</p>
                        <div className="mt-5 flex items-center justify-center">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">${maxPrice}</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg transition h-36 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 w-1/3 border border-b-0 border-r-0 flex flex-col">
                        <p className="text-center lg:text-xl md:text-xl">Lowest Rentals</p>
                        <div className="mt-5 flex items-center justify-center bottom-0">
                            <p className="text-center lg:text-3xl md:text-3xl text-xl font-extrabold text-[#303dd7]">${minPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}