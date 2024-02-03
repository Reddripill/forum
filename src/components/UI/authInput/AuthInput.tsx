"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./AuthInput.module.scss";
import cn from "classnames";
import { XCircle } from "lucide-react";
import { Check } from "lucide-react";
import { IValidate } from "@/hooks/validate/useValidate";

interface IProps {
   name: string;
   validate: IValidate;
   className?: string;
   autoFocus?: boolean;
   type?: React.HTMLInputTypeAttribute;
}

const AuthInput = ({ name, className, type, validate, autoFocus }: IProps) => {
   const [isFocused, setIsFocused] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (autoFocus) {
         setIsFocused(true);
         inputRef.current?.focus();
      }
   }, [autoFocus]);
   return (
      <div
         className={cn(styles.input, className, {
            [styles._active]: isFocused || validate.value,
         })}
      >
         <span className={styles.label}>{name}</span>
         <input
            type={type || "text"}
            className={cn(styles["input-field"])}
            value={validate.value}
            onChange={validate.changeHandler}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
               setIsFocused(false);
               validate.blurHandler();
            }}
            autoComplete="new-password"
            ref={inputRef}
         />
         {!validate.isPure && (
            <div className={styles.validation}>
               {validate.isValid ? (
                  <Check color="#17A100" size={16} />
               ) : (
                  <XCircle color="#FF0000" size={16} />
               )}
            </div>
         )}
      </div>
   );
};

export default AuthInput;
