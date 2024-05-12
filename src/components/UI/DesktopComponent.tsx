"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";

const DesktopComponent = ({ children }: { children: React.ReactNode }) => {
   const isMobile = useMediaQuery();
   return <>{!isMobile && children}</>;
};

export default DesktopComponent;
