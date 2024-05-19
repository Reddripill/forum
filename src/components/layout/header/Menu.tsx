"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import Jdenticon from "../../UI/Jdenticon";
import { ILoginedUser } from "@/types/auth-user.types";
import { useOutside } from "@/hooks/useOutside";

const Menu = ({ user }: { user: ILoginedUser }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const ref = useOutside<HTMLDivElement>(() => setIsMenuOpen(false));
   const isMobile = useMediaQuery();
   const router = useRouter();
   const logout = async () => {
      const result = await signOut({ redirect: false });
      if (result) return router.push("/");
   };
   return (
      <div className="relative">
         <div
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={ref}
         >
            <Jdenticon value={user.username} size={40} />
         </div>
         {isMenuOpen && (
            <div className="absolute w-auto top-full right-0 bg-label px-7 py-2 rounded-md">
               <div className="flex flex-col items-start gap-y-1">
                  <button className="text-gray hover:text-black font-bold transition-colors cursor-pointer">
                     Profile
                  </button>
                  {isMobile && (
                     <button className="text-gray hover:text-black font-bold transition-colors cursor-pointer">
                        <Link
                           className="block whitespace-nowrap"
                           href="/my-questions/ask"
                        >
                           New Answer
                        </Link>
                     </button>
                  )}
                  <button
                     className="text-gray hover:text-black font-bold transition-colors cursor-pointer"
                     onClick={logout}
                  >
                     Logout
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Menu;
