"use client";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type RoomType = {
  id: string;
  slug: string;
  adminId: string;
};

type UserInfoType =
  | {
      name: string;
      photo: string | null;
      adminRooms: RoomType[];
      memberRooms: RoomType[];
    }
  | undefined;

type HomeContextType =
  | {
      roomId: string;
      setRoomId: Dispatch<SetStateAction<string>>;
      userInfo: UserInfoType;
      setUserInfo: Dispatch<SetStateAction<UserInfoType>>;
    }
  | undefined;

export const HomeContext = createContext<HomeContextType>(undefined);
export const useHome = () => {
  const ctx = useContext(HomeContext);
  if (!ctx) {
    throw new Error("Home Context is not Ready");
  }
  return ctx;
};
