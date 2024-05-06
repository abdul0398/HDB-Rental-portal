'use client'
import React, { useState, useMemo, useCallback } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { MyContext } from "@/context/context";
import dynamic from 'next/dynamic';
import { town_flatTypeRelation } from "@/data/towns/town_blockRelation";
import { street_flatTypeRelation } from "@/data/streets/street_blockRelation";
import { block_flat_typeRelation } from "@/data/blocks/block_dateRelation";
import { flat_type_townRelation } from "@/data/flatType/flat_type_blockRelation";
import { date_townRelation } from "@/data/date/date_blockRelation";
const Dashboard = dynamic(
  () => import('@/components/Dashboard/Main'),
  { ssr: false }
);


export default function Home() {
 const [towns, setTowns] = useState<string[]>(Object.keys(town_flatTypeRelation));
 const [streets, setStreets] = useState<string[]>(Object.keys(street_flatTypeRelation));
 const [blocks, setBlocks] = useState<string[]>(Object.keys(block_flat_typeRelation));
 const [flatTypes, setFlatTypes] = useState<string[]>(Object.keys(flat_type_townRelation));
 const [months, setMonths] = useState<string[]>(Object.keys(date_townRelation));
 const [selectedTown, setSelectedTown] = useState<string>('');
 const [selectedStreetName, setSelectedStreetName] = useState<string>("");
 const [selectedBlock, setSelectedBlock] = useState<string>("");
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
    selectedStreetName, setSelectedStreetName,
    selectedBlock, setSelectedBlock,
    selectedFlatType, setSelectedFlatType,
    selectedMonths, setSelectedMonths
 }), [transactions, towns, streets, blocks, flatTypes, months, selectedTown, selectedStreetName, selectedBlock, selectedFlatType, selectedMonths]);

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
