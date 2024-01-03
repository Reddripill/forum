import { IContent } from "@/types/main.types";

export const createContent = (content: IContent[]) => {
   const parsedContent: IContent[] = [];
   let codeItems: IContent = { children: [], type: "code" };
   for (const item of content) {
      if (item.type !== "code") {
         if (codeItems.children.length !== 0) {
            parsedContent.push({
               children: codeItems.children.slice(0),
               type: codeItems.type,
            });
            codeItems.children.length = 0;
         }
         parsedContent.push(item);
      } else {
         codeItems.children.push(item.children[0]);
      }
   }
   return parsedContent;
};
