import React, { useRef, forwardRef } from "react";
import { SetStateType } from "@/types/main.types";
import { ChevronDown, X } from "lucide-react";
import styles from "./Select.module.scss";
import cn from "classnames";
import { ISelectValue, SelectValuesType } from "./select.types";

interface IProps {
   placeholder: string;
   text: string | null;
   setText: SetStateType<string | null>;
   selectedValue: SelectValuesType;
   setSelectedValue: SetStateType<SelectValuesType>;
   isMultiple?: boolean;
   setIsShow: SetStateType<boolean>;
}

const SelectButton = forwardRef<HTMLButtonElement, IProps>(function SelecButton(
   { placeholder, text, setText, setIsShow, selectedValue, setSelectedValue },
   ref
) {
   const inputRef = useRef<HTMLInputElement>(null);
   const handlerButtonClick = () => {
      setIsShow((prev) => !prev);
      if (text && inputRef.current) {
         inputRef.current.focus();
      }
   };
   const removeItem = (e: React.MouseEvent, value: string | number) => {
      e.stopPropagation();
      setSelectedValue((prev) => {
         const filteredValue = (prev as ISelectValue[]).filter(
            (item) => item.id !== value
         );
         return filteredValue;
      });
   };
   return (
      <button
         className={cn(styles.button)}
         onClick={handlerButtonClick}
         ref={ref}
      >
         <div className="h-full py-1 overflow-hidden flex justify-between items-center">
            {text !== null ? (
               <div className="flex items-center">
                  {(selectedValue as ISelectValue[]).length > 0 && (
                     <div className="flex items-center gap-x-1 mr-2">
                        {(selectedValue as ISelectValue[]).map((item) => (
                           <div
                              key={item.id}
                              className="flex items-center text-sm bg-label px-1 gap-x-[2px]"
                           >
                              <div>{item.label}</div>
                              <X
                                 size={12}
                                 onClick={(e) => removeItem(e, item.id)}
                                 className="cursor-pointer"
                              />
                           </div>
                        ))}
                     </div>
                  )}
                  <input
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     placeholder={
                        (selectedValue as ISelectValue[]).length > 0
                           ? ""
                           : placeholder
                     }
                     ref={inputRef}
                     className={styles.input}
                  />
               </div>
            ) : (
               <div className="text-sm font-light text-gray">
                  {(selectedValue as ISelectValue).label || placeholder}
               </div>
            )}
            <div className={styles.chevron}>
               <ChevronDown size={16} />
            </div>
         </div>
      </button>
   );
});

export default SelectButton;
