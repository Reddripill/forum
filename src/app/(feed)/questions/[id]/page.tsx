import React from "react";
import UserCard from "@/components/screens/post/UserCard";
import Answers from "@/components/screens/post/answers/Answers";
import Question from "@/components/screens/postsFeed/Question";
import PostsService from "@/services/posts.service";

const PostPage = async ({ params }: { params: { id: string } }) => {
   const post = await PostsService.getPostById(params.id);
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
            <UserCard user={post.author} />
         </div>
      </>
   );
};

export default PostPage;
