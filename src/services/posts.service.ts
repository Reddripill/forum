import { IAnswer, ICreationPostParams, IPost } from "@/types/post.types";
import { axiosInstance } from "../../axios.config";
import { IResponse } from "@/types/main.types";
import { SortingTabNameType } from "@/components/screens/postsFeed/sortingTabs/sortingTabs.data";

class Posts {
   async getPosts(sortingType?: SortingTabNameType) {
      const sortValue: keyof IPost =
         sortingType === "Top" ? "votes" : "createdAt";
      const res = await axiosInstance.get<IResponse<IPost[]>>(
         `/posts?sort=${sortValue}&populate=*`
      );
      const posts = await res.data;
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
   async changeVote(post: IPost, userId?: string) {
      if (userId) {
         const foundVote = post.votes.find((vote) => vote.id === userId);
         const votesRelationObj = foundVote
            ? { disconnect: [userId] }
            : { connect: [userId] };
         await axiosInstance.put(`/posts/${post.id}`, {
            data: { votes: votesRelationObj },
         });
      }
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
   async countViews(post: IPost, userId?: string) {
      if (userId) {
         const oldViewsValue = !post.views ? [] : post.views;
         const newViewsValue = oldViewsValue.concat(userId);
         await axiosInstance.put(`/posts/${post.id}`, {
            ...post,
            views: newViewsValue,
         });
      }
   }
}

const PostsService = new Posts();

export default PostsService;
