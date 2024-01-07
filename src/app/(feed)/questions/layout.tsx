import React from "react";

const QuestionLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div
         style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,2.5fr) 1fr",
            height: "100%",
         }}
      >
         {children}
      </div>
   );
};

export default QuestionLayout;
