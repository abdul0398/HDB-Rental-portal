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
    filterStreets : string[];
    filterBlocks : string[];
    filterFlatTypes : string[];
    filteredTransaction : any[];
   }