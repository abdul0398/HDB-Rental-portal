import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface MyContextValue {
  towns: string[];
  setTowns: React.Dispatch<React.SetStateAction<string[]>>;
  streets: string[];
  setStreets: React.Dispatch<React.SetStateAction<string[]>>;
  blocks: string[];
  setBlocks: React.Dispatch<React.SetStateAction<string[]>>;
  flatTypes: string[];
  setFlatTypes: React.Dispatch<React.SetStateAction<string[]>>;
  months: string[];
  setMonths: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTown: string;
  setSelectedTown: React.Dispatch<React.SetStateAction<string>>;
  selectedStreetName: string;
  setSelectedStreetName: React.Dispatch<React.SetStateAction<string>>;
  selectedBlock: string;
  setSelectedBlock: React.Dispatch<React.SetStateAction<string>>;
  selectedFlatType: string;
  setSelectedFlatType: React.Dispatch<React.SetStateAction<string>>;
  selectedMonths: string[];
  setSelectedMonths: React.Dispatch<React.SetStateAction<string[]>>;
  transactions: any[];
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create the context with a default value
export const MyContext = createContext<MyContextValue>({
  towns: [],
  setTowns: () => { },
  streets: [],
  setStreets: () => { },
  blocks: [],
  setBlocks: () => { },
  flatTypes: [],
  setFlatTypes: () => { },
  months: [],
  setMonths: () => { },
  selectedTown: '',
  setSelectedTown: () => { },
  selectedStreetName: "",
  setSelectedStreetName: () => { },
  selectedBlock: "",
  setSelectedBlock: () => { },
  selectedFlatType: '',
  setSelectedFlatType: () => { },
  selectedMonths: [],
  setSelectedMonths: () => { },
  transactions: [],
  setTransactions: () => { },

});

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [towns, setTowns] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [flatTypes, setFlatTypes] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [selectedTown, setSelectedTown] = useState<string>('');
  const [selectedStreetName, setSelectedStreetName] = useState<string>("");
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [selectedFlatType, setSelectedFlatType] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);


  // Provide the context value to children
  return (
    <MyContext.Provider value={{ transactions, setTransactions, towns, setTowns, streets, setStreets, blocks, setBlocks, flatTypes, setFlatTypes, months, setMonths, selectedTown, setSelectedTown, setSelectedStreetName, selectedStreetName, selectedBlock, setSelectedBlock, selectedFlatType, setSelectedFlatType, selectedMonths, setSelectedMonths }}>
      {children}
    </MyContext.Provider>
  );
};

export default TodoProvider;
