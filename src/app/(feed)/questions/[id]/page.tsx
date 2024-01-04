import UserCard from "@/components/screens/post/UserCard";
import Answers from "@/components/screens/post/answers/Answers";
import Question from "@/components/screens/postsFeed/Question";
import PostsService from "@/services/posts.service";
import React from "react";

const PostPage = async ({ params }: { params: { id: string } }) => {
   const post = await PostsService.getPostById(params.id);
   return (
      <>
         <div className="pt-[22px] pl-[50px]">
            <div className="mb-5">
               <Question post={post.data} />
            </div>
            {post.data.attributes.answers &&
               post.data.attributes.answers.data.length > 0 && (
                  <Answers postId={post.data.id} />
               )}
         </div>
         <div className="pt-[22px] px-[35px]">
            <UserCard user={post.data.attributes.author} />
         </div>
      </>
   );
};

export default PostPage;
