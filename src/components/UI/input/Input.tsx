"use client";
import React, { useState } from "react";
import styles from "./Input.module.scss";
import cn from "classnames";
import { useValidate } from "@/hooks/validate/useValidate";
import { CheckKeys } from "@/hooks/validate/validate.enum";

interface IProps {
   className?: string;
   minLength?: number;
   placeholder?: string;
   // type?: React.HTMLInputTypeAttribute;
}

const Input = ({ className, placeholder, minLength = 1 }: IProps) => {
   const [isFocused, setIsFocused] = useState(false);
   const validate = useValidate("", [
      {
         checkKey: CheckKeys.MinLength,
         value: minLength,
         errorMessage: `min length: ${minLength}`,
      },
   ]);

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
