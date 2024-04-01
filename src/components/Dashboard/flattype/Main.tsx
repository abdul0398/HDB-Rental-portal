import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/app/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import React, { useContext, useEffect, useMemo } from "react";

export default function FlatType() {
    const {
        towns,
        streets,
        blocks,
        months,
        flatTypes,
        setStreets,
        setBlocks,
        setFlatTypes,
        setMonths,
        setTowns,
        selectedTown,
        selectedMonths,
        selectedBlocks,
        selectedFlatType,
        setSelectedTown,
        setTransactions,
        setSelectedFlatType,
        setSelectedBlocks,
        selectedStreetNames,
    } = useContext(MyContext);

    const handleButtonClick = (flatType :string) => {
        setSelectedFlatType(selectedFlatType === flatType ? "" : flatType);
    };

    const [isReady, setIsReady] = React.useState(false);
    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, [])
    
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
    }, [selectedFlatType]);

    const getButtonClassName = (type : string) => {
        return selectedFlatType === type ? 'bg-black text-white hover:bg-black hover:text-white' : '';
    };

    return (
        <div className="w-1/5">
            <h2 className="text-center text-xl">Select Flat Type</h2>
            <div className="mx-4 h-96 overflow-auto">
                <div className="flex flex-col gap-7">
                    {flatTypes.map((type, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            onClick={() => handleButtonClick(type)}
                            className={getButtonClassName(type)}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
