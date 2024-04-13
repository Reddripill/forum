import { IPost } from "./post.types";

export interface ILink {
   social: string;
   link: string;
}

export interface IAuthor {
   id: string;
   username: string;
   reputation: number;
   links: ILink[];
   createdAt: string;
   posts: IPost[];
}
