import React from "react";
import styles from "./Select.module.scss";
import cn from "classnames";
import { ISelectValue, SelectValuesType } from "./select.types";
import { SetStateType } from "@/types/main.types";

interface IProps {
   option: ISelectValue;
   closeOptions?: () => void;
   isMultiple?: boolean;
   maxOptions: number;
   clearSearchText?: () => void;
   selectedValue: SelectValuesType;
   setSelectedValue: SetStateType<SelectValuesType>;
   highlited: number;
   setHighlited: SetStateType<number>;
}

const SelectOption = ({
   option,
   closeOptions,
   isMultiple,
   maxOptions,
   clearSearchText,
   selectedValue,
   setSelectedValue,
   highlited,
   setHighlited,
}: IProps) => {
   const handleSelect = () => {
      if (clearSearchText) {
         clearSearchText();
      }
      if (isMultiple) {
         setSelectedValue((prev) => {
            if ((prev as ISelectValue[]).includes(option)) {
               const filteredValue = (prev as ISelectValue[]).filter(
                  (item) => item.id !== option.id
               );
               return filteredValue;
            } else {
               if ((prev as ISelectValue[]).length === maxOptions) {
                  return prev;
               }
               return (prev as ISelectValue[]).concat(option);
            }
         });
      } else {
         setSelectedValue(selectedValue === option ? null : option);
         if (closeOptions) {
            closeOptions();
         }
      }
   };
   const checkIsSelected = () => {
      if (isMultiple) {
         if ((selectedValue as ISelectValue[]).length > 0) {
            return (selectedValue as ISelectValue[]).includes(option);
         }
      } else {
         if (selectedValue !== null) {
            return selectedValue === option;
         }
      }
   };
   return (
      <div
         onClick={handleSelect}
         className={cn(styles.item, { [styles._selected]: checkIsSelected() })}
      >
         {option.label}
      </div>
   );
};

export default SelectOption;
