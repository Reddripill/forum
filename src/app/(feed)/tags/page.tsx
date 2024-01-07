import React from "react";
import type { Metadata } from "next";
import TagsService from "@/services/tags.service";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Tags",
};

const TagsPage = async () => {
   const tags = await TagsService.getTags();
   return (
      <div className="pt-[22px] pl-[50px] pr-5">
         <div className="max-w-[60%]">
            <div className="text-xl tracking-[0.7px] text-black font-bold mb-[10px]">
               Tags
            </div>
            <p className="inline-block text-base tracking-[0.65px] text-black leading-[25px] w-full mb-8">
               A tag is a keyword or label that categorizes your question with
               other, similar questions. Using the right tags makes it easier
               for others to find and answer your question.
            </p>
         </div>
         <div
            style={{
               display: "grid",
               gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
               gridAutoRows: "auto",
               gap: "20px",
            }}
         >
            {tags.data.map((tag) => (
               <div
                  key={tag.id}
                  className="w-full h-full p-4 bg-white shadow-post rounded-[5px]"
               >
                  <Link
                     href={`tags/${tag.id}`}
                     className="rounded-[5px] bg-label text-gray text-xs tracking-[0.5px] 
                     px-[10px] py-[5px] mb-[10px] inline-block"
                  >
                     {tag.attributes.name}
                  </Link>
                  <p className="w-full mb-[10px] line-clamp-4 overflow-hidden text-ellipsis text-sm tracking-[0.65px] text-black leading-normal font-light">
                     {tag.attributes.description}
                  </p>
                  <div className="text-sm tracking-[0.65px] text-gray">
                     {tag.attributes.posts.data.length} Questions
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default TagsPage;
