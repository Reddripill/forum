import { ILogin, IRegister } from "@/components/screens/auth/auth.types";
import { IUserWithJWT } from "@/types/auth-user.types";
import { axiosInstance } from "../../axios.config";

class Users {
   async loginUser(credentials: ILogin) {
      const res = await axiosInstance.post<IUserWithJWT | null>(`auth/local`, {
         identifier: credentials.username,
         password: credentials.password,
      });
      const user = await res.data;
      return user;
   }
   async registerUser(credentials: IRegister) {
      const res = await axiosInstance.post<IUserWithJWT>(
         `auth/local/register`,
         {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
         }
      );
      const user = await res.data;
      return user;
   }
}

const UsersService = new Users();

export default UsersService;
