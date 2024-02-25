"use client";
import React, {
   Children,
   cloneElement,
   useState,
   useRef,
   useEffect,
} from "react";
import SelectProvider from "@/providers/SelectProvider";
import SelectButton from "./SelectButton";
import cn from "classnames";
import styles from "./Select.module.scss";
import { useOutside } from "@/hooks/useOutside";
import SelectOptions from "./SelectOptions";
import { useDebounce } from "@/hooks/useDebounce";
import { IControlledValue, ISelectProps } from "./select.types";

const Select = ({
   children,
   maxOptions = 3,
   placeholder,
   isMultiple,
   isSearchable,
   classnames,
   inputHandler: inputHandlerProp,
   value,
   setValue,
}: ISelectProps) => {
   const [text, setText] = useState(isSearchable ? "" : null);
   const [isShow, setIsShow] = useState(false);
   const [controlledOptions, setControlledOptions] = useState<
      IControlledValue[]
   >([]);
   const debouncedValue = useDebounce(text, 200);
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
   useEffect(() => {
      let isIgnore = false;
      if (debouncedValue && inputHandlerProp && setControlledOptions) {
         inputHandlerProp(debouncedValue).then((data) => {
            if (!isIgnore) {
               setControlledOptions(data);
            }
         });
      }
      return () => {
         isIgnore = true;
      };
   }, [debouncedValue, inputHandlerProp, setControlledOptions]);
   return (
      <div
         className={cn(classnames, styles.wrapper, {
            [styles._active]: isShow,
         })}
         ref={selectRef}
      >
         <SelectProvider value={value} setValue={setValue}>
            <SelectButton
               placeholder={placeholder}
               setIsShow={setIsShow}
               text={text}
               setText={setText}
               isMultiple={isMultiple}
               ref={buttonRef}
            />
            {isShow && (
               <div className={styles.options}>
                  {children ? (
                     <>
                        {Children.map(children, (child) =>
                           cloneElement(child, {
                              closeOptions,
                              isMultiple,
                              maxOptions,
                           })
                        )}
                     </>
                  ) : (
                     <SelectOptions
                        options={controlledOptions}
                        closeOptions={closeOptions}
                        isMultiple={isMultiple}
                        maxOptions={maxOptions}
                        clearSearchText={clearSearchText}
                     />
                  )}
               </div>
            )}
         </SelectProvider>
      </div>
   );
};

export default Select;
