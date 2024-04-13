"use client";
import React from "react";
import PostsService from "@/services/posts.service";
import AnswerItem from "./AnswerItem";
import { useQuery } from "@tanstack/react-query";

const Answers = ({ postId }: { postId: number | string }) => {
   const { data: answers } = useQuery({
      queryKey: ["Answers", postId.toString()],
      queryFn: () => PostsService.getAnswersByPostId(postId),
   });
   const rootAnswers = answers?.filter((answer) => !answer.parent);
   return (
      <div className="mb-10">
         <div className="text-black text-xl tracking-[0.9px] leading-[25px] font-medium mb-5">
            Answers
         </div>
         <div>
            {rootAnswers?.map((answer) => (
               <AnswerItem key={answer.id} answer={answer} />
            ))}
         </div>
      </div>
   );
};

export default Answers;
