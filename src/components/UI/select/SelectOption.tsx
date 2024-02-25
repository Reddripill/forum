import { useSelectContext } from "@/providers/SelectProvider";
import React from "react";
import styles from "./Select.module.scss";
import cn from "classnames";
import { IControlledValue, SelectValuesType } from "./select.types";

interface IProps {
   children: React.ReactNode;
   value: IControlledValue;
   closeOptions?: () => void;
   isMultiple?: boolean;
   maxOptions?: number;
   clearSearchText?: () => void;
}

const SelectOption = ({
   children,
   value,
   closeOptions,
   isMultiple,
   maxOptions,
   clearSearchText,
}: IProps) => {
   const { setValue, value: currentValue } = useSelectContext();
   const handleSelect = () => {
      if (clearSearchText) {
         clearSearchText();
      }
      if (isMultiple) {
         setValue((prev) => {
            if (prev === null) {
               return [value];
            } else {
               if ((prev as IControlledValue[]).includes(value)) {
                  const filteredValue = (prev as IControlledValue[]).filter(
                     (item) => item.id !== value.id
                  );
                  if (filteredValue.length === 0) {
                     return null;
                  }
                  return filteredValue;
               } else {
                  if (
                     maxOptions &&
                     (prev as IControlledValue[]).length == maxOptions
                  ) {
                     return prev;
                  }
                  return (prev as IControlledValue[]).concat(value);
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
            return (currentValue as IControlledValue[]).includes(value);
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
