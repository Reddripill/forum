"use client";
import { useEffect, useState, useRef } from "react";
import { SetStateType } from "@/types/main.types";
import { CheckKeys } from "./validate.enum";

type CheckKeysType = {
   checkKey: CheckKeys;
   errorMessage: string;
   value?: number;
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
   keys: CheckKeysType[],
   isPure: boolean,
   comparedValue?: string
) => {
   const [error, setError] = useState<CheckKeysType[]>([]);
   const addError = (item: CheckKeysType) => {
      setError((prevError) => {
         if (!prevError.find((errItem) => errItem.checkKey === item.checkKey)) {
            return [...prevError, item];
         }
         return prevError;
      });
   };
   const removeError = (item: CheckKeysType) => {
      setError((prevError) =>
         prevError.filter((errItem) => errItem.checkKey !== item.checkKey)
      );
   };
   console.log(error);
   useEffect(() => {
      if (!isPure) {
         for (const key of keys) {
            switch (key.checkKey) {
               case CheckKeys.Empty:
                  {
                     if (value.length === 0) {
                        addError(key);
                     } else {
                        removeError(key);
                     }
                  }
                  break;
               case CheckKeys.MinLength: {
                  const minLength = key.value ? key.value : 1;
                  if (value.length < minLength) {
                     addError(key);
                  } else {
                     removeError(key);
                  }
               }
            }
         }
      }
   }, [value, isPure, keys]);
   return error;
};

export const useValidate = (
   initialValue: string,
   checkKeys: CheckKeysType[],
   comparedValue?: string
): IValidate => {
   const [value, setValue] = useState(initialValue || "");
   const { current: keys } = useRef(checkKeys);
   const [isPure, setIsPure] = useState(true);
   const error = useCheckValue(value, keys, isPure, comparedValue);
   const errorMessage = error.length > 0 ? error[0].errorMessage : null;
   const isValid = !errorMessage && !!value;
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
      error: errorMessage,
      isValid,
      isPure,
   };
};
