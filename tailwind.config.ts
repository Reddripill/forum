import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         borderColor: {
            border: "#EAEAEA",
            blue: "#1682FD",
         },
         colors: {
            orange: "#F48023",
            blue: "#1682FD",
            gray: "#808080",
            error: "#F00",
            light: "#FAFAFA",
            label: "#EAEAEA",
            line: "#857857",
         },
         borderRadius: {
            main: "5px",
         },
         boxShadow: {
            focused: "rgba(22, 130, 253, 0.15) 0px 7px 29px 0px",
            card: "0px 0px 5px 0px rgba(0, 0, 0, 0.05)",
            post: "2px 1px 5px 0px rgba(0, 0, 0, 0.15)",
            select:
               "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
         },
         padding: {
            sidebar: "50px",
         },
      },
   },
   plugins: [],
};

export default config;
