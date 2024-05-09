import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/app/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import React, { useContext, useEffect, useMemo } from "react";
import WindowedSelect from "react-windowed-select";

export default function FlatType() {
    const {

        flatTypes,
        setStreets,
        setBlocks,
        setFlatTypes,
        setMonths,
        setTowns,
        selectedTown,
        selectedMonth,
        selectedBlock,
        selectedFlatType,
        setTransactions,
        setSelectedFlatType,
        selectedStreetName,
    } = useContext(MyContext);

    const handleButtonClick = (flatType: string) => {
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
            const values: filterHandlerReturn = await filterHandler({ selectedMonth, selectedTown, selectedStreetName, selectedBlock, selectedFlatType });
            setStreets(values.filterStreets);
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setMonths(values.filterMonths);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
    }, [selectedFlatType]);

    const getButtonClassName = (type: string) => {
        return selectedFlatType === type ? 'bg-black text-white hover:bg-black hover:text-white' : '';
    };

    const handleSelect = (e: any) => {
        setSelectedFlatType(e.value as string);
    }

    const options = flatTypes.map((flatType) => {
        return {
            value: flatType,
            label: flatType,
        }
    })
    const styles = {
        container: css => ({ ...css, width: '170px' }),
    };

    return (
        <div className="w-45 ms-3">
            {/* <h2 className="text-center text-xl">Select Flat Type</h2> */}
            <WindowedSelect
                placeholder="Select Flat Type"
                options={options}
                value={selectedFlatType ? { value: selectedFlatType, label: selectedFlatType } : null}
                windowThreshold={50}
                styles={styles}
                onChange={(e: any) => handleSelect(e)}
            />
        </div>
    );
}
