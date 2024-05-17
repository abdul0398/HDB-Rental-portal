"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MyContext } from "@/context/context";
import dynamic from "next/dynamic";
import { town_flatTypeRelation } from "@/data/towns/town_blockRelation";
import { street_flatTypeRelation } from "@/data/streets/street_blockRelation";
import { block_flat_typeRelation } from "@/data/blocks/block_dateRelation";
import { flat_type_townRelation } from "@/data/flatType/flat_type_blockRelation";
import { date_townRelation } from "@/data/date/date_blockRelation";
import { BsBuildings } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
const Dashboard = dynamic(() => import("@/components/Dashboard/Main"), {
  ssr: false,
});

export default function Home() {
  const searchParams = useSearchParams();
  const street = searchParams.get("street");
  const validStreet =
    street && Object.keys(street_flatTypeRelation).includes(street)
      ? street
      : "";
  const block = searchParams.get("block");
  const validBlock =
    block && Object.keys(block_flat_typeRelation).includes(block) ? block : "";

  const [isLoading, setLoading] = useState<boolean>(true);
  const [towns, setTowns] = useState<string[]>(
    Object.keys(town_flatTypeRelation)
  );
  const [streets, setStreets] = useState<string[]>(
    Object.keys(street_flatTypeRelation)
  );
  const [blocks, setBlocks] = useState<string[]>(
    Object.keys(block_flat_typeRelation)
  );
  const [flatTypes, setFlatTypes] = useState<string[]>(
    Object.keys(flat_type_townRelation)
  );
  const [months, setMonths] = useState<string[]>(
    Object.keys(date_townRelation)
  );

  console.log(validStreet, validBlock);
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [selectedStreetName, setSelectedStreetName] =
    useState<string>(validStreet);
  const [selectedBlock, setSelectedBlock] = useState<string>(validBlock);
  const [selectedFlatType, setSelectedFlatType] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [transactions, setTransactions] = useState<any[]>([]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      transactions,
      setTransactions,
      towns,
      setTowns,
      streets,
      setStreets,
      blocks,
      setBlocks,
      flatTypes,
      setFlatTypes,
      months,
      setMonths,
      selectedTown,
      setSelectedTown,
      selectedStreetName,
      setSelectedStreetName,
      selectedBlock,
      setSelectedBlock,
      selectedFlatType,
      setSelectedFlatType,
      selectedMonth,
      setSelectedMonth,
    }),
    [
      transactions,
      towns,
      streets,
      blocks,
      flatTypes,
      months,
      selectedTown,
      selectedStreetName,
      selectedBlock,
      selectedFlatType,
      selectedMonth,
    ]
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  return (
    <>
      {isLoading && (
        <div className="bg-black pointer-events-none fixed z-50 w-full h-full flex justify-center items-center opacity-80">
          <div role="status">
            <BsBuildings size={50} color="white" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
      <main className="h-full w-full">
        <section className="w-full mx-auto h-full">
          <MyContext.Provider value={contextValue}>
            <Dashboard />
          </MyContext.Provider>
        </section>
        <SpeedInsights />
      </main>
    </>
  );
}
