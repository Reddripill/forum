// import { useSelectContext } from "@/providers/SelectProvider";
import React from "react";
import SelectOption from "./SelectOption";

interface IProps {
   options: string[];
   closeOptions: () => void;
   isMultiple?: boolean;
   maxOptions: number;
}

const SelectOptions = ({
   options,
   closeOptions,
   isMultiple,
   maxOptions,
}: IProps) => {
   return (
      <>
         {options.length > 0 ? (
            <>
               {options.map((option) => (
                  <SelectOption
                     value={option}
                     key={option}
                     maxOptions={maxOptions}
                     isMultiple={isMultiple}
                     closeOptions={closeOptions}
                  >
                     {option}
                  </SelectOption>
               ))}
            </>
         ) : (
            <div>No Result</div>
         )}
      </>
   );
};

export default SelectOptions;
