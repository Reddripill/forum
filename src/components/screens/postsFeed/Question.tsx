"use client";
import React from "react";
import Link from "next/link";
import { IPost } from "@/types/post.types";
import { ArrowUp, Eye, MessageSquare } from "lucide-react";
import PostHeader from "@/components/UI/postHeader/PostHeader";
import PostContent from "../post/postContent/PostContent";
import MainButton from "@/components/UI/button/mainButton/MainButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostsService from "@/services/posts.service";
import useAuth from "@/hooks/useAuth";
import cn from "classnames";

interface IProps {
   post: IPost;
   preview?: boolean;
   classname?: string;
}

const Question = ({ post, classname, preview }: IProps) => {
   const queryClient = useQueryClient();
   const { user, isLoggedIn } = useAuth();
   const { mutate } = useMutation({
      mutationFn: () => PostsService.changeVote(post, user?.id),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["Posts"],
         });
         queryClient.invalidateQueries({
            queryKey: ["Posts", post.id.toString()],
         });
      },
   });
   const firstParagraph = post.content.find(
      (text) => text.type === "paragraph"
   );
   return (
      <div
         className={`lg:py-[25px] lg:px-[30px] p-4 bg-white shadow-post rounded-[5px]
         w-full ${classname}`}
      >
         <PostHeader author={post.author} date={post.createdAt} />
         {preview ? (
            <Link
               href={`questions/${post.id}`}
               className="inline-block w-full my-[15px]"
            >
               <div className="text-sm tracking-[0.7px] text-black font-bold mb-[10px]">
                  {post.title}
               </div>
               <div className="text-sm tracking-[0.65px] text-black leading-[25px] w-full font-light truncate">
                  {firstParagraph && firstParagraph.children[0].text}
               </div>
            </Link>
         ) : (
            <div className="my-5 w-full">
               <div className="text-lg text-black font-bold mb-[10px]">
                  {post.title}
               </div>
               <PostContent content={post.content} />
            </div>
         )}
         <div className="flex justify-between items-center">
            <div className="flex items-center">
               {post.tags.length > 0 &&
                  post.tags.map((tag) => (
                     <Link
                        href={`tags/${tag.id}`}
                        key={tag.id}
                        className="rounded-[5px] bg-label text-gray text-xs tracking-[0.5px] 
                     px-[10px] py-[5px] mr-[10px] last:mr-0"
                     >
                        {tag.name}
                     </Link>
                  ))}
            </div>
            {preview ? (
               <div className="flex items-center">
                  <div className="flex items-center mr-[15px]">
                     <Eye size={15} className="text-gray mr-1" />
                     <div className="text-gray text-xs tracking-[0.4px]">
                        {!post.views ? 0 : post.views.length}
                     </div>
                  </div>
                  <div className="flex items-center mr-[15px]">
                     <MessageSquare size={15} className="text-gray mr-1" />
                     <div className="text-gray text-xs tracking-[0.4px]">
                        {post.answers?.length ?? 0}
                     </div>
                  </div>
                  <div className="flex items-center">
                     <ArrowUp size={15} className="text-gray mr-1" />
                     <div className="text-gray text-xs tracking-[0.4px]">
                        {post.votes.length}
                     </div>
                  </div>
               </div>
            ) : (
               <>
                  {isLoggedIn && user && (
                     <div onClick={() => mutate()}>
                        <MainButton color="blue" className="gap-2">
                           <ArrowUp
                              size={14}
                              strokeWidth={3}
                              className={cn({
                                 "rotate-180": post.votes.find(
                                    (vote) => vote.id === user.id
                                 ),
                              })}
                           />
                           <div>
                              {post.votes.find((vote) => vote.id === user.id)
                                 ? "Unvote"
                                 : "Vote"}
                           </div>
                        </MainButton>
                     </div>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default Question;
