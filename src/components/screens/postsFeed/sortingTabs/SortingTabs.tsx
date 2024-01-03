import React from "react";
import { SortingTabNameType, sortingTabs } from "./sortingTabs.data";
import styles from "./SortingTabs.module.scss";
import { SetStateType } from "@/types/main.types";
import cn from "classnames";

interface IProps {
   activeTab: SortingTabNameType;
   setActiveTab: SetStateType<SortingTabNameType>;
}

const SortingTabs = ({ activeTab, setActiveTab }: IProps) => {
   if (sortingTabs.length === 0) return null;
   return (
      <div className={styles.row}>
         {sortingTabs.map((tab) => (
            <button
               key={tab.name}
               className={cn(styles.tab, {
                  [styles._active]: activeTab === tab.name,
               })}
               onClick={() => setActiveTab(tab.name)}
            >
               <tab.icon size={12} className={styles.icon} />
               <div className={styles.name}>{tab.name}</div>
            </button>
         ))}
      </div>
   );
};

export default SortingTabs;
