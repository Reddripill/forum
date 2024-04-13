"use client";
import React from "react";
import UserCard from "@/components/screens/post/UserCard";
import Answers from "@/components/screens/post/answers/Answers";
import Question from "@/components/screens/postsFeed/Question";
import PostsService from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";

const PostPage = ({ params }: { params: { id: string } }) => {
   const { data: post } = useQuery({
      queryKey: ["Posts", params.id],
      queryFn: () => PostsService.getPostById(params.id),
   });
   if (!post) return null;
   return (
      <>
         <div className="pt-12 pl-[50px]">
            <div className="mb-5">
               <Question post={post} />
            </div>
            {post.answers && post.answers.length > 0 && (
               <Answers postId={post.id} />
            )}
         </div>
         <div className="pt-12 px-[35px]">
            <UserCard post={post} />
         </div>
      </>
   );
};

export default PostPage;
