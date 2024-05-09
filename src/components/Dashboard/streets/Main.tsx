import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from "@/context/context";
import { filterHandlerReturn } from '@/types/data';
import { filterHandler } from '@/app/actions/filterHandler';
import WindowedSelect from "react-windowed-select";
import Select from 'react-select';

export default function Streets() {
    const {
        streets,
        setBlocks,
        setFlatTypes,
        setTowns,
        setMonths,
        selectedTown,
        selectedMonth,
        selectedBlock,
        selectedFlatType,
        selectedStreetName,
        setSelectedStreetName,
        setTransactions,
    } = useContext(MyContext);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, [])




    useEffect(() => {
        if (!isReady) return;
        async function fetchData() {
            const values: filterHandlerReturn = await filterHandler({ selectedMonth, selectedTown, selectedStreetName, selectedBlock, selectedFlatType });
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setMonths(values.filterMonths);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
    }, [selectedStreetName])


    const handleSelect = (e: any) => {
        setSelectedStreetName(e.value as string);
    }


    const options = streets.map((street) => {
        return {
            value: street,
            label: street,
        }
    })
   
    const styles = {
        container: css => ({ ...css, width: '170px' }),
    };

    return (
        <section className="min-w-45 ms-3">
            {/* <h2 className="text-xl mx-auto text-center">Select Streets</h2> */}
            <WindowedSelect
                placeholder="Select Street"
                options={options}
                windowThreshold={50}
                value={selectedStreetName ? { value: selectedStreetName, label: selectedStreetName } : null}
                onChange={(e: any) => handleSelect(e)}
                styles={styles}
            />

            {/* <Select
                placeholder="Select Street"
                options={options}
                value={selectedStreetName ? { value: selectedStreetName, label: selectedStreetName } : null}
                onChange={(e: any) => handleSelect(e)}
                styles={

                }
                /> */}
        </section>
    );
}
