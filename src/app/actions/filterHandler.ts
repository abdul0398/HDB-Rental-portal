// 'use server'
import data from "@/data/transaction.json";
import {
  FilterHandlerParams,
  filterHandlerReturn,
  transactiontype,
} from "@/types/data";

export const filterHandler = async ({
  selectedMonth,
  selectedTown,
  selectedStreetName,
  selectedFlatType,
  selectedBlock,
}: FilterHandlerParams): Promise<filterHandlerReturn> => {
  const transactions = data as Array<transactiontype>;

  const filterBlocks: string[] = [];
  const filterStreets: string[] = [];
  const filterTowns: string[] = [];
  const filterFlatTypes: string[] = [];
  const filterMonths: string[] = [];

  const filteredTransaction: transactiontype[] = [];

  for (const transaction of transactions) {
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
    if (selectedMonth) {
      if (selectedMonth == month) {
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

    if (isStreetPresent && isTownPresent && isMonthPresent && isBlockPresent) {
      filterFlatTypes.push(flatType);
    }

    if (
      isStreetPresent &&
      isTownPresent &&
      isFlatTypePresent &&
      isBlockPresent
    ) {
      filterMonths.push(month);
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
  filteredTransaction.sort((a, b) => {
    /// based on town
    if (a.town < b.town) {
      return -1;
    }
    if (a.town > b.town) {
      return 1;
    }
    return 0;
  })

  return {
    filterMonths: [...new Set(filterMonths)].sort(),
    filterTowns: [...new Set(filterTowns)].sort(),
    filterStreets: [...new Set(filterStreets)].sort(),
    filterBlocks: [...new Set(filterBlocks)].sort(),
    filterFlatTypes: [...new Set(filterFlatTypes)].sort(),
    filteredTransaction,
  };
};
