// 'use server'
import data from "@/data/transaction.json";
import { FilterHandlerParams, filterHandlerReturn } from "@/types/data";

export const filterHandler = async  ({
  selectedMonths,
  selectedTown,
  selectedStreetNames,
  selectedFlatType,
  selectedBlocks,
}: FilterHandlerParams): Promise<filterHandlerReturn> => {
  const transactions = data as Array<any>;
  const filteredTransaction = transactions.filter((transaction, index) => {

    if (selectedTown && transaction.town !== selectedTown) {
      return false;
    }
    if (
      selectedStreetNames.length > 0 &&
      !selectedStreetNames.includes(transaction.street_name)
    ) {
      return false;
    }
    if (
      selectedBlocks.length > 0 &&
      !selectedBlocks.includes(transaction.block)
    ) {
      return false;
    }
    if (selectedFlatType && selectedFlatType !== transaction.flat_type) {
      return false;
    }
    if (
      selectedMonths.length > 0 &&
      !selectedMonths.includes(transaction.rent_approval_date)
    ) {
      return false;
    }
    return true;
  });

  const filterMonths = [
    ...new Set(
      filteredTransaction.map((transaction) => transaction.rent_approval_date)
    ),
  ];
  const filterTowns = [
    ...new Set(filteredTransaction.map((transaction) => transaction.town)),
  ];
  const filterStreets = [
    ...new Set(
      filteredTransaction.map((transaction) => transaction.street_name)
    ),
  ];
  const filterBlocks = [
    ...new Set(filteredTransaction.map((transaction) => transaction.block)),
  ];
  const filterFlatTypes = [
    ...new Set(filteredTransaction.map((transaction) => transaction.flat_type)),
  ];

  filterMonths.sort();
  filterTowns.sort();
  filterStreets.sort();
  filterBlocks.sort();
  filterFlatTypes.sort();

  return {
    filterMonths,
    filterTowns,
    filterStreets,
    filterBlocks,
    filterFlatTypes,
    filteredTransaction,
  }
};
