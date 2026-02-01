"use client";
import Card from "@repo/ui/card";
import Input from "@repo/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useHome } from "../context/HomeContext";

type DataType = {
  message: string;
};

type ChatType = {
  room: string;
  message: string;
  time: Date;
};

const RightSide = ({ width }: { width: number }) => {
  const { socketLoading, socket } = useSocket();
  const [data, setData] = useState<DataType>({ message: "" });
  const [chats, setChats] = useState<ChatType[]>([]);
  const { roomId } = useHome();

  useEffect(() => {
    if (!socket || socketLoading) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        setChats((prev) => [
          ...prev,
          {
            message: parsed.msg,
            room: parsed.room,
            time: new Date(),
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socketLoading, socket]);

  const handleClick = () => {
    if (!socket || socketLoading || !data.message.trim() || !roomId) return;

    socket.send(
      JSON.stringify({
        type: "chat",
        room: roomId,
        message: data.message,
      }),
    );

    setChats((prev) => [
      ...prev,
      {
        message: data.message,
        room: roomId,
        time: new Date(),
      },
    ]);
    setData({ message: "" });
  };

  return (
    <div
      style={{
        height: "100%",
        width: `${width}%`,
        border: "1px solid #090909",
      }}
    >
      <div className="home-right-heading">
        <h1>Name</h1>
      </div>
      <div className="home-right-chat-and-input-container">
        <div className="home-right-chat-container">
          {chats.map((chat, idx) => (
            <Card
              name="Neev"
              time={chat.time.toLocaleString()}
              type="chat"
              msg={chat.message}
              key={idx}
            />
          ))}
        </div>
        <div className="home-right-message-input-container">
          <Input use="form"
            id="message"
            type="text"
            onChange={(e) =>
              setData((d) => ({ ...d, message: e.target.value }))
            }
            value={data.message}
          />
          <button
            className="home-right-message-send-button"
            onClick={handleClick}
          >
            <Image height={23} width={23} alt="send" src="/send-message.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
