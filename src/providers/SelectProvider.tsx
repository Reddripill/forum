"use client";
import React, { createContext, useContext, useState } from "react";
import { SetStateType } from "@/types/main.types";
import { SelectValuesType } from "@/components/UI/select/select.types";

interface IContextValue {
   value: SelectValuesType;
   setValue: SetStateType<SelectValuesType>;
}
interface IProps extends IContextValue {
   children: React.ReactNode;
}

const SelectContext = createContext<IContextValue | null>(null);

const SelectProvider = ({ children, value, setValue }: IProps) => {
   return (
      <SelectContext.Provider value={{ value, setValue }}>
         {children}
      </SelectContext.Provider>
   );
};

export const useSelectContext = () => {
   const context = useContext(SelectContext);
   if (!context) {
      throw new Error("You try get context value outside the provider!");
   }
   return context;
};

export default SelectProvider;
