"use client";
import { TokenContext } from "./TokenContext";

export default function TokenContextProvider({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) {
  return <TokenContext.Provider value={token}>{children}</TokenContext.Provider>;
}