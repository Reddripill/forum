import { ILogin, IRegister } from "@/components/screens/auth/auth.types";
import UsersService from "@/services/users.service";
import { ILoginedUser } from "@/types/user.types";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
            email: { label: "Password", type: "email" },
         },
         async authorize(credentials, req) {
            if (!credentials?.username || !credentials?.password) {
               return null;
            }
            if (credentials?.email) {
               const registeredUser = await UsersService.registerUser(
                  credentials as IRegister
               );
               return {
                  ...registeredUser.user,
                  jwt: registeredUser.jwt,
               };
            } else {
               const loginedUser = await UsersService.loginUser(
                  credentials as ILogin
               );
               // console.log("USER: ", loginedUser);
               if (loginedUser) {
                  return {
                     ...loginedUser.user,
                     jwt: loginedUser.jwt,
                  };
               }
            }
            return null;
         },
      }),
   ],
   callbacks: {
      async session({ session, token }) {
         session.user = token as ILoginedUser;
         return session;
      },
      async jwt({ token, user }) {
         return { ...user, ...token };
      },
   },
};
