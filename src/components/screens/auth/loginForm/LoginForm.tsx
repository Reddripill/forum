"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/UI/authInput/AuthInput";
import Button from "@/components/UI/button/headerButton/HeaderButton";
import { useValidate } from "@/hooks/validate/useValidate";
import { CheckKeys } from "@/hooks/validate/validate.enum";
import { signIn } from "next-auth/react";

const LoginForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const username = useValidate("", [
      {
         checkKey: CheckKeys.Empty,
         errorMessage: "Username field is mandatory",
      },
      {
         checkKey: CheckKeys.MinLength,
         errorMessage: "Minimum 3 characters",
         value: 3,
      },
   ]);
   const password = useValidate("", [
      {
         checkKey: CheckKeys.Empty,
         errorMessage: "Password field is mandatory",
      },
   ]);
   const error = username.error || password.error;
   const isDisabled = !username.isValid || !password.isValid || isLoading;
   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const result = await signIn("credentials", {
         redirect: false,
         username: username.value,
         password: password.value,
      });
      if (result) return router.push("/");
      setIsLoading(false);
   };
   return (
      <form
         onSubmit={(e) => submitHandler(e)}
         className="flex flex-col w-[300px]"
      >
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
            validate={username}
            className="mb-4"
            autoFocus={true}
         />
         <AuthInput
            name="Password"
            type="password"
            validate={password}
            className="mb-4"
         />
         {error && (
            <div className="text-error text-xs tracking-[0.2px] font-medium leading-[20px] mb-4">
               {error}
            </div>
         )}
         <Button className="uppercase" disabled={isDisabled} type="submit">
            Login
         </Button>
      </form>
   );
};

export default LoginForm;
