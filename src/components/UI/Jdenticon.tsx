"use client";
import React, { useRef, useEffect } from "react";
import { update } from "jdenticon";
import cn from "classnames";

const Jdenticon = ({
   value,
   size,
   className,
}: {
   value: string;
   size: number;
   className?: string;
}) => {
   const icon = useRef(null);
   useEffect(() => {
      if (icon.current) {
         update(icon.current, value);
      }
   }, [value]);
   return (
      <div
         className={cn("rounded-full overflow-hidden", {
            [`${className}`]: className,
         })}
      >
         <svg
            data-jdenticon-value={value}
            width={size}
            height={size}
            ref={icon}
         >
            <circle cx="30" cy="30" r="30" />
         </svg>
      </div>
   );
};

export default Jdenticon;
