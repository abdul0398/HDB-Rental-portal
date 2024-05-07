import 'react-datepicker/dist/react-datepicker.css';
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/app/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import DatePicker from 'react-datepicker';
import "@/components/Dashboard/months/style.css";

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

    const onCheckboxChange = (e: string) => {
        const dateString = e;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1
        const formattedDate = `${year}-${month}`;
        if(selectedMonth === formattedDate) {
            setSelectedMonth("");
            return;
        }


        setSelectedMonth(formattedDate);
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/2 mt-5">
            <h2 className="text-center text-xl w-full mb-10">Select Your Month</h2>
            <DatePicker
                selected={selectedMonth ? new Date(selectedMonth) : ""}
                onChange={(event :any) => onCheckboxChange(event)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                includeDates={[...months.map(month => new Date(month))]}
                inline
            />
        </div>
    );
}
