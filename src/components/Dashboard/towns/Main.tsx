"use client";

import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import {
    towns as defaultTowns,
} from "@/data/constants";
import { filterHandler } from "@/app/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import {MdChevronRight, MdChevronLeft} from "react-icons/md";

export default function Towns() {
    const {
        towns,
       
        setStreets,
        setBlocks,
        setFlatTypes,
        setTowns,
        setMonths,
        selectedTown,
        setSelectedTown,
        setTransactions,
        setSelectedBlocks,
        setSelectedFlatType,
        setSelectedMonths,
        setSelectedStreetNames,
        selectedMonths,
        selectedBlocks,
        selectedFlatType,
        selectedStreetNames,
    } = useContext(MyContext);
    const handleTownClick = (town: string) => {
        if (selectedTown === town) {
            setSelectedTown("");
        }else{
            setSelectedTown(town);
        }
    };


    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, []);

    useEffect(() => {  
        if (!isReady) return;
        async function fetchData() {
            const values:filterHandlerReturn = await filterHandler({ selectedMonths, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType});
            setStreets(values.filterStreets);
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setMonths(values.filterMonths);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
    }, [selectedTown]);

    const handleReset = () => {
        setSelectedTown("");
        setSelectedBlocks([]);
        setSelectedFlatType("");
        setSelectedMonths([]);
        setSelectedStreetNames([]);
    };

    const slideLeft = () => {
        const slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft += 400;
    }

    const slideRight = () => {
        const slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft -= 400;
    }




    return (
        <section className="pt-3">
            <div className="relative">
                <h2 className="text-center text-xl w-full">Select Your Town</h2>
                <Button
                    variant="default"
                    className="me-2 absolute right-1 top-0"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
            <div className="mt-5 text-center relative flex items-center">
                <MdChevronLeft onClick={()=>{slideRight()}} className=" text-2xl cursor-pointer" />
                <div id="slider" className="overflow-x-scroll scroll-smooth mx-auto overflow-y-hidden whitespace-nowrap w-3/4 h-11">
                {towns.map((town, index) => (
                    <Button
                    key={index}
                    variant={selectedTown === town ? "default" : "outline"}
                    className="m-1"
                    onClick={() => handleTownClick(town)}
                    >
                        {town}
                    </Button>
                ))}
                </div>
                <MdChevronRight onClick={()=>{slideLeft()}} className="text-2xl cursor-pointer" />
            </div>
        </section>
    );
}
