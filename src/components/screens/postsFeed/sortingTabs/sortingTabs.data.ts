import {
   ArrowUpRight,
   CheckCircle,
   Clock,
   Flame,
   LucideIcon,
} from "lucide-react";

export type SortingTabNameType = "New" | "Top" | "Hot" | "Closed";

export type TagSortingTabNameType = "New" | "Top" | "Hot";

export interface ISortingTab<T> {
   name: T;
   icon: LucideIcon;
}

export const sortingTabs: ISortingTab<SortingTabNameType>[] = [
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

export const tagSortingTabs: ISortingTab<TagSortingTabNameType>[] =
   sortingTabs.filter(
      (tab) => tab.name !== "Closed"
   ) as ISortingTab<TagSortingTabNameType>[];
