'use client'
import Towns from "./towns/Main";
import Streets from "./streets/Main";
import Blocks from "./blocks/Main";
import FlatType from "./flattype/Main";
import Months from "./months/Main";
import Transactions from "./transaction-table/Main";
import TransactionData from "./transaction-table/trnsaction-data";
import Graph from "./graph/Main";
import dynamic from 'next/dynamic';
import { MouseEvent, useState } from "react";

const Sidebar = dynamic(
    () => import('@/components/Sidebar/Main'),
    { ssr: false }
);



export default function Dashboard() {
    const [selected, setSelected] = useState<string | null>("");


    const scrollHandler = (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const targetId = event.currentTarget.getAttribute('data-target');
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setSelected(targetId)
    }



    return (
        <div>
            <Sidebar scrollHandler={scrollHandler} selected={selected} />
            <main id="filters" className="mb-52 sm:w-5/6 w-full mt-5 ms-auto shadow-md p-3 overflow-auto">
                <Towns />
                <section  className="lg:flex md:flex mt-5">
                    <div className="lg:w-1/6 md:w-1/6 w-full mx-1 border rounded-lg shadow-lg px-2 py-3">
                        <Streets />
                    </div>
                    <Blocks />
                    <FlatType />
                    <Months />
                    <TransactionData />
                </section>
                <section className="w-full mt-5">
                    <div id="transactions" className="w-full overflow-x-auto min-w-[800px] h-full border px-9 py-3 rounded-lg shadow-lg mt-10">
                        <h2 className="text-xl text-center">List of HDB Rental Transactions</h2>
                        <Transactions />
                    </div>
                    <div id="graphs" className="w-full h-full px-9 py-3 rounded-lg shadow-lg border mt-10">
                        <h2 className="text-xl text-center">Rental Trend By Flat Type</h2>
                        <div className="bg-white">
                            <div className="w-full p-5 h-full">
                                <Graph />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

    )
}