export interface IContent {
   children: {
      text: string;
      type: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      code?: boolean;
   }[];
   type: string;
}

export type EditorMarksType =
   | "bold"
   | "italic"
   | "strike"
   | "underline"
   | "code";

export type JSONContentItem = {
   type?: string;
   attrs?: Record<string, any>;
   content?: JSONContentItem[];
   marks?: {
      type: EditorMarksType;
      attrs?: Record<string, any>;
      [key: string]: any;
   }[];
   text?: string;
   [key: string]: any;
};
