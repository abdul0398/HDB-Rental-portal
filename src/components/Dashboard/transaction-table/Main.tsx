import React from 'react';
import { MyContext } from "@/context/context";
import { useContext } from "react";
import dynamic from 'next/dynamic';
import { ListChildComponentProps } from 'react-window';
import { FaSort } from "react-icons/fa";

const List = dynamic(() => import('react-window').then((mod) => mod.FixedSizeList), {
  ssr: false // Disable SSR for this component
});

export default function Transactions() {
  const { transactions, setTransactions } = useContext(MyContext);
  


  // Define the Row component with proper types for props
  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const transaction = transactions[index];

    if (!transaction) {
      return null; // Return null if transaction is not available
    }

    return (
      <div key={index} style={style} className={`${index % 2 == 0 ? "bg-slate-50" : ""} "h-14 grid gap-1 grid-cols-[20%_25%_10%_10%_20%_10%] border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600" `}>
        <div className="px-1">{transaction.town}</div>
        <div className="px-1">{transaction.street_name}</div>
        <div className="px-1">{transaction.block}</div>
        <div className="px-1">{transaction.flat_type}</div>
        <div className="px-1">{transaction.rent_approval_date}</div>
        <div className="px-1">${transaction.monthly_rent}</div>
      </div>
    );
  };


  const handleSort = (field: string) => {
    const isSortedAscending = transactions.every((transaction, index) => {
      if (index === 0) return true;
      if (field === "monthly_rent") {
          return parseInt(transaction[field]) >= parseInt(transactions[index - 1][field]);
      } else {
          return transaction[field] >= transactions[index - 1][field];
      }
  });
    if (isSortedAscending) {
        setTransactions([...transactions.reverse()]);
    } else {
        const sortedTransactions = [...transactions].sort((a, b) => {
            if (field === "monthly_rent") {
                return parseInt(a[field]) - parseInt(b[field]);
            } else {
                return a[field].localeCompare(b[field]);
            }
        });
        setTransactions(sortedTransactions);
    }
}

  return (
    <div className="flex flex-col bg-white">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm: lg:px-8">
          <div className="overflow-hidden">
            <div className="min-w-full text-left text-sm font-light overflow-hidden">
              <div className="border-b font-medium dark:border-neutral-500 grid gap-1 grid-cols-[20%_25%_10%_10%_20%_10%] text-sm">
                <div className="px-1 py-4 text-sm flex">TOWN <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("town")} /></span> </div>
                <div className="px-1 py-4 text-sm flex">STREET <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("street_name")} /></span></div>
                <div className="px-1 py-4 text-sm flex">BLOCK <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("block")} /></span></div>
                <div className="px-1 py-4 text-sm">FLAT TYPE</div>
                <div className="px-1 py-4 text-sm flex">TRANSACTION DATE <span className='flex items-center'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("rent_approval_date")} /></span></div>
                <div className="px-1 py-4 text-sm flex">RENTAL ($) <span className='flex items-center ms-2'><FaSort className='hover:cursor-pointer' onClick={() => handleSort("monthly_rent")} /></span></div>
              </div>
              <div className="overflow-hidden">
                <List
                  height={480}
                  itemCount={transactions.length}
                  itemSize={50}
                  width={'100%'}
                >
                  {Row}
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
