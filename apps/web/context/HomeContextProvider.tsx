"use client";
import { ReactNode, useEffect, useState } from "react";
import { HomeContext } from "./HomeContext";
import axios from "axios";
import { BACKEND_URL } from "../app/config";

type RoomType = {
  id: string;
  slug: string;
  adminId: string;
};

type UserInfoType = {
  name: string;
  photo: string | null;
  adminRooms: RoomType[];
  memberRooms: RoomType[];
} | undefined;

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfoType>(undefined);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const user = await axios.post(
          `${BACKEND_URL}/user`,
          {},
          { withCredentials: true },
        );
        setUserInfo(user.data.user);
        console.log(user.data.user);
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
        value={{ roomId, setRoomId, userInfo, setUserInfo }}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};

export default HomeContextProvider;
