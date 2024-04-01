import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { filterHandlerReturn } from '@/types/data';
import { filterHandler } from '@/actions/filterHandler';

export default function Blocks() {
    const {
        towns,
        streets,
        blocks,
        months,
        flatTypes,
        setStreets,
        setBlocks,
        setFlatTypes,
        setTowns,
        setMonths,
        selectedTown,
        setSelectedTown,
        setTransactions,
        selectedMonths,
        selectedBlocks,
        setSelectedBlocks,
        selectedFlatType,
        selectedStreetNames,
    } = useContext(MyContext);

    const handleBlockClick = (block:string) => {
        setSelectedBlocks(prev => {
            const newSelectedBlocks = [...prev]
            if (newSelectedBlocks.includes(block)) {
                newSelectedBlocks.splice(newSelectedBlocks.indexOf(block), 1);
            } else {
                newSelectedBlocks.push(block);
            }
            return newSelectedBlocks;
        });
    };

        const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        setIsReady(true);

    }, [])

    useEffect (() => {
        // if (!isReady) return;
        async function fetchData() {
            const values:filterHandlerReturn = await filterHandler({ selectedMonths, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType, months, towns, streets, blocks, flatTypes });
            setStreets(values.filterStreets);
            setFlatTypes(values.filterFlatTypes);
            setMonths(values.filterMonths);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
    }, [selectedBlocks]);

    return (
        <div className="">
            <h2 className="text-center text-xl">Select Blocks</h2>
            <div className="mx-4 grid grid-cols-8 h-96 overflow-auto min-w-[420px] bg-white">
                {blocks.map((block, i) => (
                    <div
                        key={i}
                        className={`flex justify-center items-center border hover:border-slate-700 size-12 hover:cursor-pointer ${ selectedBlocks.includes(block)  ? "bg-black text-white" : ""}`}
                        onClick={() => handleBlockClick(block)}
                    >
                        {block}
                    </div>
                ))}
            </div>
        </div>
    );
}
