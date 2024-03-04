import { IAnswer, ICreationPostParams, IPost } from "@/types/post.types";
import { axiosInstance } from "../../axios.config";
import { IResponse } from "@/types/main.types";

class Posts {
   async getPosts() {
      const res = await axiosInstance.get<IResponse<IPost[]>>(
         `/posts?populate=*`
      );
      const posts = await res.data;
      console.log("service post: ", posts);
      return posts.data;
   }
   async createPost({ author, content, title, tags }: ICreationPostParams) {
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
   async getPostById(id: string) {
      const res = await axiosInstance.get<IPost>(`/posts/${id}?populate=*`);
      const post = await res.data;
      return post;
   }
   async getAnswersByPostId(id: number | string) {
      const res = await axiosInstance.get<IPost>(`/posts/${id}`);
      const post = await res.data;
      return post.answers;
   }
   async getRepliesByAnswerId(id: number | string) {
      const res = await axiosInstance.get<IAnswer>(`/answers/${id}`);
      const post = await res.data;
      return post.replies;
   }
}

const PostsService = new Posts();

export default PostsService;
