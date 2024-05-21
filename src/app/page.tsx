"use client";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MyContext } from "@/context/context";
import dynamic from "next/dynamic";
import Image from "next/image";

import { BsBuildings } from "react-icons/bs";
import useIntialiseContext from "@/hooks/useinitialiseContext";
const Dashboard = dynamic(() => import("@/components/Dashboard/Main"), {
  ssr: false,
});

export default function Home() {
  const { contextValue, isLoading } = useIntialiseContext();

  return (
    <>
      {isLoading && (
        <div className="bg-black pointer-events-none fixed z-50 w-full h-full flex justify-center items-center opacity-80">
          <div role="status">
            <Image src="/logo.png" alt="Loading" width={100} height={100} />
            <p className="text-white text-center">Loading...</p>
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
