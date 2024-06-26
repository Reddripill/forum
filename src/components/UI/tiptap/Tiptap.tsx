"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TiptapToolbar from "./TiptapToolbar";
import { SetStateType } from "@/types/main.types";
import cn from "classnames";

export const extensions = [StarterKit, Underline, Link];

const Tiptap = ({
   text,
   onChange,
   classname,
}: {
   text: string;
   onChange: SetStateType<string>;
   classname?: string;
}) => {
   const [isFocus, setIsFocus] = useState(false);
   const editor = useEditor({
      extensions,
      content: text,
      editorProps: {
         attributes: {
            class: `h-[350px] p-[10px] transition-colors duration-300`,
         },
      },
      onUpdate: ({ editor }) => {
         onChange(editor.getHTML());
      },
      onFocus() {
         setIsFocus(true);
      },
      onBlur() {
         setIsFocus(false);
      },
   });
   if (!editor) {
      return null;
   }
   return (
      <div
         className={cn(
            "border-2 border-label rounded-[5px] overflow-auto text-sm transition-colors duration-300 outline-none",
            classname,
            { "border-orange": isFocus }
         )}
      >
         <TiptapToolbar
            classname="border-b-[1px] border-label"
            editor={editor}
         />
         <EditorContent editor={editor} />
      </div>
   );
};

export default Tiptap;
