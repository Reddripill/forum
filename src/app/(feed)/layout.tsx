import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function FeedLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div
         style={{
            display: "grid",
            gridTemplateColumns: "310px 4fr",
            height: "100%",
         }}
      >
         <Sidebar />
         <div className="w-full h-full bg-light">
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,2.5fr) 340px",
                  height: "100%",
               }}
            >
               {children}
            </div>
         </div>
      </div>
   );
}
