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
   editor: Editor | null;
   classname: string;
}) => {
   if (!editor) {
      return null;
   }
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
         >
            <Italic
               className={styles.icon}
               onClick={() => editor.chain().focus().toggleItalic().run()}
               size={16}
            />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("underline"),
            })}
         >
            <Underline
               className={styles.icon}
               onClick={() => editor.chain().focus().toggleUnderline().run()}
               size={16}
            />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("strike"),
            })}
         >
            <Strikethrough
               className={styles.icon}
               onClick={() => editor.chain().focus().toggleStrike().run()}
               size={16}
            />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("code"),
            })}
         >
            <Code
               className={styles.icon}
               onClick={() => editor.chain().focus().toggleCode().run()}
               size={16}
            />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("link"),
            })}
         >
            <Link
               className={styles.icon}
               onClick={() =>
                  editor.chain().focus().toggleLink({ href: "" }).run()
               }
               size={16}
            />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("bulletList"),
            })}
         >
            <List
               className={styles.icon}
               onClick={() => editor.chain().focus().toggleBulletList().run()}
               size={16}
            />
         </button>
         <button
            className={cn(styles.mark, {
               [styles._active]: editor.isActive("orderedList"),
            })}
         >
            <ListOrdered
               className={styles.icon}
               onClick={() => editor.chain().focus().toggleOrderedList().run()}
               size={16}
            />
         </button>
      </div>
   );
};

export default TiptapToolbar;
