import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { ILoginedUser, IUser } from "./user.types";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
   interface User extends ILoginedUser {}
   interface Session {
      user: ILoginedUser;
   }
}

declare module "next-auth/jwt" {
   interface JWT extends ILoginedUser {}
}
