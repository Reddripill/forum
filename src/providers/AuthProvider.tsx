"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const { user, isLoggedIn } = useAuth();
   const pathname = usePathname();
   const router = useRouter();
   useEffect(() => {
      if (isLoggedIn) {
         Cookies.set("token", user?.jwt || "");
      } else {
         Cookies.remove("token");
      }
   }, [isLoggedIn, user]);
   /* useEffect(() => {
      if (
         pathname === "/login" ||
         pathname === "/register" ||
         pathname === "/"
      ) {
         if (isLoggedIn) {
            router.push("/questions");
         }
      } else {
         if (!isLoggedIn) {
            router.push("/");
         }
      }
   }, [pathname, isLoggedIn, router]); */
   return <>{children}</>;
};

export default AuthProvider;
