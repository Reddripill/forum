import React, { ButtonHTMLAttributes } from "react";
import styles from "./MainButton.module.scss";
import cn from "classnames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   color: "orange" | "gray" | "blue";
   className?: string;
   disabled?: boolean;
}

const MainButton = ({
   children,
   className,
   disabled,
   color,
   ...props
}: IProps) => {
   return (
      <button
         className={cn(styles.button, className, styles[color])}
         disabled={disabled}
         {...props}
      >
         {children}
      </button>
   );
};

export default MainButton;
