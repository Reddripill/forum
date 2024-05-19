import { type Editor } from "@tiptap/react";
import {
   Bold,
   Code,
   Italic,
   Link,
   List,
   ListOrdered,
   Strikethrough,
   Underline,
} from "lucide-react";
import React from "react";
import styles from "./Tiptap.module.scss";
import cn from "classnames";

const TiptapToolbar = ({
   editor,
   classname,
}: {
   editor: Editor;
   classname: string;
}) => {
   return (
      <div className={cn(styles.wrapper, classname ? classname : "")}>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("bold"),
            })}
            onClick={() => editor.chain().focus().toggleBold().run()}
         >
            <Bold className={styles.icon} size={16} />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("italic"),
            })}
            onClick={() => editor.chain().focus().toggleItalic().run()}
         >
            <Italic className={styles.icon} size={16} />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("underline"),
            })}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
         >
            <Underline className={styles.icon} size={16} />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("strike"),
            })}
            onClick={() => editor.chain().focus().toggleStrike().run()}
         >
            <Strikethrough className={styles.icon} size={16} />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("code"),
            })}
            onClick={() => editor.chain().focus().toggleCode().run()}
         >
            <Code className={styles.icon} size={16} />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("link"),
            })}
            onClick={() =>
               editor.chain().focus().toggleLink({ href: "" }).run()
            }
         >
            <Link className={styles.icon} size={16} />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("bulletList"),
            })}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
         >
            <List className={styles.icon} size={16} />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("orderedList"),
            })}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
         >
            <ListOrdered className={styles.icon} size={16} />
         </button>
      </div>
   );
};

export default TiptapToolbar;
