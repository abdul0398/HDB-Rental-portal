import React, { ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";

export default function Months() {
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
        selectedMonths,
        selectedBlocks,
        selectedFlatType,
        selectedStreetNames,
        setSelectedTown,
        setTransactions,
        setSelectedMonths,
        setSelectedStreetNames
    } = useContext(MyContext);

    useEffect(() => {
        const values: filterHandlerReturn = filterHandler({
            selectedMonths,
            selectedTown,
            selectedStreetNames,
            selectedBlocks,
            selectedFlatType,
            months,
            towns,
            streets,
            blocks,
            flatTypes
        });
        setStreets(values.filterStreets);
        setBlocks(values.filterBlocks);
        setFlatTypes(values.filterFlatTypes);
        setTowns(values.filterTowns);
        setTransactions(values.filteredTransaction);
    }, [selectedMonths]);

    const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>, month: string) => {
        const element = e.target;
        const isChecked = element.checked;
        if (isChecked) {
            setSelectedMonths(prev => [...prev, month]);
        } else {
            setSelectedMonths(prev => prev.filter(name => name !== month));
        }
    };

    return (
        <div>
            <h2 className="text-center text-xl">Select Month</h2>
            <div className="mx-4 h-96 overflow-auto bg-white">
                <div className="flex flex-col gap-2 p-5 overflow-auto">
                    {months.map((month, index) => (
                        <div key={index} className="flex items-center">
                            <input type="checkbox"
                                checked={selectedMonths.includes(month)}
                                onChange={(e) => onCheckboxChange(e, month)}
                            />
                            <p className="ms-1">{month}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
