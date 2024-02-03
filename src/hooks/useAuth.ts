"use client";
import { useSession } from "next-auth/react";

const useAuth = () => {
   const { data, status } = useSession();
   return {
      user: data?.user,
      isLoggedIn: status === "authenticated",
      status,
   };
};

export default useAuth;
