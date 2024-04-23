import React from "react";
import { referencePosts } from "./references.data";
import Link from "next/link";

const References = () => {
   if (referencePosts.length === 0) return null;
   return (
      <div className="xl:pt-10 xl:px-[35px] min-w-[200px]">
         <div className="px-5 py-[30px] bg-white shadow-card rounded-[5px]">
            {referencePosts.map((group) => (
               <div key={group.title.name} className="mb-10 last:mb-0">
                  <div className="flex items-center pb-3 border-b border-border mb-[10px]">
                     <group.title.icon size={18} />
                     <div className="ml-[6px] tracking-[0.65px] text-sm text-black">
                        {group.title.name}
                     </div>
                  </div>
                  <div>
                     {group.posts.map((post) => (
                        <div
                           key={post.postName}
                           className="mb-[10px] last:mb-0 flex relative"
                        >
                           <div className="absolute top-[6px] left-[6px] bg-blue rounded-full w-1 h-1" />
                           <Link
                              href={post.link}
                              className="inline-block pl-[17px] tracking-[0.33px] leading-[17px] text-blue text-xs hover:underline"
                           >
                              {post.postName}
                           </Link>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default References;
