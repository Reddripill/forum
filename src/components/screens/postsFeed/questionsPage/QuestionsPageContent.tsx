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
   return (
      <>
         <div className="pt-[22px] pl-[50px]">
            <SortingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {posts && posts.length > 0 && (
               <div>
                  {posts.map((post) => (
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
         <References />
      </>
   );
};

export default QuestionsPageContent;
