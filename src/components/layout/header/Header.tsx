"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import HeaderButton from "@/components/UI/button/headerButton/HeaderButton";
import { Bell, PlusCircle, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
   const { user, isLoggedIn } = useAuth();
   const router = useRouter();
   const logout = async () => {
      const result = await signOut({ redirect: false });
      if (result) return router.push("/");
   };
   return (
      <div className="fixed top-0 left-0 z-50 w-full h-20 bg-white">
         <div className="flex justify-between items-center h-full w-full border-b border-border">
            <Link
               href={"/questions"}
               className="inline-flex items-center pl-[50px]"
            >
               <Image src="/logo.svg" width={30} height={30} alt="Logo" />
               <div className="ml-4 tracking-[0.8px] text-black">
                  alem<span className="font-black">help</span>
               </div>
            </Link>
            <div className="pr-9 flex items-center gap-4">
               {isLoggedIn ? (
                  <div className="flex items-center gap-8">
                     <Link href="/my-questions/ask">
                        <HeaderButton>
                           <div className="flex items-center">
                              <PlusCircle
                                 className="mr-3 text-white"
                                 size={14}
                              />
                              <div>Ask a question</div>
                           </div>
                        </HeaderButton>
                     </Link>
                     <Bell size={24} className="text-gray" />
                     <HeaderButton onClick={logout}>Logout</HeaderButton>
                  </div>
               ) : (
                  <>
                     <Link href="/register">
                        <HeaderButton>
                           <UserPlus className="mr-1" size={16} />
                           Register
                        </HeaderButton>
                     </Link>
                     <Link href="/login">
                        <HeaderButton isGray={true}>Login</HeaderButton>
                     </Link>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
