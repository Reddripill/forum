"use client";
import React from "react";
import { useEditor, EditorContent, Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TiptapToolbar from "./TiptapToolbar";
import { SetStateType } from "@/types/main.types";

export const extensions = [StarterKit, Underline, Link];

const Tiptap = ({
   text,
   onChange,
}: {
   text: string;
   onChange: SetStateType<string>;
}) => {
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
         console.log("value as json: ", editor.getJSON());
      },
   });
   return (
      <div className="border-2 border-label rounded-[5px] overflow-auto text-sm">
         <TiptapToolbar
            classname="border-b-[1px] border-label"
            editor={editor}
         />
         <EditorContent editor={editor} />
      </div>
   );
};

export default Tiptap;
