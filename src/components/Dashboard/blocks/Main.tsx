import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "@/context/context";
import { filterHandlerReturn } from "@/types/data";
import { filterHandler } from "@/app/actions/filterHandler";
import WindowedSelect from "react-windowed-select";
import { customStyles } from "@/styles/select";

export default function Blocks() {
  const {
    blocks,
    setStreets,
    setFlatTypes,
    setTowns,
    setMonths,
    selectedTown,
    setTransactions,
    selectedMonth,
    selectedBlock,
    setSelectedBlock,
    selectedFlatType,
    selectedStreetName,
  } = useContext(MyContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    // if (!isReady) return;
    async function fetchData() {
      const values: filterHandlerReturn = await filterHandler({
        selectedMonth,
        selectedTown,
        selectedStreetName,
        selectedBlock,
        selectedFlatType,
      });
      setStreets(values.filterStreets);
      setFlatTypes(values.filterFlatTypes);
      setMonths(values.filterMonths);
      setTowns(values.filterTowns);
      setTransactions(values.filteredTransaction);
    }
    fetchData();
  }, [selectedBlock]);

  const handleSelect = (e: any) => {
    setSelectedBlock(e.value as string);
  };

  const options = blocks.map((block) => {
    return {
      value: block,
      label: block,
    };
  });

  return (
    <div className="w-45 ms-3">
      {/* <h2 className="text-center text-xl">Select Blocks</h2> */}
      <WindowedSelect
        placeholder="Select Block"
        options={options}
        value={
          selectedBlock ? { value: selectedBlock, label: selectedBlock } : null
        }
        windowThreshold={50}
        styles={customStyles}
        menuPortalTarget={document.querySelector("body")}
        onChange={(e: any) => handleSelect(e)}
      />
    </div>
  );
}
