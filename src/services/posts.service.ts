import {
   ICreationPostParams,
   IPostResponse,
   IPostsResponse,
} from "@/types/post.types";
import { axiosInstance } from "../../axios.config";

class Posts {
   async getPosts() {
      const res = await axiosInstance.get<IPostsResponse>(`/posts?populate=*`);
      const posts = await res.data;
      return posts;
   }
   async createPost({ author, content, title, tags }: ICreationPostParams) {
      console.log("author: ", author);
      const body = {
         data: {
            title,
            content,
            views: 0,
            author: {
               connect: [author.id],
            },
            tags: {
               connect: tags,
            },
         },
      };
      const res = await axiosInstance.post(`/posts`, body);
   }
   async getPostById(id: number | string) {
      const res = await axiosInstance.get<IPostResponse>(
         `/posts/${id}?populate=*`
      );
      const post = await res.data;
      return post;
   }
   async getAnswersByPostId(id: number | string) {
      const res = await axiosInstance.get<IPostResponse>(
         `/posts/${id}?populate[0]=answers.author&populate[1]=answers.parent&populate[2]=answers.replies&populate[3]=answers.post&populate[4]=answers.post.author&populate[5]=answers.parent.author`
      );
      const answers = await res.data;
      return answers;
   }
}

const PostsService = new Posts();

export default PostsService;
