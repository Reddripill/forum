"use client";
import React, { useState } from "react";
import styles from "./Input.module.scss";
import cn from "classnames";
import { XCircle } from "lucide-react";
import { Check } from "lucide-react";
import { IValidate } from "@/hooks/validate/useValidate";

interface IProps {
   name: string;
   validate: IValidate;
   className?: string;
   type?: React.HTMLInputTypeAttribute;
}

const Input = ({ name, className, type, validate }: IProps) => {
   const [isFocused, setIsFocused] = useState(false);

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

export default Input;
