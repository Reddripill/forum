import { useSelectContext } from "@/providers/SelectProvider";
import React from "react";
import styles from "./Select.module.scss";
import cn from "classnames";

interface IProps {
   children: React.ReactNode;
   value: any;
   closeOptions?: () => void;
   isMultiple?: boolean;
   maxOptions?: number;
}

const SelectOption = ({
   children,
   value,
   closeOptions,
   isMultiple,
   maxOptions,
}: IProps) => {
   const { setValue, value: currentValue } = useSelectContext();
   const handleSelect = () => {
      if (isMultiple) {
         setValue((prev) => {
            if (prev === null) {
               return [value];
            } else {
               if ((prev as string[]).includes(value)) {
                  const filteredValue = (prev as string[]).filter(
                     (item) => item !== value
                  );
                  if (filteredValue.length === 0) {
                     return null;
                  }
                  return filteredValue;
               } else {
                  if (maxOptions && prev.length == maxOptions) {
                     return prev;
                  }
                  return (prev as string[]).concat(value);
               }
            }
         });
      } else {
         setValue(currentValue === value ? null : value);
         if (closeOptions) {
            closeOptions();
         }
      }
   };
   const checkIsSelected = () => {
      if (currentValue !== null) {
         if (isMultiple) {
            return (currentValue as string[]).includes(value);
         } else {
            return currentValue === value;
         }
      }
   };
   return (
      <div
         onClick={handleSelect}
         className={cn(styles.item, { [styles._selected]: checkIsSelected() })}
      >
         {children}
      </div>
   );
};

export default SelectOption;
