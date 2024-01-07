import React from "react";
import { IPost } from "./post.types";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IAttribute<T> {
   attributes: T;
   id: number;
}

export interface IResponseWithAttributes<T> {
   data: IAttribute<T>[];
}

export interface IResponseWithAttribute<T> {
   data: IAttribute<T>;
}

export interface IContent {
   children: {
      text: string;
      type: string;
   }[];
   type: string;
}

export interface ITag {
   name: string;
   description: string;
   posts: IResponseWithAttributes<IPost>;
}
