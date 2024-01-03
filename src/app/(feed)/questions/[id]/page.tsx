import UserCard from "@/components/screens/post/UserCard";
import Question from "@/components/screens/postsFeed/Question";
import PostsService from "@/services/posts.service";
import React from "react";

const PostPage = async ({ params }: { params: { id: string } }) => {
   const post = await PostsService.getPostById(params.id);
   return (
      <>
         <div className="pt-[22px] pl-[50px]">
            <Question post={post.data} />
         </div>
         <div className="pt-[22px] px-[35px]">
            <UserCard user={post.data.attributes.author} />
         </div>
      </>
   );
};

export default PostPage;
