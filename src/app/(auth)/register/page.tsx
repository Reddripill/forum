import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import RegisterForm from "@/components/screens/auth/registerForm/RegisterForm";
import styles from "@/styles/authLayout.module.scss";
import DesktopComponent from "@/components/UI/DesktopComponent";

export const metadata: Metadata = {
   title: "Register",
};

const RegisterPage = () => {
   return (
      <>
         <div className={styles["form-block"]}>
            <RegisterForm />
         </div>
         <DesktopComponent>
            <div className="h-full relative">
               <Image
                  src="/registerBg.jpg"
                  sizes="50vw"
                  fill
                  alt="Register Background"
                  style={{ objectFit: "cover" }}
               />
            </div>
         </DesktopComponent>
      </>
   );
};

export default RegisterPage;
