"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
   const [client] = useState(
      new QueryClient({
         defaultOptions: {
            queries: {
               refetchOnWindowFocus: false,
               staleTime: 60 * 1000,
            },
         },
      })
   );
   return (
      <>
         <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </>
   );
};

export default QueryProvider;
