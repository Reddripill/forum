"use client";
import { IContent } from "@/types/main.types";
import { createContent } from "@/utils/createContent";
import React from "react";

const PostContent = ({ content }: { content: IContent[] }) => {
   const parsedContent = createContent(content);
   return (
      <div className="flex flex-col gap-y-5">
         {parsedContent.map((item, index) => {
            if (item.type === "code") {
               return (
                  <pre
                     key={item.type + index}
                     className="bg-label py-[10px] px-4"
                  >
                     <code>
                        {item.children.map((codeItem, index) => (
                           <div
                              key={codeItem.text + index}
                              className="flex items-center mb-1"
                           >
                              <div className="pr-4 text-sm leading-[18px] text-line tracking-[0.28px]">
                                 {index + 1}
                              </div>
                              <div className="pr-4 text-sm leading-[18px] text-black tracking-[0.28px]">
                                 {codeItem.text}
                              </div>
                           </div>
                        ))}
                     </code>
                  </pre>
               );
            } else {
               return (
                  <p
                     key={item.type + index}
                     className="text-sm text-black leading-[25px]"
                  >
                     {item.children[0].text}
                  </p>
               );
            }
         })}
      </div>
   );
};

export default PostContent;
