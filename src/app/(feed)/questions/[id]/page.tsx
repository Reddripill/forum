"use client";
import React, { useEffect } from "react";
import UserCard from "@/components/screens/post/UserCard";
import Answers from "@/components/screens/post/answers/Answers";
import Question from "@/components/screens/postsFeed/Question";
import PostsService from "@/services/posts.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { IPost } from "@/types/post.types";

const PostPage = ({ params }: { params: { id: string } }) => {
   const queryClient = useQueryClient();
   const { data: post } = useQuery({
      queryKey: ["Posts", params.id],
      queryFn: () => PostsService.getPostById(params.id),
   });
   const { user } = useAuth();
   const { mutate } = useMutation<void, Error, { post: IPost; userId: string }>(
      {
         mutationFn: ({ post, userId }) =>
            PostsService.countViews(post, userId),
         onSuccess: () => {
            queryClient.invalidateQueries({
               queryKey: ["Posts"],
            });
         },
      }
   );
   useEffect(() => {
      if (user && post) {
         if (!post.views || !post.views.includes(user.id)) {
            mutate({ post, userId: user.id });
         }
      }
   }, [user, post, mutate]);
   if (!post) return null;
   return (
      <>
         <div className="pt-12 xl:pl-[50px]">
            <div className="mb-5">
               <Question post={post} />
            </div>
            <div className="mb-10">
               <div className="text-black text-xl tracking-[0.9px] leading-[25px] font-medium mb-5">
                  Answers
               </div>
               {post.answers && post.answers.length > 0 && (
                  <Answers postId={post.id} />
               )}
            </div>
         </div>
         <div className="pt-12 xl:px-[35px] max-xl:mr-auto min-w-[350px]">
            <UserCard post={post} />
         </div>
      </>
   );
};

export default PostPage;
