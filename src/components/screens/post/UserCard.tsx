import {
   Award,
   Facebook,
   Github,
   Instagram,
   Link as LucideLink,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { IPost } from "@/types/post.types";
import Jdenticon from "@/components/UI/Jdenticon";

const UserCard = ({ post }: { post: IPost }) => {
   return (
      <div
         className="px-5 py-[30px] bg-white shadow-card rounded-[5px] 
            flex flex-col items-center gap-y-5 text-center"
      >
         <Jdenticon value={post.author.username} size={150} />
         <div className="text-black text-lg font-bold tracking-[0.9px] pb-5 last:pb-0 border-b border-label w-full">
            @{post.author.username}
         </div>
         <div className="flex items-center pb-5 last:pb-0 border-b border-label w-full justify-center">
            <Award size={24} className="text-orange mr-2" />
            <div className="text-[22px] text-orange tracking-[0.44px]">
               {post.votes.length}
            </div>
         </div>
         {post.author.links.length > 0 && (
            <div className="flex items-center gap-5">
               {post.author.links.map((item) => {
                  let Icon = LucideLink;
                  if (item.social === "github") {
                     Icon = Github;
                  } else if (item.social === "vk") {
                     Icon = Facebook;
                  }
                  if (item.social === "instagram") {
                     Icon = Instagram;
                  }
                  return (
                     <Link href={item.link} key={item.social}>
                        {
                           <Icon
                              size={20}
                              className="text-gray transition-colors hover:text-orange"
                           />
                        }
                     </Link>
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default UserCard;
