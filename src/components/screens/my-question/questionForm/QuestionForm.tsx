"use client";
import React, { useState } from "react";
import styles from "./QuestionForm.module.scss";
import Input from "@/components/UI/input/Input";
import { useValidate } from "@/hooks/validate/useValidate";
import { CheckKeys } from "@/hooks/validate/validate.enum";
import MainButton from "@/components/UI/button/mainButton/MainButton";
import { Image, Send } from "lucide-react";
import PostsService from "@/services/posts.service";
import useAuth from "@/hooks/useAuth";
import { ILoginedUser } from "@/types/auth-user.types";
import Tiptap from "@/components/UI/tiptap/Tiptap";
import { transformToStrapiEditor } from "@/utils/transformRichtext";
import { IContent } from "@/types/editor.types";
import Select from "@/components/UI/select/Select";
import cn from "classnames";
import TagsService from "@/services/tags.service";
import {
   ISelectValue,
   SelectValuesType,
} from "@/components/UI/select/select.types";

const QuestionForm = () => {
   const [tags, setTags] = useState<SelectValuesType>([]);
   const { user } = useAuth();
   const title = useValidate("", [
      {
         checkKey: CheckKeys.MinLength,
         value: 3,
         errorMessage: `Insufficient number of characters`,
      },
   ]);
   const text = useValidate("", [
      {
         checkKey: CheckKeys.MinLength,
         value: 10,
         errorMessage: `Insufficient number of characters`,
      },
   ]);
   const disabled =
      !title.isValid || !text.isValid || !title.isValid || !text.isValid;
   return (
      <div className={styles.wrapper}>
         <div className="mb-8">
            <Select
               placeholder="Choose tags"
               isSearchable={true}
               isMultiple={true}
               classnames={cn(
                  "w-full h-[34px] rounded-[5px] border-2 border-label px-[10px]",
                  styles.item
               )}
               inputHandler={TagsService.getTagsByInput}
               selectedValue={tags}
               setSelectedValue={setTags}
               options={[
                  { id: 1, label: "First" },
                  { id: 2, label: "Second" },
                  { id: 3, label: "Third" },
                  { id: 4, label: "Fourth" },
               ]}
            ></Select>
            <Input
               className={styles.item}
               placeholder="Type catching attention title"
               validate={title}
            />
            <Tiptap text={text.value} onChange={text.setValue} />
         </div>
         <div className="flex items-center justify-between">
            <MainButton color="blue">
               <Image size={14} className="mr-3" />
               <div>Add Image</div>
            </MainButton>
            <div className="flex items-center gap-x-5">
               <MainButton color="gray" disabled={disabled}>
                  Save as draft
               </MainButton>
               <MainButton
                  color="orange"
                  disabled={disabled}
                  onClick={() => {
                     PostsService.createPost({
                        author: user as ILoginedUser,
                        title: title.value,
                        content: transformToStrapiEditor(
                           text.value
                        ) as IContent[],
                        tags: tags
                           ? (tags as ISelectValue[]).map((item) =>
                                item.id.toString()
                             )
                           : undefined,
                        // change
                     });
                  }}
               >
                  <Send size={14} className="mr-3" />
                  <div>Publish</div>
               </MainButton>
            </div>
         </div>
      </div>
   );
};

export default QuestionForm;
