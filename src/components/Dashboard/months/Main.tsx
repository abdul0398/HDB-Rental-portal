import 'react-datepicker/dist/react-datepicker.css';
import React, {useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/app/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import WindowedSelect from 'react-windowed-select';


export default function Months() {
    const {
        months,
        setStreets,
        setBlocks,
        setFlatTypes,
        setTowns,
        selectedTown,
        selectedMonth,
        selectedBlock,
        selectedFlatType,
        selectedStreetName,
        setTransactions,
        setSelectedMonth,
    } = useContext(MyContext);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, [])


    useEffect(() => {
        if (!isReady) return;
        async function fetchData() {
            const values: filterHandlerReturn = await filterHandler({ selectedMonth, selectedTown, selectedStreetName, selectedBlock, selectedFlatType });
            setStreets(values.filterStreets);
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
    }, [selectedMonth]);


    const handleSelect = (e: any) => {
        setSelectedMonth(e.value as string);
    }

    const options = months.map((month) => {
        return {
            value: month,
            label: month,
        }
    })

    return (
        <div className="w-40 ms-3">
            <WindowedSelect
                placeholder="Select Month"
                options={options}
                value={selectedMonth ? { value: selectedMonth, label: selectedMonth } : null}
                windowThreshold={50}
                onChange={(e: any) => handleSelect(e)}
            />
        </div>
    );
}
