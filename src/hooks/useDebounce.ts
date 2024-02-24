import React, { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 300) => {
   const [debouncedValue, setDebouncedValue] = useState<T>(value);
   useEffect(() => {
      const timestamp = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);
      return () => {
         clearTimeout(timestamp);
      };
   }, [value, delay]);
   return debouncedValue;
};
