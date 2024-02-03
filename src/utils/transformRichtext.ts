import { extensions } from "@/components/UI/tiptap/Tiptap";
import { IContent, JSONContentItem } from "@/types/editor.types";
import { generateJSON } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";

export const transformToStrapiEditor = (html: string) => {
   const { content }: JSONContentItem = generateJSON(html, extensions);
   if (content) {
      const newContent: IContent[] = content.map((item) => ({
         children: (item.content as JSONContentItem[]).map((childItem) => {
            const marks = childItem.marks?.map((mark) => mark.type);
            return {
               text: childItem.text as string,
               type: childItem.type as string,
               bold: marks && marks.includes("bold"),
               italic: marks && marks.includes("italic"),
               underline: marks && marks.includes("underline"),
               strikethrough: marks && marks.includes("strike"),
               code: marks && marks.includes("code"),
            };
         }),
         type: item.type as string,
      }));
      return newContent;
   }
   return null;
};
export const transformToTiptapEditor = (content: IContent[]) => {
   const newContent: JSONContent = {
      type: "doc",
      content: content.map((item) => ({
         type: item.type,
         content: item.children.map((childItem) => ({
            type: childItem.type,
            text: childItem.text,
            // marks: childItem.
         })),
      })),
   };
   /* const newContent: IContent[] = content.map((item) => ({
         children: (item.content as JSONContentItem[]).map((childItem) => {
            const marks = childItem.marks?.map((mark) => mark.type);
            return {
               text: childItem.text as string,
               type: childItem.type as string,
               bold: marks && marks.includes("bold"),
               italic: marks && marks.includes("italic"),
               underline: marks && marks.includes("underline"),
               strikethrough: marks && marks.includes("strike"),
               code: marks && marks.includes("code"),
            };
         }),
         type: item.type as string,
      }));
      return newContent; */
   return null;
};
