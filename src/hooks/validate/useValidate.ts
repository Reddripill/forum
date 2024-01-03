"use client";
import { useEffect } from "react";
import { SetStateType } from "@/types/main.types";
import { useState } from "react";
import { CheckKeys } from "./validate.enum";

type CheckKeysType = {
   checkKey: CheckKeys;
   errorMessage: string;
};

export interface IValidate {
   value: string;
   setValue: SetStateType<string>;
   changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
   blurHandler: () => void;
   error: string | null;
   isValid: boolean;
   isPure: boolean;
}

const useCheckValue = (
   value: string,
   checkKeys: CheckKeysType[],
   isPure: boolean,
   comparedValue?: string
) => {
   const [error, setError] = useState<string | null>(null);
   // console.log("testMainErron", "MainError: ", error);
   useEffect(() => {
      // console.log("Effect");
      if (!isPure) {
         for (const key of checkKeys) {
            switch (key.checkKey) {
               case CheckKeys.Empty:
                  {
                     if (value.length === 0) {
                        setError(key.errorMessage);
                     } else {
                        setError(null);
                     }
                     /* if (value.length === 0) {
                        setError((prev) => prev.concat(key.errorMessage));
                     } else {
                        setError((prev) =>
                           prev.filter((item) => item !== key.errorMessage)
                        );
                     } */
                  }
                  break;
               /* case CheckKeys.Email:
                  {
                     if (value.includes("@")) {
                        setError((prev) =>
                           prev.filter((item) => item !== key.errorMessage)
                        );
                     } else {
                        setError((prev) => prev.concat(key.errorMessage));
                     }
                  }
                  break; */
            }
         }
         /* if (comparedValue) {
            console.log("value: ", comparedValue);
            if (value !== comparedValue) {
               setError("Password doesn't submitted");
            } else {
               setError(null);
            }
         } */
      }
   }, [value, isPure, checkKeys, comparedValue]);
   return error;
};

export const useValidate = (
   initialValue: string,
   checkKeys: CheckKeysType[],
   comparedValue?: string
): IValidate => {
   const [value, setValue] = useState(initialValue || "");
   const [isPure, setIsPure] = useState(true);
   const error = useCheckValue(value, checkKeys, isPure, comparedValue);
   const isValid = !error && !!value;
   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };
   const blurHandler = () => {
      setIsPure(false);
   };
   return {
      value,
      setValue,
      changeHandler,
      blurHandler,
      error,
      isValid,
      isPure,
   };
};
