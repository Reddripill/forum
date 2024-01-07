"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchFIeld from "@/components/UI/search/SearchFIeld";
import { searchFields } from "./search-fields.data";
import useAuth from "@/hooks/useAuth";
import styles from "./Sidebar.module.scss";
import cn from "classnames";
import { Facebook, Github, Instagram } from "lucide-react";

const Sidebar = () => {
   const { isLoggedIn } = useAuth();
   const pathname = usePathname();
   const isActiveField = (link: string) => {
      if (pathname === "/" && link === "/questions") return true;
      return pathname.includes(link);
   };
   return (
      <div className="h-full">
         <div className="flex flex-col h-full py-10 fixed top-20 left-0 w-[20%]">
            <div className="grow">
               <SearchFIeld />
               {searchFields.general.data.length !== 0 && (
                  <div className={styles.category}>
                     <div className={styles.title}>
                        {searchFields.general.title}
                     </div>
                     {searchFields.general.data.map((gen) => (
                        <Link
                           className={cn(styles.link, {
                              [styles._active]: isActiveField(gen.link),
                           })}
                           href={gen.link}
                           key={gen.name}
                        >
                           <div className={styles["link-wrapper"]}>
                              <gen.icon size={18} className={styles.icon} />
                              <div className={styles.name}>{gen.name}</div>
                           </div>
                           <div className={styles.select}></div>
                        </Link>
                     ))}
                  </div>
               )}
               {isLoggedIn && searchFields.personal.data.length !== 0 && (
                  <div className={styles.category}>
                     <div className={styles.title}>
                        {searchFields.personal.title}
                     </div>
                     {searchFields.personal.data.map((personal) => (
                        <Link
                           className={cn(styles.link, {
                              [styles._active]: isActiveField(personal.link),
                           })}
                           href={personal.link}
                           key={personal.name}
                        >
                           <div className={styles["link-wrapper"]}>
                              <personal.icon
                                 size={18}
                                 className={styles.icon}
                              />
                              <div className={styles.name}>{personal.name}</div>
                           </div>
                           <div className={styles.select}></div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
            {!isLoggedIn && (
               <div className="flex justify-center">
                  <Link href="https://github.com/" className={styles.society}>
                     <Github size={24} />
                  </Link>
                  <Link
                     href="https://www.instagram.com/"
                     className={styles.society}
                  >
                     <Instagram size={24} />
                  </Link>
                  <Link
                     href="https://www.facebook.com/"
                     className={styles.society}
                  >
                     <Facebook size={24} />
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};

export default Sidebar;
