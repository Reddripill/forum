import React from "react";
import PostsService from "@/services/posts.service";
import AnswerItem from "./AnswerItem";

const Answers = async ({ postId }: { postId: number | string }) => {
   const postWithAnswers = await PostsService.getAnswersByPostId(postId);
   const answers = postWithAnswers.data;
   return (
      <div className="mb-10">
         <div className="text-black text-xl tracking-[0.9px] leading-[25px] font-medium mb-5">
            Answers
         </div>
         <div>
            {answers.attributes.answers?.data.map((answer) => (
               <AnswerItem key={answer.id} answer={answer} />
            ))}
         </div>
      </div>
   );
};

export default Answers;
