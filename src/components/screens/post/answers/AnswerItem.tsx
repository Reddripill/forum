"use client";
import PostHeader from "@/components/UI/postHeader/PostHeader";
import { IAttribute } from "@/types/main.types";
import { IAnswer } from "@/types/post.types";
import React from "react";
import PostContent from "../postContent/PostContent";
import styles from "./Answers.module.scss";
import cn from "classnames";
import {
   ChevronsUp,
   CornerDownRight,
   ThumbsDown,
   ThumbsUp,
} from "lucide-react";

const AnswerItem = ({ answer }: { answer: IAttribute<IAnswer> }) => {
   return (
      <div
         className={cn(styles.wrapper, {
            [styles.reply]: answer.attributes.parent?.data,
         })}
      >
         <div className={styles.container}>
            <div className={styles.decoration}></div>
            <div className={styles.main}>
               {!answer.attributes.parent.data && (
                  <PostHeader author={answer.attributes.author.data} />
               )}
               <div className={styles["content-block"]}>
                  <PostContent
                     content={answer.attributes.content}
                     user={
                        answer.attributes.parent.data
                           ? answer.attributes.parent.data.attributes.author
                                .data.attributes.username
                           : answer.attributes.post.data.attributes.author.data
                                .attributes.username
                     }
                  />
               </div>
               {!answer.attributes.parent?.data ? (
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-5">
                        <button className="flex items-center gap-[5px]">
                           <ThumbsUp size={14} className="text-gray" />
                           <div className="text-xs text-gray font-light tracking-[0.24px]">
                              0
                           </div>
                        </button>
                        <button className="flex items-center gap-[5px]">
                           <ThumbsDown size={14} className="text-gray" />
                           <div className="text-xs text-gray font-light tracking-[0.24px]">
                              0
                           </div>
                        </button>
                     </div>
                     <div className="flex items-center gap-5">
                        {answer.attributes.replies.data.length > 0 && (
                           <button className="flex items-center gap-[5px]">
                              <ChevronsUp size={14} className="text-blue" />
                              <div className="text-xs text-blue font-light tracking-[0.24px]">
                                 Hide All Replies (
                                 {answer.attributes.replies.data.length})
                              </div>
                           </button>
                        )}
                        <button className="flex items-center gap-[5px]">
                           <CornerDownRight size={14} className="text-blue" />
                           <div className="text-xs text-blue font-light tracking-[0.24px]">
                              Reply
                           </div>
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className="flex items-center justify-between">
                     <div className="text-xs text-gray font-medium tracking-[0.65px]">
                        by @{answer.attributes.author.data.attributes.username}
                     </div>
                     <button className="flex items-center gap-[5px]">
                        <CornerDownRight size={14} className="text-blue" />
                        <div className="text-xs text-blue font-light tracking-[0.24px]">
                           Reply
                        </div>
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AnswerItem;
