import {
   ArrowUpRight,
   CheckCircle,
   Clock,
   Flame,
   LucideIcon,
} from "lucide-react";

export type SortingTabNameType = "New" | "Top" | "Hot" | "Closed";

export interface ISortingTab {
   name: SortingTabNameType;
   icon: LucideIcon;
}

export const sortingTabs: ISortingTab[] = [
   {
      name: "New",
      icon: Clock,
   },
   {
      name: "Top",
      icon: ArrowUpRight,
   },
   {
      name: "Hot",
      icon: Flame,
   },
   {
      name: "Closed",
      icon: CheckCircle,
   },
];
