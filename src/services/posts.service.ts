import { ILogin, IRegister } from "@/components/screens/auth/auth.types";
import { IPostResponse, IPostsResponse } from "@/types/post.types";
import { IUserWithJWT } from "@/types/user.types";
import axios from "axios";

class Posts {
   async getPosts() {
      const res = await axios.get<IPostsResponse>(
         `http://localhost:1337/api/posts?populate=*`
      );
      const posts = await res.data;
      return posts;
   }
   async getPostById(id: number | string) {
      const res = await axios.get<IPostResponse>(
         `http://localhost:1337/api/posts/${id}?populate=*`
      );
      const post = await res.data;
      return post;
   }
}

const PostsService = new Posts();

export default PostsService;
