import React, { ButtonHTMLAttributes } from "react";
import styles from "./HeaderButton.module.scss";
import cn from "classnames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   isGray?: boolean;
   className?: string;
   disabled?: boolean;
}

const HeaderButton = ({
   children,
   isGray,
   className,
   disabled,
   ...props
}: IProps) => {
   return (
      <button
         className={cn(styles.button, className, { [styles.gray]: isGray })}
         disabled={disabled}
         {...props}
      >
         {children}
      </button>
   );
};

export default HeaderButton;
