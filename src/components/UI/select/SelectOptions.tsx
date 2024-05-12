// import { useSelectContext } from "@/providers/SelectProvider";
import React from "react";
import SelectOption from "./SelectOption";
import { ISelectValue } from "./select.types";
import { SetStateType } from "@/types/main.types";

interface IProps {
   options: ISelectValue[];
   setOptions: SetStateType<ISelectValue[]>;
   maxOptions: number;
   closeOptions: () => void;
   isMultiple?: boolean;
   clearSearchText?: () => void;
}

const SelectOptions = ({
   options,
   closeOptions,
   isMultiple,
   maxOptions,
   clearSearchText,
   setOptions,
}: IProps) => {
   return (
      <>
         {options.length > 0 ? (
            <>
               {options.map((option) => (
                  <SelectOption
                     value={option}
                     key={option.id}
                     maxOptions={maxOptions}
                     isMultiple={isMultiple}
                     closeOptions={closeOptions}
                     clearSearchText={clearSearchText}
                  >
                     {option.label}
                  </SelectOption>
               ))}
            </>
         ) : (
            <div className="text-center py-4">No Result</div>
         )}
      </>
   );
};

export default SelectOptions;
