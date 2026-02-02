"use client";
import { HomeContextType } from "@repo/common/types";
import { createContext, useContext } from "react";

export const HomeContext = createContext<HomeContextType>(undefined);
export const useHome = () => {
  const ctx = useContext(HomeContext);
  if (!ctx) {
    throw new Error("Home Context is not Ready");
  }
  return ctx;
};
