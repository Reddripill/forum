"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchFIeld = ({ className }: { className?: string }) => {
   const [input, setInput] = useState("");
   return (
      <div className={`w-full mb-7 ${className}`}>
         <div className="xl:pl-sidebar pl-7 w-full flex items-center">
            <Search className="text-gray mr-3 xl:w-[18px] xl:h-[18px] w-4 h-4" />
            <input
               className="w-full h-10 text-black font-medium text-sm 
            placeholder:text-black placeholder:font-medium placeholder:text-sm"
               type="text"
               placeholder="Search"
               value={input}
               onChange={(e) => setInput(e.target.value)}
            />
         </div>
      </div>
   );
};

export default SearchFIeld;
