import { IContent } from "@/types/editor.types";
import { createContent } from "@/utils/createContent";
import React from "react";
import styles from "./PostContent.module.scss";
import cn from "classnames";

const PostContent = ({
   content,
   user,
}: {
   content: IContent[];
   user?: string;
}) => {
   const parsedContent = createContent(content);
   return (
      <div className={styles.wrapper}>
         {parsedContent.map((item, index) => {
            let metadata: Partial<Record<string, boolean>> = {};
            for (const [key, value] of Object.entries(item.children[0])) {
               if (typeof value === "boolean" && value === true) {
                  metadata[key] = value;
               }
            }
            if (item.type === "code") {
               return (
                  <div key={item.children[0].text}>
                     {user && index === 0 && <span>@{user}, </span>}
                     <pre className={styles["code-field"]}>
                        <code>
                           {item.children.map((codeItem, index) => (
                              <div
                                 key={codeItem.text + index}
                                 className={styles["code-line"]}
                              >
                                 <div className={styles["line-number"]}>
                                    {index + 1}
                                 </div>
                                 <div className={styles["code-text"]}>
                                    {codeItem.text}
                                 </div>
                              </div>
                           ))}
                        </code>
                     </pre>
                  </div>
               );
            } else if (item.type === "heading") {
               return (
                  <div key={item.children[0].text}>
                     <h1 className={cn(styles.text, metadata)}>
                        {item.children[0].text}
                     </h1>
                  </div>
               );
            } else {
               return (
                  <div key={item.children[0].text}>
                     {user && index === 0 ? (
                        <div className={styles.text}>
                           {user && index === 0 && <span>@{user}, </span>}
                           <p>{item.children[0].text}</p>
                        </div>
                     ) : (
                        <p className={cn(styles.text, metadata)}>
                           {item.children[0].text}
                        </p>
                     )}
                  </div>
               );
            }
         })}
      </div>
   );
};

export default PostContent;
