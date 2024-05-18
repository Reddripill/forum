"use client";
import React, { useEffect } from "react";
import UserCard from "@/components/screens/post/UserCard";
import Answers from "@/components/screens/post/answers/Answers";
import Question from "@/components/screens/postsFeed/Question";
import PostsService from "@/services/posts.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { IPost } from "@/types/post.types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useValidate } from "@/hooks/validate/useValidate";
import { CheckKeys } from "@/hooks/validate/validate.enum";
import Tiptap from "@/components/UI/tiptap/Tiptap";
import MainButton from "@/components/UI/button/mainButton/MainButton";
import { transformToStrapiEditor } from "@/utils/transformRichtext";
import { IContent } from "@/types/editor.types";

const PostPage = ({ params }: { params: { id: string } }) => {
   const queryClient = useQueryClient();
   const breakpoint = useMediaQuery(1280);
   const { user } = useAuth();
   const text = useValidate("", [
      {
         checkKey: CheckKeys.MinLength,
         value: 10,
         errorMessage: `Insufficient number of characters`,
      },
   ]);
   const { data: post } = useQuery({
      queryKey: ["Posts", params.id],
      queryFn: () => PostsService.getPostById(params.id),
   });
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
   const { mutate: createAnswer } = useMutation<
      void,
      Error,
      { postId: string; userId: string }
   >({
      mutationFn: ({ userId, postId }) =>
         PostsService.createAnswer({
            text: transformToStrapiEditor(text.value) as IContent[],
            authorId: userId,
            postId: postId,
         }),
      onSuccess: (_, { postId }) => {
         queryClient.invalidateQueries({
            queryKey: ["Answers", postId.toString()],
         });
      },
   });
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
            <div className="mb-10">
               <Question post={post} />
            </div>
            <div className="mb-5">
               {post.answers && post.answers.length > 0 && (
                  <div>
                     <div className="text-black text-xl tracking-[0.9px] leading-[25px] font-medium mb-5">
                        Answers
                     </div>
                     <div className="mb-10">
                        <Answers postId={post.id} />
                     </div>
                  </div>
               )}
               <div>
                  <div className="text-black text-lg tracking-[0.9px] leading-[25px] mb-5">
                     Your Answer
                  </div>
                  <Tiptap
                     text={text.value}
                     onChange={text.setValue}
                     classname="mb-4"
                  />
                  <MainButton
                     color="orange"
                     className="ml-auto"
                     onClick={() => {
                        if (user) {
                           createAnswer({ postId: post.id, userId: user.id });
                        }
                     }}
                  >
                     Submit
                  </MainButton>
               </div>
            </div>
         </div>
         {!breakpoint && (
            <div className="pt-12 xl:px-[35px] max-xl:mr-auto min-w-[350px]">
               <UserCard post={post} />
            </div>
         )}
      </>
   );
};

export default PostPage;
