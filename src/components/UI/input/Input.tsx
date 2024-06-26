"use client";
import React, { useState } from "react";
import styles from "./Input.module.scss";
import cn from "classnames";
import { IValidate } from "@/hooks/validate/useValidate";

interface IProps {
   validate: IValidate;
   className?: string;
   placeholder?: string;
}

const Input = ({ className, placeholder, validate }: IProps) => {
   const [isFocused, setIsFocused] = useState(false);

   return (
      <div
         className={cn(styles.input, className, {
            [styles._active]: isFocused,
            [styles._error]: validate.error,
         })}
      >
         <input
            type="text"
            className={cn(styles["input-field"])}
            value={validate.value}
            onChange={validate.changeHandler}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            onBlur={() => {
               setIsFocused(false);
               validate.blurHandler();
            }}
         />
         {validate.error && (
            <span className={styles.error}>{validate.error}</span>
         )}
      </div>
   );
};

export default Input;
