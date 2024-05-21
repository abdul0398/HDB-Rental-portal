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
import { MdOutlineBedroomParent, MdCalendarMonth } from "react-icons/md";
import { SiCodeblocks } from "react-icons/si";
import TranstionBox from "../ui/transaction.box";
import { IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

const Sidebar = dynamic(() => import("@/components/Sidebar/Main"), {
  ssr: false,
});

export default function Dashboard() {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
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

  const [selectedView, setSelectedView] = useState<string>("graph");
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);

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

  const maxPrice = Math.max(
    ...transactions.map((transaction) => transaction.monthly_rent)
  );
  const minPrice = Math.min(
    ...transactions.map((transaction) => transaction.monthly_rent)
  );

  const sideBarHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      {isMobile && (
        <div className="h-48 w-full">
          <div className="fixed top-0 right-0 opacity-50 z-50">
            <IoMenu size={40} onClick={sideBarHandler} />
          </div>
        </div>
      )}
      <div className="w-[98%] flex h-[98%] rounded-l-[40px]">
        <Sidebar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isMobile={isMobile}
        />
        <main
          id="main-container"
          className="w-full rounded-r-[40px] rounded-l-[40px] lg:rounded-l-none md:rounded-l-none ms-auto border h-full overflow-auto lg:p-2 shadow-md"
        >
          <div className="relative h-14 mt-10">
            <Button
              variant="default"
              className="me-2 absolute bg-[#0c3f74] font-bold hover:bg-[#0c3f74] right-1 top-5"
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
            <div className="filter-slider lg:h-48 h-[400px] mt-10 grid lg:grid-cols-4 lg:gap-4 md:gap-2 gap-3 mx-auto grid-cols-2 lg:w-[90%] md:w-[90%] w-[98%] p-2 rounded-md">
              <FilterBox
                select={<Blocks />}
                name="Blocks"
                selected={selectedBlock}
                icon={<SiCodeblocks className="text-2xl text-white" />}
              />
              <FilterBox
                select={<Streets />}
                name="Street"
                selected={selectedStreetName}
                icon={<FaStreetView className="text-2xl text-white" />}
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
          </section>

          <section className="lg:w-[90%] md:w-[90%] w-[98%] overflow-x-auto overflow-y-hidden mx-auto border h-[700px] pb-3 mt-10 rounded-xl">
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
            <div className="lg:w-[90%] md:w-[90%] w-[98%] mx-auto mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
              <TranstionBox
                name="Transactions"
                value={`${transactions.length}`}
                title="Transactions"
                imageUrl="graph1.png"
              />
              <TranstionBox
                name="Highest Rentals"
                value={`$${maxPrice}`}
                title="Rentals"
                imageUrl="graph1.png"
              />
              <TranstionBox
                name="Lowest Rentals"
                value={`$${minPrice}`}
                title="Rentals"
                imageUrl="graph1.png"
              />
            </div>
          </section>

          <section className="p-7 relative  bg-[url('/building-banner.jpeg')]  bg-cover bg-center before:bg-blue-400 bg-no-repeat lg:w-[90%] md:w-[90%] w-[98%] mx-auto h-52 border rounded-xl mt-10">
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
