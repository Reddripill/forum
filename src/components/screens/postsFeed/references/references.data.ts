import { Link, LucideIcon, Star } from "lucide-react";

export interface IReferencePost {
   postName: string;
   link: string;
}

export interface IReferences {
   title: {
      name: string;
      icon: LucideIcon;
   };
   posts: IReferencePost[];
}

export const referencePosts: IReferences[] = [
   {
      title: {
         name: "Must-read posts",
         icon: Star,
      },
      posts: [
         {
            postName:
               "Please read rules before you start working on a platform",
            link: "/",
         },
         {
            postName: "Vision & Strategy of Alemhelp",
            link: "/",
         },
      ],
   },
   {
      title: {
         name: "Featured links",
         icon: Link,
      },
      posts: [
         {
            postName: "Alemhelp source-code on GitHub",
            link: "/",
         },
         {
            postName: "Golang best-practices",
            link: "/",
         },
         {
            postName: "Alem.School dashboard",
            link: "/",
         },
      ],
   },
];
