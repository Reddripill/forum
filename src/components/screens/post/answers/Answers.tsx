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
      <div>
         {rootAnswers?.map((answer) => (
            <AnswerItem key={answer.id} answer={answer} />
         ))}
      </div>
   );
};

export default Answers;
