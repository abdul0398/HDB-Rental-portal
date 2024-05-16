"use client";
import Towns from "./towns/Main";
import Streets from "./streets/Main";
import Blocks from "./blocks/Main";
import FlatType from "./flattype/Main";
import Months from "./months/Main";
import Transactions from "./transaction-table/Main";
import Graph from "./graph/Main";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MyContext } from "@/context/context";
import FilterBox from "../ui/filterBox";
import { FaStreetView } from "react-icons/fa";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineBedroomParent,
  MdCalendarMonth,
} from "react-icons/md";
import { SiCodeblocks } from "react-icons/si";
import TranstionBox from "../ui/transaction.box";

const Sidebar = dynamic(() => import("@/components/Sidebar/Main"), {
  ssr: false,
});

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState<string>("graph");
  const {
    setSelectedTown,
    setSelectedBlock,
    setSelectedFlatType,
    setSelectedMonth,
    selectedBlock,
    selectedFlatType,
    selectedMonth,
    selectedStreetName,
    setSelectedStreetName,
    transactions,
  } = useContext(MyContext);

  const handleReset = () => {
    setSelectedTown("");
    setSelectedBlock("");
    setSelectedFlatType("");
    setSelectedMonth("");
    setSelectedStreetName("");
  };

  useEffect(() => {
    if (selectedView == "filters") {
      console.log("scrolling");
      const filters = document.getElementById("main-container") as HTMLElement;
      filters.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedView]);

  const slideLeft = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft += 400;
  };

  const slideRight = () => {
    const slider = document.querySelector(".filter-slider") as HTMLElement;
    slider.scrollLeft -= 400;
  };

  const maxPrice = Math.max(
    ...transactions.map((transaction) => transaction.monthly_rent)
  );
  const minPrice = Math.min(
    ...transactions.map((transaction) => transaction.monthly_rent)
  );
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[90%] flex h-[90%]">
        <Sidebar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
        <main
          id="main-container"
          className="sm:w-5/6 w-full rounded-r-3xl ms-auto border h-full overflow-auto lg:p-2 shadow-md"
        >
          <div className="relative h-14">
            <Button
              variant="default"
              className="me-2 absolute right-1 top-5"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          <section>
            <div className="w-full mt-5 flex flex-col lg:flex-row md:flex-row">
              <Towns />
            </div>
          </section>
          <section>
            <div className="filter-slider h-48 mt-10 flex gap-8 overflow-x-scroll scroll-smooth mx-auto whitespace-nowrap w-[90%] p-2 no-scrollbar rounded-md">
              <FilterBox
                select={<Streets />}
                name="Street"
                selected={selectedStreetName}
                icon={<FaStreetView className="text-2xl text-white" />}
              />

              <FilterBox
                select={<Blocks />}
                name="Blocks"
                selected={selectedBlock}
                icon={<SiCodeblocks className="text-2xl text-white" />}
              />
              <FilterBox
                select={<FlatType />}
                name="Flat Type"
                selected={selectedFlatType}
                icon={
                  <MdOutlineBedroomParent className="text-2xl text-white" />
                }
              />
              <FilterBox
                select={<Months />}
                name="Months"
                selected={selectedMonth}
                icon={<MdCalendarMonth className="text-2xl text-white" />}
              />
            </div>
            <div className="text-center flex justify-center gap-2 mt-3">
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronLeft
                  onClick={() => {
                    slideRight();
                  }}
                  className=" text-2xl cursor-pointer mx-auto text-white"
                />
              </div>
              <div className="rounded-full h-8 w-8 flex justify-center items-center bg-[#0e4884]">
                <MdChevronRight
                  onClick={() => {
                    slideLeft();
                  }}
                  className="text-2xl cursor-pointer text-white"
                />
              </div>
            </div>
          </section>

          <section className="w-[90%] overflow-x-auto overflow-y-hidden mx-auto border h-[700px] pb-3 mt-10 rounded-xl">
            <div className="min-w-[700px] w-full">
              <div className="bg-[#0e4884] w-full h-14 rounded-t-xl flex items-center ps-3">
                <Button
                  onClick={() => setSelectedView("graph")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "graph" ? "bg-white text-black" : ""
                  }`}
                >
                  GRAPH ANALYTICS
                </Button>
                <Button
                  onClick={() => setSelectedView("table")}
                  variant="outline"
                  className={`font-bold mx-3 bg-[#0c3f74] text-white ${
                    selectedView == "table" ? "bg-white text-black" : ""
                  }`}
                >
                  TABLE VIEW
                </Button>
              </div>
              <div className="w-full p-5 h-full">
                {selectedView == "graph" ? <Graph /> : <Transactions />}
              </div>
            </div>
          </section>

          <section>
            <div className="w-[90%] mx-auto mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
              <TranstionBox
                name="Transactions"
                value={`${transactions.length}`}
                title="Transactions"
              />
              <TranstionBox
                name="Highest Rentals"
                value={`$${maxPrice}`}
                title="Rentals"
              />
              <TranstionBox
                name="Lowest Rentals"
                value={`$${minPrice}`}
                title="Rentals"
              />
            </div>
          </section>

          <section className="p-7 relative  bg-[url('/building-banner.jpeg')]  bg-cover bg-center before:bg-blue-400 bg-no-repeat w-[90%] mx-auto h-52 border rounded-xl mt-10">
            <div className="lg:w-2/3 md:2/3 w-full">
              <h2 className="lg:text-3xl md:text-2xl text-xl text-white z-20 opacity-100">
                Discover your dream condo rental and make it your home
              </h2>
            </div>
            <div className="text-[#0e4884] font-bold cursor-pointer h-9 w-28 flex justify-center bg-white items-center mt-5 rounded-md text-sm shadow-lg">
              Get Started
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
