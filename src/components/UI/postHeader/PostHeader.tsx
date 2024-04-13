import React from "react";
import { IAuthor } from "@/types/user.types";
// import { MoreVertical } from "lucide-react";
import { formatDistance } from "date-fns";
import Jdenticon from "../Jdenticon";

const PostHeader = ({
   author,
   isMini,
   date,
}: {
   author: IAuthor;
   isMini?: boolean;
   date: string;
}) => {
   const dateDistance = formatDistance(date, new Date());
   return (
      <div>
         <div className="flex items-center">
            <Jdenticon
               value={author.username}
               size={40}
               className="mr-[15px]"
            />
            <div>
               <div className="text-sm tracking-[0.65px] text-black font-bold">
                  {author.username}
               </div>
               <div className="text-xs tracking-[0.5px] text-gray">
                  {dateDistance} ago
               </div>
            </div>
         </div>
         {/* <button>
            <MoreVertical className="text-gray" />
         </button> */}
      </div>
   );
};

export default PostHeader;
