
export type data = {
    [town: string]: string[];
   };
   
export type FilterHandlerParams = {
    selectedMonths: string[];
    selectedTown: string;
    selectedStreetNames: string[];
    selectedBlocks: string[];
    selectedFlatType: string;
    months: string[];
    towns: string[];
    streets: string[];
    blocks: string[];
    flatTypes: string[];
   };


   export type filterHandlerReturn = {
    filterMonths : string[];
    filterTowns : string[];
    // filterStreets : string[];
    filterBlocks : string[];
    filterFlatTypes : string[];
    filteredTransaction : any[];
   }


   export type  transactiontype = {
    _id: number;
    rent_approval_date: string;
    town: string;
    block: string;
    street_name: string;
    flat_type: string;
    monthly_rent: string;
   }