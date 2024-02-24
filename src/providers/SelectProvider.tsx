"use client";
import React, { createContext, useContext, useState } from "react";
import { SetStateType } from "@/types/main.types";

interface IContextValue {
   value: string | string[] | null;
   setValue: SetStateType<string | string[] | null>;
   // content: string;
}
const func = (): never => {
   return func();
};

const SelectContext = createContext<IContextValue | null>(null);

const SelectProvider = ({
   children,
   defaultValue,
}: {
   children: React.ReactNode;
   defaultValue: string | string[] | null;
}) => {
   const [value, setValue] = useState<string | string[] | null>(defaultValue);
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
