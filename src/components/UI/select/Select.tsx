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

interface IProps {
   children?: React.JSX.Element | React.JSX.Element[];
   defaultValue?: any;
   placeholder: string;
   isMultiple?: boolean;
   isSearchable?: boolean;
   classnames?: string;
   maxOptions?: number;
   inputHandler?: (val: any) => Promise<any>;
}

const Select = ({
   children,
   defaultValue = null,
   maxOptions = 3,
   placeholder,
   isMultiple,
   isSearchable,
   classnames,
   inputHandler: inputHandlerProp,
}: IProps) => {
   const [text, setText] = useState(isSearchable ? "" : null);
   const [controlledOptions, setControlledOptions] = useState<string[]>([]);
   const [isShow, setIsShow] = useState(false);
   const debouncedValue = useDebounce(text, 200);
   const buttonRef = useRef<HTMLButtonElement>(null);
   const closeOptions = () => {
      setIsShow(false);
   };
   const selectRef = useOutside<HTMLDivElement>(closeOptions);
   useEffect(() => {
      let isIgnore = false;
      if (debouncedValue && inputHandlerProp) {
         inputHandlerProp(debouncedValue).then((data) => {
            if (!isIgnore) {
               setControlledOptions(data);
            }
         });
      }
      return () => {
         isIgnore = true;
      };
   }, [debouncedValue, inputHandlerProp]);
   return (
      <div
         className={cn(classnames, styles.wrapper, {
            [styles._active]: isShow,
         })}
         ref={selectRef}
      >
         <SelectProvider defaultValue={defaultValue}>
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
                     />
                  )}
               </div>
            )}
         </SelectProvider>
      </div>
   );
};

export default Select;
