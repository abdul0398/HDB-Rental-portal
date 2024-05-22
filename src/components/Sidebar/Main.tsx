"use client";
import Image from "next/image";
import React from "react";
import { FaFilter } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";

export default function Sidebar({
  selectedView,
  setSelectedView,
  isOpen,
  setIsOpen,
  isMobile,
}: {
  selectedView: string | null;
  setSelectedView: Function;
  isOpen: boolean;
  setIsOpen: Function;
  isMobile: boolean;
}) {
  return (
    <div>
      {isOpen && (
        <div className="fixed h-[98%] lg:h-[100%] md:h-[100%] w-1/2 md:w-fit lg:w-fit md:z-0 z-50 lg:z-0 md:block md:relative lg:relative  lg:block">
          <aside
            id="default-sidebar"
            className="min-w-[300px] h-full"
            aria-label="Sidebar"
          >
            <div className="h-full rounded-l-3xl overflow-y-auto bg-[#0e4884] text-white">
              <div className="">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={220}
                  height={220}
                  className="mx-auto"
                />
              </div>
              <div className="w-3/4 mx-auto bg-[#022446] py-2 rounded-md flex gap-2 flex-col">
                <div
                  onClick={() => {
                    setSelectedView("filters");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "filters" ? "bg-[#0e4884]" : "bg-white"
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("filters");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center  text-black cursor-pointer" ${
                      selectedView === "filters" ? "text-white" : ""
                    }`}
                  >
                    <FaFilter size={20} className="ms-2" />
                    <p className="ms-4">Filters</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("graph");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "graph" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("graph");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "graph" ? "text-white" : ""
                    }`}
                  >
                    <BsGraphUp size={20} className="ms-2" />
                    <p className="ms-4">Graphs</p>
                  </h1>
                </div>
                <div
                  onClick={() => {
                    setSelectedView("table");
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`flex items-center cursor-pointer h-10 rounded-md w-[90%] mx-auto ${
                    selectedView === "table" ? "bg-[#0e4884]" : "bg-white "
                  }`}
                >
                  <h1
                    onClick={() => {
                      setSelectedView("table");
                      if (isMobile) setIsOpen(false);
                    }}
                    className={`"text-md flex items-center text-black cursor-pointer" ${
                      selectedView === "table" ? "text-white" : ""
                    }`}
                  >
                    <GrTransaction size={20} className="ms-2" />
                    <p className="ms-4">Transactions</p>
                  </h1>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
