'use client'
import React, { useState, useMemo, useCallback } from "react";
import Dashboard from "../components/Dashboard/Main";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { MyContext } from "@/context/context";
import { town_flatTypeRelation } from "@/data/towns/town_blockRelation";
import { street_flatTypeRelation } from "@/data/streets/street_blockRelation";
import { block_flat_typeRelation } from "@/data/blocks/block_dateRelation";
import { flat_type_townRelation } from "@/data/flatType/flat_type_blockRelation";
import { date_townRelation } from "@/data/date/date_blockRelation";

export default function Home() {
 const [towns, setTowns] = useState<string[]>(Object.keys(town_flatTypeRelation));
 const [streets, setStreets] = useState<string[]>(Object.keys(street_flatTypeRelation));
 const [blocks, setBlocks] = useState<string[]>(Object.keys(block_flat_typeRelation));
 const [flatTypes, setFlatTypes] = useState<string[]>(Object.keys(flat_type_townRelation));
 const [months, setMonths] = useState<string[]>(Object.keys(date_townRelation));
 const [selectedTown, setSelectedTown] = useState<string>('');
 const [selectedStreetNames, setSelectedStreetNames] = useState<string[]>([]);
 const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
 const [selectedFlatType, setSelectedFlatType] = useState<string>('');
 const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
 const [transactions, setTransactions] = useState<any[]>([]);

 // Memoize context value to prevent unnecessary re-renders
 const contextValue = useMemo(() => ({
  transactions, setTransactions,
    towns, setTowns,
    streets, setStreets,
    blocks, setBlocks,
    flatTypes, setFlatTypes,
    months, setMonths,
    selectedTown, setSelectedTown,
    selectedStreetNames, setSelectedStreetNames,
    selectedBlocks, setSelectedBlocks,
    selectedFlatType, setSelectedFlatType,
    selectedMonths, setSelectedMonths
 }), [transactions, towns, streets, blocks, flatTypes, months, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType, selectedMonths]);

 return (
    <main className="h-full w-full pt-8">
      <section className="w-full mx-auto h-full">
        <MyContext.Provider value={contextValue}>
          <Dashboard />
        </MyContext.Provider>
      </section>
      <SpeedInsights />
    </main>
 );
}
