"use client";
import Card from "@repo/ui/card";
import Input from "@repo/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useHome } from "../context/HomeContext";
import { ChatType, DataType } from "@repo/common/types";

const RightSide = () => {
  const { socketLoading, socket } = useSocket();
  const [data, setData] = useState<DataType>({ message: "" });
  const [chats, setChats] = useState<ChatType>({});
  const { roomId, toggleLeft, userInfo, name } = useHome();

  useEffect(() => {
    if (!socket || socketLoading) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.type == "chat") {
          setChats((prev) => {
            if (!prev) return {};
            return {
              ...prev,
              [`${parsed.room}`]: [
                ...(prev[`${parsed.room}`] || []),
                {
                  name: parsed.name,
                  room: parsed.room,
                  message: parsed.msg,
                  time:
                    new Date().toLocaleDateString() +
                    " " +
                    new Date().toLocaleTimeString(),
                },
              ],
            };
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socketLoading, socket]);

  useEffect(() => {
    if (!userInfo) return;

    userInfo.adminRooms.map((room) => {
      room.chat.map((chat) => {
        setChats((prev) => {
          const dateObj = new Date(chat.createdAt);
          const formatted =
            dateObj.getFullYear() +
            "-" +
            String(dateObj.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(dateObj.getDate()).padStart(2, "0") +
            " " +
            String(dateObj.getHours()).padStart(2, "0") +
            ":" +
            String(dateObj.getMinutes()).padStart(2, "0") +
            ":" +
            String(dateObj.getSeconds()).padStart(2, "0");

          return {
            ...prev,
            [room.id]: [
              ...(prev[room.id] || []),
              {
                name: chat.user.name,
                message: chat.message,
                room: chat.roomId,
                time: formatted,
              },
            ],
          };
        });
      });
    });

    userInfo.memberRooms.map((room) => {
      room.chat.map((chat) => {
        setChats((prev) => {
          const dateObj = new Date(chat.createdAt);
          const formatted =
            dateObj.getFullYear() +
            "-" +
            String(dateObj.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(dateObj.getDate()).padStart(2, "0") +
            " " +
            String(dateObj.getHours()).padStart(2, "0") +
            ":" +
            String(dateObj.getMinutes()).padStart(2, "0") +
            ":" +
            String(dateObj.getSeconds()).padStart(2, "0");

          return {
            ...prev,
            [room.id]: [
              ...(prev[room.id] || []),
              {
                name: chat.user.name,
                message: chat.message,
                room: chat.roomId,
                time: formatted,
              },
            ],
          };
        });
      });
    });
  }, [userInfo]);

  if (!userInfo) {
    return <></>;
  }

  const handleClick = () => {
    if (!socket || socketLoading || !data.message.trim() || !roomId) return;

    socket.send(
      JSON.stringify({
        type: "chat",
        room: roomId,
        name: userInfo.name,
        message: data.message,
      }),
    );

    setChats((prev) => {
      if (!prev) return {};
      return {
        ...prev,
        [roomId]: [
          ...(prev[roomId] || []),
          {
            name: userInfo.name,
            room: roomId,
            message: data.message,
            time:
              new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString(),
          },
        ],
      };
    });
    setData({ message: "" });
  };

  return (
    <div
      style={{
        height: "100%",
        width: `${toggleLeft ? 65 : 100}%`,
        border: "1px solid #090909",
      }}
    >
      <div className="home-right-heading">
        <h1>{name ? name.at(0)?.toUpperCase() + name.slice(1) : "Connect"}</h1>
      </div>
      <div className="home-right-chat-and-input-container">
        <div className="home-right-chat-container">
          {chats &&
            (chats[`${roomId}`] || []).map((chat, idx) => (
              <Card
                owner={chat.name == userInfo.name}
                name={chat.name}
                time={chat.time.toString()}
                type="chat"
                msg={chat.message}
                key={idx}
              />
            ))}
        </div>
        <div className="home-right-message-input-container">
          {roomId && (
            <>
              <Input
                use="form"
                id="message"
                type="text"
                onChange={(e) =>
                  setData((d) => ({ ...d, message: e.target.value }))
                }
                value={data.message}
                autoComplete="off"
              />
              <button
                className="home-right-message-send-button"
                onClick={handleClick}
              >
                <Image
                  height={23}
                  width={23}
                  alt="send"
                  src="/send-message.svg"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
