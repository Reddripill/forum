"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import HeaderButton from "@/components/UI/button/headerButton/HeaderButton";
import { Bell, MoveLeft, PlusCircle, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import Menu from "./Menu";
import styles from "./Header.module.scss";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Header = () => {
   const isMobile = useMediaQuery();
   const pathname = usePathname();
   const authPathsArr = ["login", "register"];
   const { user, isLoggedIn } = useAuth();
   const router = useRouter();
   const pathnameArr = pathname.split("/").filter((path) => Boolean(path));
   const rootPath = pathnameArr[0];
   return (
      <div className="fixed top-0 left-0 z-50 w-full h-20 bg-white">
         <div className={styles.wrapper}>
            <div className="xl:pl-sidebar pl-7">
               <Link href={"/questions"} className="inline-flex items-center">
                  <Image src="/logo.svg" width={30} height={30} alt="Logo" />
                  <div className="ml-4 tracking-[0.8px] text-black">
                     alem<span className="font-black">help</span>
                  </div>
               </Link>
            </div>
            <div className="flex items-center justify-between lg:ml-[50px] ml-[30px]">
               {!isMobile && (
                  <div className="font-black text-gray tracking-[1.2px]">
                     {pathnameArr.length > 1 ? (
                        <div className="flex items-center gap-x-1">
                           <MoveLeft size={18} />
                           <button
                              onClick={() => router.push(`/${rootPath}`)}
                           >{`Go to ${capitalizeFirstLetter(
                              rootPath
                           )}`}</button>
                        </div>
                     ) : authPathsArr.every((val) => pathnameArr[0] !== val) ? (
                        <div>{capitalizeFirstLetter(rootPath)}</div>
                     ) : null}
                  </div>
               )}
               <div className="pr-9 flex items-center gap-4">
                  {isLoggedIn && user ? (
                     <div className="flex items-center gap-8">
                        {!isMobile && (
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
                        )}
                        <Bell size={24} className="text-gray" />
                        <Menu user={user} />
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
      </div>
   );
};

export default Header;
