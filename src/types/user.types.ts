export interface IUser {
   username: string;
   email: string;
   password: string;
   id: string;
}
export interface IUserWithJWT {
   user: IUser;
   jwt: string;
}

export interface ILoginedUser extends IUser {
   jwt: string;
}
