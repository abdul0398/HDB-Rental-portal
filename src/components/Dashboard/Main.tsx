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
import { MouseEvent, useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import { MyContext } from "@/context/context";

const Sidebar = dynamic(
    () => import('@/components/Sidebar/Main'),
    { ssr: false }
);



export default function Dashboard() {
    const [selected, setSelected] = useState<string | null>('filters');
    const [isOpen, setIsOpen] = useState(true);
    const {
        setSelectedTown,
        setSelectedBlock,
        setSelectedFlatType,
        setSelectedMonth,
        setSelectedStreetName,
    } = useContext(MyContext);

    const mq = useRef(window.matchMedia("(max-width: 498px)"));

    const scrollHandler = (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const targetId = event.currentTarget.getAttribute('data-target');
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (mq.current.matches) setIsOpen(false);


        setSelected(targetId)
    }

    const handleReset = () => {
        setSelectedTown("");
        setSelectedBlock("");
        setSelectedFlatType("");
        setSelectedMonth('');
        setSelectedStreetName("");
    };


    return (
        <div>
            <Sidebar scrollHandler={scrollHandler} selected={selected} isOpen={isOpen} setIsOpen={setIsOpen} />

            <main id="filters" className="sm:w-5/6 w-full mt-5 ms-auto p-3 overflow-auto lg:ps-10">
                <div className="relative">
                    <Button
                        variant="default"
                        className="me-2 absolute right-1 top-0"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
                <div className="w-full flex flex-col lg:flex-row md:flex-row">
                    <Towns />
                </div>

                <section className="w-full mt-5">
                    <div id="graphs" className="w-full h-full lg:px-9 md:px-9 px-2 py-3 rounded-lg shadow-lg border mt-10">
                        <div className="flex gap-1 flex-wrap mx-auto justify-center w-fit">
                            <h2 className="text-xl text-center">Rental Trend By Flat Type</h2>
                            <Streets />
                            <Blocks />
                            <FlatType />
                            <Months />
                        </div>
                        <div className="bg-white">
                            <div className="w-full p-5 h-full">
                                <Graph />
                            </div>
                            <hr />
                            <div className="mb-10">
                                <TransactionData />
                            </div>
                        </div>
                    </div>
                    <div id="transactions" className="w-full overflow-x-auto min-w-[800px] h-full border px-9 py-3 rounded-lg shadow-lg mt-10">
                        <div className="flex gap-1 flex-wrap mx-auto justify-center w-fit">
                            <h2 className="text-xl text-center">List of HDB Rental Transactions</h2>
                            <Streets />
                            <Blocks />
                            <FlatType />
                            <Months />
                        </div>
                        <Transactions />
                    </div>

                </section>
                <section className="p-4 w-full min-h-56 mt-10 shadow-lg border rounded-2xl">
                    <h2 className="text-center font-bold text-xl mb-2">Banner</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </section>
            </main>
        </div>

    )
}