import { ILoginedUser } from "./auth-user.types";
import { IContent } from "./editor.types";
import {
   IResponseWithAttribute,
   IResponseWithAttributes,
   ITag,
   IResponseWithoutData,
} from "./main.types";
import { IAuthor } from "./user.types";

export interface IAnswer {
   author: IResponseWithAttribute<IAuthor>;
   post: IPostResponse;
   replies: IResponseWithAttributes<IAnswer>;
   parent: IResponseWithAttribute<IAnswer> | IResponseWithoutData;
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
export interface ICreationPostParams {
   title: string;
   content: IContent[];
   tags?: string[];
   author: ILoginedUser;
}

export interface IPostResponse extends IResponseWithAttribute<IPost> {}

export interface IPostsResponse extends IResponseWithAttributes<IPost> {}
