"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SortingTabs from "../sortingTabs/SortingTabs";
import { SortingTabNameType } from "../sortingTabs/sortingTabs.data";
import References from "../references/References";
import PostsService from "@/services/posts.service";
import Question from "../Question";

const QuestionsPageContent = () => {
   const [activeTab, setActiveTab] = useState<SortingTabNameType>("New");
   const { data: posts } = useQuery({
      queryKey: ["Posts"],
      queryFn: PostsService.getPosts,
   });
   console.log(posts);
   return (
      <>
         <div className="pt-[22px] pl-[50px]">
            <SortingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {posts?.data && posts.data.length > 0 && (
               <div>
                  {posts.data.map((post) => (
                     <Question
                        key={post.id}
                        post={post}
                        preview={true}
                        classname="mb-6"
                     />
                  ))}
               </div>
            )}
         </div>
         <div className="pt-10 px-[35px]">
            <References />
         </div>
      </>
   );
};

export default QuestionsPageContent;
