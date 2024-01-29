"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   const { status } = useSession();
   const authorized = status === "authenticated";
   const unAuthorized = status === "unauthenticated";
   useEffect(() => {
      if (unAuthorized) {
         router.push("/login");
      }
   }, [unAuthorized, status, router]);
   return authorized && <>{children}</>;
};

export default ProtectedLayout;
