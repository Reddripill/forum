"use client";
import React, { useState, useRef, useEffect } from "react";
import SelectButton from "./SelectButton";
import cn from "classnames";
import styles from "./Select.module.scss";
import { useOutside } from "@/hooks/useOutside";
import { useDebounce } from "@/hooks/useDebounce";
import { ISelectProps, ISelectValue } from "./select.types";

const Select = ({
   maxOptions = 3,
   placeholder,
   isMultiple,
   isSearchable,
   classnames,
   inputHandler: inputHandlerProp,
   selectedValue,
   setSelectedValue,
   options,
}: ISelectProps) => {
   const [isLoading, setIsLoading] = useState(false);
   const [text, setText] = useState(isSearchable ? "" : null);
   const [highlitedValue, setHighlitedValue] = useState(0);
   const [selectOptions, setSelectOptions] = useState(options ?? []);
   const [isShow, setIsShow] = useState(false);
   const debouncedInputText = useDebounce(text, 200);
   const buttonRef = useRef<HTMLButtonElement>(null);
   const closeOptions = () => {
      setIsShow(false);
   };
   const clearSearchText = () => {
      if (text) {
         setText("");
      }
   };
   const selectRef = useOutside<HTMLDivElement>(closeOptions);
   const handleSelect = (option: ISelectValue) => {
      if (clearSearchText) {
         clearSearchText();
      }
      if (isMultiple) {
         setSelectedValue((prev) => {
            if ((prev as ISelectValue[]).includes(option)) {
               const filteredValue = (prev as ISelectValue[]).filter(
                  (item) => item.id !== option.id
               );
               return filteredValue;
            } else {
               if ((prev as ISelectValue[]).length === maxOptions) {
                  return prev;
               }
               return (prev as ISelectValue[]).concat(option);
            }
         });
      } else {
         setSelectedValue(selectedValue === option ? null : option);
         if (closeOptions) {
            closeOptions();
         }
      }
   };
   const handlerKeydown = (e: React.KeyboardEvent) => {
      console.log("Target: ", e.target);
      console.log("Current Target: ", e.currentTarget);
      switch (e.code) {
         case "Escape":
            closeOptions();
            break;
         case "ArrowUp":
         case "ArrowDown":
            if (!isShow) {
               setIsShow(true);
               break;
            }
            const newHighlitedValue =
               highlitedValue + (e.code === "ArrowDown" ? 1 : -1);
            if (
               newHighlitedValue >= 0 &&
               newHighlitedValue < selectOptions.length
            ) {
               setHighlitedValue(newHighlitedValue);
            }
            break;
         case "Enter":
            if (isShow) {
               if (!isMultiple) setIsShow(false);
               handleSelect(selectOptions[highlitedValue]);
            } else {
               setIsShow(true);
            }
            break;
      }
   };
   const checkIsSelected = (option: ISelectValue) => {
      if (isMultiple) {
         if ((selectedValue as ISelectValue[]).length > 0) {
            return (selectedValue as ISelectValue[]).includes(option);
         }
      } else {
         if (selectedValue !== null) {
            return selectedValue === option;
         }
      }
   };
   /* useEffect(() => {
      if (selectRef.current) {
         selectRef.current.focus();
      }
   }, [selectedValue, selectRef]); */
   useEffect(() => {
      let isIgnore = false;
      if (debouncedInputText !== null && inputHandlerProp) {
         setIsLoading(true);
         inputHandlerProp(debouncedInputText).then((data) => {
            if (!isIgnore) {
               setSelectOptions(data);
               setIsLoading(false);
            }
         });
      }
      return () => {
         isIgnore = true;
      };
   }, [debouncedInputText, inputHandlerProp]);
   return (
      <div
         className={cn(classnames, styles.wrapper, {
            [styles._active]: isShow,
         })}
         ref={selectRef}
         onKeyDown={handlerKeydown}
      >
         <SelectButton
            placeholder={placeholder}
            setIsShow={setIsShow}
            text={text}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            setText={setText}
            isMultiple={isMultiple}
            ref={buttonRef}
         />
         {isShow && (
            <div className={styles.options}>
               {selectOptions.length > 0 ? (
                  <>
                     {selectOptions.map((option, index) => (
                        <div
                           key={option.id}
                           onClick={() => handleSelect(option)}
                           onMouseOver={() => setHighlitedValue(index)}
                           className={cn(styles.item, {
                              [styles._selected]: checkIsSelected(option),
                              [styles._highlited]: highlitedValue === index,
                           })}
                        >
                           {option.label}
                        </div>
                     ))}
                  </>
               ) : isLoading ? (
                  <div className="text-center py-4">Loading...</div>
               ) : (
                  <div className="text-center py-4">No Result</div>
               )}
            </div>
         )}
      </div>
   );
};

export default Select;
