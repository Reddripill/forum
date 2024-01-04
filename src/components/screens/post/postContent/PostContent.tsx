import { IContent } from "@/types/main.types";
import { createContent } from "@/utils/createContent";
import React from "react";
import styles from "./PostContent.module.scss";

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
            if (item.type === "code") {
               return (
                  <pre key={item.type + index} className={styles["code-field"]}>
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
               );
            } else {
               return (
                  <p key={item.type + index} className={styles.text}>
                     {user && index === 0 && <span>@{user}, </span>}
                     {item.children[0].text}
                  </p>
               );
            }
         })}
      </div>
   );
};

export default PostContent;
