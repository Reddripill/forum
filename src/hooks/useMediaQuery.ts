import { useState, useEffect, useCallback } from "react";

export const useMediaQuery = (width: number = 767) => {
   const [isMatched, setIsMatched] = useState(false);
   const checkIsMatched = useCallback((e: MediaQueryListEvent) => {
      if (e.matches) {
         setIsMatched(true);
      } else {
         setIsMatched(false);
      }
   }, []);
   useEffect(() => {
      const media = window!.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", checkIsMatched);
      if (media.matches) {
         setIsMatched(true);
      }
      return () => {
         media.removeEventListener("change", checkIsMatched);
      };
   }, [width, checkIsMatched]);
   return isMatched;
};
