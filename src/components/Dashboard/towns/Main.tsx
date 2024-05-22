"use client";
import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MyContext } from "@/context/context";
import { filterHandler } from "@/app/actions/filterHandler";
import { filterHandlerReturn } from "@/types/data";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

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
    selectedMonth,
    selectedBlock,
    selectedFlatType,
    selectedStreetName,
  } = useContext(MyContext);
  const handleTownClick = (town: string) => {
    if (selectedTown === town) {
      setSelectedTown("");
    } else {
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
      const values: filterHandlerReturn = await filterHandler({
        selectedMonth,
        selectedTown,
        selectedStreetName,
        selectedBlock,
        selectedFlatType,
      });
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
  };

  const slideRight = () => {
    const slider = document.getElementById("slider") as HTMLElement;
    slider.scrollLeft -= 400;
  };

  return (
    <section className="w-full ">
      {/* <h2 className="text-center text-xl w-full">Select Your Town</h2> */}
      <div className="mt-5 text-center relative flex items-center">
        <div className="absolute left-[4%] bg-white rounded-full border w-7 h-7 flex justify-center items-center">
          <MdChevronLeft
            onClick={() => {
              slideRight();
            }}
            className=" text-2xl cursor-pointer"
          />
        </div>

        <div
          id="slider"
          className="bg-[#0e4884] overflow-x-scroll scroll-smooth mx-auto overflow-y-hidden whitespace-nowrap w-[90%] p-2 no-scrollbar rounded-md"
        >
          {towns.map((town, index) => (
            <Button
              key={index}
              variant={"outline"}
              className={`"m-1 bg-[#0c3f74] border-0 text-white font-bold" ${
                selectedTown === town
                  ? "bg-white ms-1 text-black font-bold"
                  : "ms-1 font-bold bg-[#0c3f74] text-white"
              }`}
              onClick={() => handleTownClick(town)}
            >
              {town}
            </Button>
          ))}
        </div>
        <div className="absolute right-[4%] bg-white rounded-full border w-7 h-7 flex justify-center items-center">
          <MdChevronRight
            onClick={() => {
              slideLeft();
            }}
            className="text-2xl cursor-pointer "
          />
        </div>
      </div>
    </section>
  );
}
