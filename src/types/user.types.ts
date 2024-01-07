export interface ILink {
   social: string;
   link: string;
}

export interface IAuthor {
   username: string;
   reputation: number;
   links: ILink[];
}
