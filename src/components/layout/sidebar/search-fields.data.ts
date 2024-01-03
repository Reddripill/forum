import {
   LucideIcon,
   List,
   Tag,
   Award,
   HelpCircle,
   MessageCircle,
   Heart,
} from "lucide-react";

export interface ISearchField {
   name: string;
   icon: LucideIcon;
   link: string;
}

export interface ISearchFieldCategory {
   title: string;
   data: ISearchField[];
}

export type SearchFieldCategoryType = "general" | "personal";

export const searchFields: Record<
   SearchFieldCategoryType,
   ISearchFieldCategory
> = {
   general: {
      title: "menu",
      data: [
         {
            name: "Questions",
            icon: List,
            link: "/questions",
         },
         {
            name: "Tags",
            icon: Tag,
            link: "/tags",
         },
         {
            name: "Ranking",
            icon: Award,
            link: "/ranking",
         },
      ],
   },
   personal: {
      title: "personal navigator",
      data: [
         {
            name: "Your questions",
            icon: HelpCircle,
            link: "/my-questions",
         },
         {
            name: "Your answers",
            icon: MessageCircle,
            link: "/my-answers",
         },
         {
            name: "Your likes & votes",
            icon: Heart,
            link: "/my-likes",
         },
      ],
   },
};
