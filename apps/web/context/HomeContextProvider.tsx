"use client";
import { ReactNode, useEffect, useState } from "react";
import { HomeContext } from "./HomeContext";
import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { UserInfoType } from "@repo/common/types";

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfoType>(undefined);
  const [toggleLeft,setToggleLeft] = useState<boolean>(true);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const user = await axios.get(
          `${BACKEND_URL}/user`,
          { withCredentials: true },
        );
        console.log(user.data.user)
        setUserInfo(user.data.user);
      } catch (error) {
        console.error(error);
        return;
      }
    }
    getUserInfo();
  }, []);

  return (
    <>
      <HomeContext.Provider
        value={{ roomId, setRoomId, userInfo, setUserInfo, toggleLeft,setToggleLeft,name,setName }}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};

export default HomeContextProvider;
