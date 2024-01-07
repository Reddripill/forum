/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   env: {
      API_URL: process.env.API_URL,
   },
   async redirects() {
      return [
         {
            source: "/",
            destination: "/questions", // Matched parameters can be used in the destination
            permanent: true,
         },
      ];
   },
};

module.exports = nextConfig;
