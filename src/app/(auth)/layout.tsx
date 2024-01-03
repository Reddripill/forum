export default function AuthLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <>
         <div className="w-full h-full grid grid-cols-[1fr_1.35fr]">
            {children}
         </div>
      </>
   );
}
