import {
   IResponseWithAttribute,
   IResponseWithAttributes,
   IContent,
   ITag,
} from "./main.types";
import { IAuthor } from "./user.types";

export interface IAnswer {
   author: IResponseWithAttribute<IAuthor>;
   post: IPost;
   replies?: IResponseWithAttributes<IAnswer>;
   parent?: IResponseWithAttribute<IAnswer>;
   content: IContent[];
}

export interface IPost {
   title: string;
   content: IContent[];
   tags: IResponseWithAttributes<ITag>;
   views: number;
   author: IResponseWithAttribute<IAuthor>;
   answers?: IResponseWithAttributes<IAnswer>;
}

export interface IPostResponse extends IResponseWithAttribute<IPost> {}

export interface IPostsResponse extends IResponseWithAttributes<IPost> {}
