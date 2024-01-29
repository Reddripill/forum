import References from "@/components/screens/postsFeed/references/References";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <div className="pt-12 ml-[50px]">{children}</div>
         <References />
      </>
   );
};

export default layout;
