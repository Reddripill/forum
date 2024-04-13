"use client";
import React, { useState } from "react";
import PostHeader from "@/components/UI/postHeader/PostHeader";
import { IAnswer } from "@/types/post.types";
import PostContent from "../postContent/PostContent";
import styles from "./Answers.module.scss";
import cn from "classnames";
import {
   ChevronsUp,
   CornerDownRight,
   ThumbsDown,
   ThumbsUp,
} from "lucide-react";
import PostsService from "@/services/posts.service";
import Tiptap from "@/components/UI/tiptap/Tiptap";
import MainButton from "@/components/UI/button/mainButton/MainButton";

const AnswerItem = ({ answer }: { answer: IAnswer }) => {
   const [isOpen, setIsOpen] = useState(!answer.parent ? true : false);
   const [isReplyFieldOpen, setIsReplyFieldOpen] = useState(false);
   const [richText, setRichText] = useState("");
   const [replies, setReplies] = useState<IAnswer[] | null>(
      !answer.parent && answer.replies ? answer.replies : null
   );
   const getReplies = async () => {
      if (!replies) {
         const repliesRes = await PostsService.getRepliesByAnswerId(answer.id);
         setReplies(repliesRes);
         setIsOpen(true);
      } else {
         setIsOpen(!isOpen);
      }
   };
   console.log("richtext: ", richText);
   if (!answer.author) return null;
   return (
      <div className="mb-5">
         <div
            className={cn(styles.wrapper, {
               [styles.reply]: answer.parent,
            })}
         >
            <div className={styles.container}>
               <div className={styles.decoration}></div>
               <div className={styles.main}>
                  {!answer.parent && (
                     <PostHeader
                        author={answer.author}
                        date={answer.author.createdAt}
                     />
                  )}
                  <div className={styles["content-block"]}>
                     <PostContent
                        content={answer.content}
                        user={
                           answer.parent
                              ? answer.parent.author.username
                              : answer.post.author.username
                        }
                     />
                  </div>
                  {!answer.parent ? (
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
                           {answer.replies.length > 0 && (
                              <button
                                 className="flex items-center gap-[5px]"
                                 onClick={() => setIsOpen(!isOpen)}
                              >
                                 <ChevronsUp
                                    size={14}
                                    className={cn(styles["open-icon"], {
                                       [styles._hide]: !isOpen,
                                    })}
                                 />
                                 <div className="text-xs text-blue font-light tracking-[0.24px]">
                                    {isOpen ? "Hide" : "Show"} All Replies (
                                    {answer.replies.length})
                                 </div>
                              </button>
                           )}
                           <button
                              className="flex items-center gap-[5px]"
                              onClick={() =>
                                 setIsReplyFieldOpen(!isReplyFieldOpen)
                              }
                           >
                              <CornerDownRight
                                 size={14}
                                 className="text-blue"
                              />
                              <div className="text-xs text-blue font-light tracking-[0.24px]">
                                 Reply
                              </div>
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="flex items-center justify-between">
                        <div className="text-xs text-gray font-medium tracking-[0.65px]">
                           by @{answer.author.username}
                        </div>
                        <div className="flex items-center gap-5">
                           {answer.replies.length > 0 && (
                              <button
                                 className="flex items-center gap-[5px]"
                                 onClick={getReplies}
                              >
                                 <ChevronsUp
                                    size={14}
                                    className={cn(styles["open-icon"], {
                                       [styles._hide]: !isOpen,
                                    })}
                                 />
                                 <div className="text-xs text-blue font-light tracking-[0.24px]">
                                    <div className="text-xs text-blue font-light tracking-[0.24px]">
                                       {isOpen ? "Hide" : "Show"} All Replies (
                                       {answer.replies.length})
                                    </div>
                                 </div>
                              </button>
                           )}
                           <button
                              className="flex items-center gap-[5px]"
                              onClick={() =>
                                 setIsReplyFieldOpen(!isReplyFieldOpen)
                              }
                           >
                              <CornerDownRight
                                 size={14}
                                 className="text-blue"
                              />
                              <div className="text-xs text-blue font-light tracking-[0.24px]">
                                 Reply
                              </div>
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
         {isReplyFieldOpen && (
            <div className="mb-5 flex flex-col items-end">
               <Tiptap
                  text={richText}
                  onChange={setRichText}
                  classname="mb-5 bg-white w-full"
               />
               <MainButton color="orange">Post your answer</MainButton>
            </div>
         )}
         {replies && isOpen && (
            <div>
               {replies.map((reply) => (
                  <AnswerItem key={reply.id} answer={reply} />
               ))}
            </div>
         )}
      </div>
   );
};

export default AnswerItem;
