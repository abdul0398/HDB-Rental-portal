// 'use server'
import data from "@/data/transaction.json";
import { FilterHandlerParams, filterHandlerReturn, transactiontype } from "@/types/data";

export const filterHandler = async  ({
  selectedMonths,
  selectedTown,
  selectedStreetName,
  selectedFlatType,
  selectedBlock,
}: FilterHandlerParams): Promise<filterHandlerReturn> => {
  const transactions = data as Array<transactiontype>;

  const filterBlocks: string[] = [];
  const filterStreets: string[] = [];
  const filterTowns: string[] = [];
  const filterFlatTypes:string[] = [];
  const filterMonths: string[] = [];


 const filteredTransaction : transactiontype[] = [];

  for(const transaction of transactions){
    let isTownPresent = false;
    let isStreetPresent = false;
    let isBlockPresent = false;
    let isFlatTypePresent = false;
    let isMonthPresent = false;


    const street = transaction.street_name;
    const town = transaction.town;
    const block = transaction.block;
    const flatType = transaction.flat_type;
    const month = transaction.rent_approval_date;
    const yearMonth = `20${month.slice(2)}-${month.slice(0, 2)}`

    if (selectedTown.length > 0) {
      if (selectedTown.includes(town)) {
        isTownPresent = true;
      }
    } else {
      isTownPresent = true;
    }

    if (selectedStreetName) {
      if (selectedStreetName == street) {
        isStreetPresent = true;
      }
    } else {
      isStreetPresent = true;
    }

    if (selectedBlock) {
      if (selectedBlock == block) {
        isBlockPresent = true;
      }
    } else {
      isBlockPresent = true;
    }

    if (selectedFlatType) {
      if (selectedFlatType === flatType) {
        isFlatTypePresent = true;
      }
    } else {
      isFlatTypePresent = true;
    }

    if (selectedMonths.length > 0) {
      if (selectedMonths.includes(yearMonth)) {
        isMonthPresent = true;
      }
    } else {
      isMonthPresent = true;
    }





    if (
      isStreetPresent &&
      isTownPresent &&
      isFlatTypePresent &&
      isMonthPresent
    ) {
      filterBlocks.push(block);
    }

    if (
      isTownPresent &&
      isFlatTypePresent &&
      isMonthPresent && 
      isBlockPresent
    ) {
      filterStreets.push(street);
    }

    if (
      isStreetPresent &&
      isFlatTypePresent &&
      isMonthPresent && 
      isBlockPresent
    ) {
      filterTowns.push(town);
    }

    if (
      isStreetPresent &&
      isTownPresent &&
      isMonthPresent && 
      isBlockPresent
    ) {
      filterFlatTypes.push(flatType);
    }

    if (
      isStreetPresent &&
      isTownPresent &&
      isFlatTypePresent && 
      isBlockPresent
    ) {
      filterMonths.push(yearMonth);
    }


    if (
      isStreetPresent &&
      isTownPresent &&
      isFlatTypePresent &&
      isMonthPresent &&
      isBlockPresent
    ) {
      filteredTransaction.push(transaction);
    }


    
  }

  return {
    filterMonths :[...new Set(filterMonths)].sort(),
    filterTowns : [...new Set(filterTowns)].sort(),
    filterStreets : [...new Set(filterStreets)].sort(),
    filterBlocks : [...new Set(filterBlocks)].sort(),
    filterFlatTypes : [...new Set(filterFlatTypes)].sort(),
    filteredTransaction
  }
};
