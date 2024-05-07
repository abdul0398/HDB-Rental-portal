"use client";
import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
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
        selectedMonth ,
        selectedBlock,
        selectedFlatType,
        selectedStreetName,
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
            const values:filterHandlerReturn = await filterHandler({ selectedMonth , selectedTown, selectedStreetName, selectedBlock, selectedFlatType});
            setStreets(values.filterStreets);
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setMonths(values.filterMonths);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
    }, [selectedTown]);

   

    const slideLeft = () => {
        const slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft += 400;
    }

    const slideRight = () => {
        const slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft -= 400;
    }




    return (
        <section className="pt-3 w-full md:w-1/2 lg:w-1/2">
            <h2 className="text-center text-xl w-full">Select Your Town</h2>
            <div className="mt-5 text-center relative flex items-center">
                <MdChevronLeft onClick={()=>{slideRight()}} className=" text-2xl cursor-pointer" />
                <div id="slider" className="overflow-x-scroll scroll-smooth mx-auto overflow-y-hidden whitespace-nowrap w-3/4 h-11 no-scrollbar">
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
