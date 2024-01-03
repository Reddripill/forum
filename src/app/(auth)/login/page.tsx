import React from "react";
import { Metadata } from "next";
import LoginForm from "@/components/screens/auth/loginForm/LoginForm";
import Image from "next/image";

export const metadata: Metadata = {
   title: "Login",
};

const LoginPage = () => {
   return (
      <>
         <div className="px-[130px] py-[193px]">
            <LoginForm />
         </div>
         <div className="h-full relative">
            <Image
               src="/loginBg.jpg"
               sizes="50vw"
               fill
               alt="Login Background"
               style={{ objectFit: "cover" }}
            />
         </div>
      </>
   );
};

export default LoginPage;
