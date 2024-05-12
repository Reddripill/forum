import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/globals.scss";
import Header from "@/components/layout/header/Header";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import QueryProvider from "@/providers/QueryProvider";

const roboto = Roboto({
   weight: ["300", "400", "500", "700", "900"],
   display: "swap",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Forum App",
   description: "Best Forum App",
   icons: {
      icon: "/logo.svg",
   },
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={roboto.className}>
            <QueryProvider>
               <NextAuthProvider>
                  <Header />
                  <div className="pt-20 w-full h-full">{children}</div>
               </NextAuthProvider>
            </QueryProvider>
         </body>
      </html>
   );
}
