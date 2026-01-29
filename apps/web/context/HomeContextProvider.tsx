"use client"
import { ReactNode, useState } from "react";
import HomeContext from "./HomeContext";

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomId, setRoomId] = useState<string>("");
  return (
    <>
      <HomeContext.Provider value={{ roomId, setRoomId }}>
        {children}
      </HomeContext.Provider>
    </>
  );
};

export default HomeContextProvider;
