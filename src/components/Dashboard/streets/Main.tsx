import React, { useState, useContext, useEffect, use } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Input } from "@/components/ui/input";
import { MyContext } from "@/context/context";
import { filterHandlerReturn } from '@/types/data';
import { filterHandler } from '@/actions/filterHandler';
 

interface RowProps {
 index: number;
 style: React.CSSProperties;
 data: { street: string; selected: boolean }[];
 onCheckboxChange: (index: number, checked: boolean) => void;
}

const Row: React.FC<RowProps> = ({ index, style, data, onCheckboxChange }) => {
    return (
        <div style={style} className="flex mx-auto items-center">
            <input type="checkbox"
                onChange={(e) => onCheckboxChange(index, e.target.checked)}
                checked={data[index].selected}
                className="mr-2"
            />
            <p className="ms-1">{data[index].street}</p>
        </div>
    );
};

export default function Streets() {
    const {
        towns,
        streets,
        blocks,
        months,
        flatTypes,
        setStreets,
        setBlocks,
        setFlatTypes,
        setTowns,
        setMonths,
        selectedTown,
        setSelectedTown,
        selectedMonths,
        selectedBlocks,
        selectedFlatType,
        selectedStreetNames,
        setSelectedStreetNames,
        setTransactions,
    } = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStreets, setSelectedStreets] = useState<boolean[]>(streets.map(() => false));

    // Filter streets based on search query
    const filteredStreets = streets.filter((street, index) =>
        street.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Combine filteredStreets and selectedStreets into a single array for itemData
    const itemData = filteredStreets.map((street, index) => ({ street, selected: selectedStreets[index] }));

    const handleCheckboxChange = (index: number, checked: boolean) => {
        setSelectedStreets(prev => {
            const newSelectedStreets = [...prev];
            newSelectedStreets[index] = checked;
            return newSelectedStreets;
        });
    
        // Update selectedStreetNames based on the checkbox change
        if (checked) {
            setSelectedStreetNames(prev => [...prev, filteredStreets[index]]);
        } else {
            setSelectedStreetNames(prev => prev.filter(name => name !== filteredStreets[index]));
        }
    };
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    },[])


    useEffect(() => {
        if (!isReady) return;
        async function fetchData() {
            const values:filterHandlerReturn = await filterHandler({ selectedMonths, selectedTown, selectedStreetNames, selectedBlocks, selectedFlatType, months, towns, streets, blocks, flatTypes });
            console.log(values.filterStreets);
            setBlocks(values.filterBlocks);
            setFlatTypes(values.filterFlatTypes);
            setMonths(values.filterMonths);
            setTowns(values.filterTowns);
            setTransactions(values.filteredTransaction);
        }
        fetchData();
    }, [selectedStreetNames])
    

    return (
        <section className="overflow-hidden">
            <h2 className="text-xl mx-auto text-center">Select Streets</h2>

            <div className="p-5 h-96 bg-white overflow-auto">
                <Input
                    type="text"
                    className="mx-auto mb-2"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="pb-1">
                    <List
                        height={280}
                        itemCount={itemData.length}
                        itemSize={40}
                        width="100%"
                        itemData={itemData} // Pass combined data to the Row component
                    >
                        {props => <Row {...props} onCheckboxChange={handleCheckboxChange} />}
                    </List>
                </div>
            </div>
        </section>
    );
}
