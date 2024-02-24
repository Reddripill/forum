import React, { useRef, forwardRef } from "react";
import { useSelectContext } from "@/providers/SelectProvider";
import { SetStateType } from "@/types/main.types";
import { ChevronDown, X } from "lucide-react";
import styles from "./Select.module.scss";
import cn from "classnames";

interface IProps {
   placeholder: string;
   text: string | null;
   setText: SetStateType<string | null>;
   isMultiple?: boolean;
   setIsShow: SetStateType<boolean>;
}

const SelectButton = forwardRef<HTMLButtonElement, IProps>(function SelecButton(
   { placeholder, text, setText, setIsShow },
   ref
) {
   const inputRef = useRef<HTMLInputElement>(null);
   const { value, setValue } = useSelectContext();
   const handlerButtonClick = () => {
      setIsShow((prev) => !prev);
      if (text && inputRef.current) {
         inputRef.current.focus();
      }
   };
   const removeItem = (e: React.MouseEvent, value: string) => {
      // e.stopPropagation();
      setValue((prev) => {
         const filteredValue = (prev as string[]).filter(
            (item) => item !== value
         );
         if (filteredValue.length === 0) {
            return null;
         }
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
                  {value && (
                     <div className="flex items-center gap-x-1 mr-2">
                        {(value as string[]).map((item) => (
                           <div
                              key={item}
                              className="flex items-center text-sm bg-label px-1 gap-x-[2px]"
                           >
                              <div>{item}</div>
                              <X
                                 size={12}
                                 onClick={(e) => removeItem(e, item)}
                                 className="cursor-pointer"
                              />
                           </div>
                        ))}
                     </div>
                  )}
                  <input
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     placeholder={value ? "" : placeholder}
                     ref={inputRef}
                     className={styles.input}
                  />
               </div>
            ) : (
               <div className="text-sm font-light text-gray">
                  {value || placeholder}
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
