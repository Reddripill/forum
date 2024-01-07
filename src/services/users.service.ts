import { ILogin, IRegister } from "@/components/screens/auth/auth.types";
import { IUserWithJWT } from "@/types/auth-user.types";
import axios from "axios";

class Users {
   async loginUser(credentials: ILogin) {
      const res = await axios.post<IUserWithJWT | null>(
         `http://localhost:1337/api/auth/local`,
         {
            identifier: credentials.username,
            password: credentials.password,
         }
      );
      const user = await res.data;
      return user;
   }
   async registerUser(credentials: IRegister) {
      const res = await axios.post<IUserWithJWT>(
         `http://localhost:1337/api/auth/local/register`,
         {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
         }
      );
      const user = await res.data;
      return user;
      console.log(`User ${credentials.username} registered!`);
   }
}

const UsersService = new Users();

export default UsersService;
