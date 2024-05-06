import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/app/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import 'react-day-picker/dist/style.css';

export default function Months() {
    const {
        months,
        setStreets,
        setBlocks,
        setFlatTypes,
        setTowns,
        selectedTown,
        selectedMonths,
        selectedBlock,
        selectedFlatType,
        selectedStreetName,
        setTransactions,
        setSelectedMonths,
    } = useContext(MyContext);

    const [isReady, setIsReady] = useState(false);
    const [selectedMonthData, setSelectedMonthData] = useState({
        month: 9,
        year: 2023,
    });
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, [])


    useEffect(() => {
        if (!isReady) return;
        async function fetchData() {
            const values: filterHandlerReturn = await filterHandler({ selectedMonths, selectedTown, selectedStreetName, selectedBlock, selectedFlatType });
            setStreets(values.filterStreets);
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
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
        <div className="border rounded-lg shadow-lg px-2 py-3 mx-1">
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
