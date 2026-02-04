import { type Request } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { type WebSocket } from "ws";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface CustomRequest extends Request {
  user?: { id: string; name: string };
}

export interface CustomJwtPayload extends JwtPayload {
  id?: string;
  name?: string;
}

export interface CustomWebSocket extends WebSocket {
  user: { id: string; name: string };
}

export interface User {
  id: string;
  ws: WebSocket;
  adminRooms: String[];
  memberRooms: String[];
}

export type FormType = {
  className?: string;
  toggleForm?: boolean;
} & React.FormHTMLAttributes<HTMLFormElement>;

export type PopupProps = {
  type: "create" | "join";
  input?: HTMLAttributes<HTMLInputElement> & { className?: string };
  createButton?: HTMLAttributes<HTMLButtonElement> & { className?: string };
  closeButton?: HTMLAttributes<HTMLButtonElement> & { className?: string };
};

export type DataType = {
  message: string;
};

export type ChatType = {
  [key:string]: {
    name: string;
    room: string;
    message: string;
    time: Date;
  }[];
};

type RoomType = {
  id: string;
  slug: string;
  adminId: string;
};

export type UserInfoType =
  | {
      id: string;
      name: string;
      photo: string | null;
      adminRooms: RoomType[];
      memberRooms: RoomType[];
    }
  | undefined;

export type HomeContextType =
  | {
      roomId: string;
      setRoomId: Dispatch<SetStateAction<string>>;
      userInfo: UserInfoType;
      setUserInfo: Dispatch<SetStateAction<UserInfoType>>;
      toggleLeft: boolean;
      setToggleLeft: Dispatch<SetStateAction<boolean>>;
      name: string;
      setName: Dispatch<SetStateAction<string>>;
    }
  | undefined;
