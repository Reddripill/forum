import React from "react";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IResponse<T> {
   data: T;
}
