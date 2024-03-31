"use client";

import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import {
    towns as defaultTowns,
} from "@/data/constants";
import { filterHandler } from "@/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";

export default function Towns() {
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

    useEffect(() => {        
            const values:filterHandlerReturn = filterHandler({ selectedMonths, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType, months, towns, streets, blocks, flatTypes });
            setStreets(values.filterStreets);
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setMonths(values.filterMonths);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
    }, [selectedTown]);

    const handleReset = () => {
        setSelectedTown("");
        setStreets(streets);
        setBlocks(blocks);
        setFlatTypes(flatTypes);
        setTowns(defaultTowns);
    };
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
            <div className="mt-5 text-center">
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
        </section>
    );
}
