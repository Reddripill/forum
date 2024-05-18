import { ILoginedUser } from "./auth-user.types";
import { IContent } from "./editor.types";
import { IAuthor } from "./user.types";

export interface IAnswer {
   id: string;
   author: IAuthor;
   post: IPost;
   replies: IAnswer[];
   parent: IAnswer | null;
   content: IContent[];
}

export interface IPost {
   id: string;
   title: string;
   content: IContent[];
   tags: ITag[];
   views: string[];
   author: IAuthor;
   answers?: IAnswer[];
   createdAt: string;
   votes: IAuthor[];
   isClosed: boolean;
}

export interface ITag {
   id: string;
   name: string;
   description: string;
   posts: IPost[];
}
