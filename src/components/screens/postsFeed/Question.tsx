// "use client";
import React from "react";
import Link from "next/link";
import { IAttribute } from "@/types/main.types";
import { IPost } from "@/types/post.types";
import { ArrowUp, Eye, MessageSquare, MoreVertical } from "lucide-react";
import PostHeader from "@/components/UI/postHeader/PostHeader";
import PostContent from "../post/postContent/PostContent";
import MainButton from "@/components/UI/button/mainButton/MainButton";

interface IProps {
   post: IAttribute<IPost>;
   preview?: boolean;
   classname?: string;
}

const Question = ({ post, classname, preview }: IProps) => {
   const firstParagraph = post.attributes.content.find(
      (text) => text.type === "paragraph"
   );
   // console.log("Question content: ", post.attributes.content);
   return (
      <div
         className={`py-[25px] px-[30px] bg-white shadow-post rounded-[5px]
         w-full ${classname}`}
      >
         <PostHeader author={post.attributes.author.data} />
         {preview ? (
            <Link
               href={`questions/${post.id}`}
               className="inline-block w-full my-[15px]"
            >
               <div className="text-sm tracking-[0.7px] text-black font-bold mb-[10px]">
                  {post.attributes.title}
               </div>
               <div className="text-sm tracking-[0.65px] text-black leading-[25px] w-full font-light truncate">
                  {firstParagraph && firstParagraph.children[0].text}
               </div>
            </Link>
         ) : (
            <div className="my-5 w-full">
               <div className="text-lg text-black font-bold mb-[10px]">
                  {post.attributes.title}
               </div>
               <PostContent content={post.attributes.content} />
            </div>
         )}
         <div className="flex justify-between items-center">
            <div className="flex items-center">
               {post.attributes.tags.data.map((tag) => (
                  <Link
                     href={`tags/${tag.id}`}
                     key={tag.id}
                     className="rounded-[5px] bg-label text-gray text-xs tracking-[0.5px] 
                     px-[10px] py-[5px] mr-[10px] last:mr-0"
                  >
                     {tag.attributes.name}
                  </Link>
               ))}
            </div>
            {preview ? (
               <div className="flex items-center">
                  <div className="flex items-center mr-[15px]">
                     <Eye size={15} className="text-gray mr-1" />
                     <div className="text-gray text-xs tracking-[0.4px]">
                        {post.attributes.views}
                     </div>
                  </div>
                  <div className="flex items-center mr-[15px]">
                     <MessageSquare size={15} className="text-gray mr-1" />
                     <div className="text-gray text-xs tracking-[0.4px]">
                        125
                     </div>
                  </div>
                  <div className="flex items-center">
                     <ArrowUp size={15} className="text-gray mr-1" />
                     <div className="text-gray text-xs tracking-[0.4px]">
                        155
                     </div>
                  </div>
               </div>
            ) : (
               <div>
                  <MainButton color="blue" className="gap-2">
                     <ArrowUp size={14} strokeWidth={3} />
                     <div>Vote</div>
                  </MainButton>
               </div>
            )}
         </div>
      </div>
   );
};

export default Question;
