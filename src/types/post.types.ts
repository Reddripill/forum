import {
   IResponseWithAttribute,
   IResponseWithAttributes,
   IContent,
} from "./main.types";

export interface ILink {
   social: string;
   link: string;
}

export interface IAuthor {
   username: string;
   reputation: number;
   links: ILink[];
}

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
   tags: string[];
   views: number;
   author: IResponseWithAttribute<IAuthor>;
   answers?: IResponseWithAttributes<IAnswer>;
}

export interface IPostResponse extends IResponseWithAttribute<IPost> {}

export interface IPostsResponse extends IResponseWithAttributes<IPost> {}
