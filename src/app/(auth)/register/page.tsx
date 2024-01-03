import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import RegisterForm from "@/components/screens/auth/registerForm/RegisterForm";

export const metadata: Metadata = {
   title: "Register",
};

const RegisterPage = () => {
   return (
      <>
         <div className="px-[130px] py-[193px]">
            <RegisterForm />
         </div>
         <div className="h-full relative">
            <Image
               src="/registerBg.jpg"
               sizes="50vw"
               fill
               alt="Register Background"
               style={{ objectFit: "cover" }}
            />
         </div>
      </>
   );
};

export default RegisterPage;
