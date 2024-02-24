"use client";
import React, { useEffect, useRef } from "react";

export const useOutside = <T extends HTMLElement>(
   handleClickOutside: () => void
) => {
   const ref = useRef<T>(null);
   useEffect(() => {
      const clickHandler = (e: MouseEvent) => {
         if (ref.current) {
            if (!ref.current.contains(e.target as HTMLElement)) {
               handleClickOutside();
            }
         }
      };
      document.addEventListener("click", clickHandler);
      return () => {
         document.removeEventListener("click", clickHandler);
      };
   }, [ref, handleClickOutside]);
   return ref;
};
