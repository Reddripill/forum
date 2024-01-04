import { IAttribute } from "@/types/main.types";
import { IAuthor } from "@/types/post.types";
import { MoreVertical } from "lucide-react";
import React from "react";

const PostHeader = ({
   author,
   isMini,
}: {
   author: IAttribute<IAuthor>;
   isMini?: boolean;
}) => {
   return (
      <div className="flex justify-between items-center">
         <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray mr-[15px]"></div>
            <div>
               <div className="text-sm tracking-[0.65px] text-black font-bold">
                  @{author.attributes.username}
               </div>
               <div className="text-xs tracking-[0.5px] text-gray">
                  5 min ago
               </div>
            </div>
         </div>
         <button>
            <MoreVertical className="text-gray" />
         </button>
      </div>
   );
};

export default PostHeader;
