"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthInput from "@/components/UI/authInput/AuthInput";
import Button from "@/components/UI/button/headerButton/HeaderButton";
import { useValidate } from "@/hooks/validate/useValidate";
import { CheckKeys } from "@/hooks/validate/validate.enum";

const RegisterForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const username = useValidate("", [
      { checkKey: CheckKeys.Empty, errorMessage: "This field is mandatory" },
   ]);
   const email = useValidate("", [
      { checkKey: CheckKeys.Empty, errorMessage: "This field is mandatory" },
   ]);
   const password = useValidate("", [
      { checkKey: CheckKeys.Empty, errorMessage: "This field is mandatory" },
   ]);
   const submittedPassword = useValidate(
      "",
      [{ checkKey: CheckKeys.Empty, errorMessage: "This field is mandatory" }],
      password.value
   );
   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const result = await signIn("credentials", {
         redirect: false,
         username: username.value,
         email: email.value,
         password: password.value,
      });
      if (result) return router.push("/");
      setIsLoading(false);
   };
   const error =
      username.error ||
      email.error ||
      password.error ||
      submittedPassword.error;
   return (
      <form onSubmit={(e) => submitHandler(e)} className="flex flex-col w-full">
         <div className="tex-2xl text-black font-black tracking-[1.2px] mb-5">
            Join Alem community
         </div>
         <div className="text-black text-lg tracking-[0.9px] leading-[30px] font-light mb-5">
            Get more features and priviliges by joining to the most helpful
            community
         </div>
         <AuthInput
            name="Username"
            type="text"
            className="mb-4"
            validate={username}
         />
         <AuthInput
            name="Email"
            type="email"
            validate={email}
            className="mb-4"
         />
         <AuthInput
            name="Password"
            type="password"
            validate={password}
            className="mb-4"
         />
         <AuthInput
            name="Repeat Password"
            type="password"
            validate={submittedPassword}
            className="mb-4"
         />
         {error && (
            <div className="text-error text-xs tracking-[0.2px] font-medium leading-[20px] mb-4">
               {error}
            </div>
         )}
         <Button
            className="uppercase"
            type="submit"
            disabled={
               !username.isValid ||
               !email.isValid ||
               !password.isValid ||
               !submittedPassword.isValid ||
               isLoading
            }
         >
            Register
         </Button>
      </form>
   );
};

export default RegisterForm;
