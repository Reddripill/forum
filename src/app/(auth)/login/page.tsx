import React from "react";
import { Metadata } from "next";
import LoginForm from "@/components/screens/auth/loginForm/LoginForm";
import Image from "next/image";
import styles from "@/styles/authLayout.module.scss";
import DesktopComponent from "@/components/UI/DesktopComponent";

export const metadata: Metadata = {
   title: "Login",
};

const LoginPage = () => {
   return (
      <>
         <div className={styles["form-block"]}>
            <LoginForm />
         </div>
         <DesktopComponent>
            <div className="h-full relative">
               <Image
                  src="/loginBg.jpg"
                  sizes="50vw"
                  fill
                  alt="Login Background"
                  style={{ objectFit: "cover" }}
               />
            </div>
         </DesktopComponent>
      </>
   );
};

export default LoginPage;
