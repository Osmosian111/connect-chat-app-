"use client";
import React, { HTMLAttributes, useEffect, useState } from "react";
import "./index.css";
import Image from "next/image";
import Button from "@repo/ui/button";
import { useSocket } from "../hooks/useSocket";
import axios from "axios";
import { BACKEND_URL } from "../app/config";

type PopupProps = {
  type: "create" | "join";
  input?: HTMLAttributes<HTMLInputElement> & { className?: string };
  createButton?: HTMLAttributes<HTMLButtonElement> & { className?: string };
  closeButton?: HTMLAttributes<HTMLButtonElement> & { className?: string };
};

const Popup = ({ type, input, createButton, closeButton }: PopupProps) => {
  const { socket, socketLoading } = useSocket();
  const [roomName, setRoomName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!socket || socketLoading) return;
    const handleMessage = (data: MessageEvent) => {
      console.log(data);
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, socketLoading]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const data = await axios.post(
        `${BACKEND_URL}/room`,
        { name: roomName },
        { withCredentials: true },
      );
      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!socket || !roomName) return;
    setLoading(true);
    try {
      const room = await axios.get(`${BACKEND_URL}/rooms/${roomName}`, {
        withCredentials: true,
      });
      socket.send(
        JSON.stringify({
          type: "join_room",
          room: room.data.roomId,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const heading = type === "create" ? "Create Room" : "Join Room";
  const buttonLabel = loading
    ? type === "create"
      ? "Creating..."
      : "Joining..."
    : type === "create"
      ? "Create"
      : "Join";

  const handleAction = type === "create" ? handleCreate : handleJoin;

  return (
    <div className="popup-create-upper-container">
      <div className="popup-create-lower-container">
        <Button className="popup-create-close-button" {...closeButton}>
          <Image alt="close" src="/close.svg" width={20} height={20} />
        </Button>

        <h2 className="popup-create-heading">{heading}</h2>

        <input
          onChange={(e) => setRoomName(e.target.value.trim())}
          className={`popup-create-input ${input?.className || ""}`}
          placeholder="Enter Room Name"
          type="text"
          value={roomName}
          {...input}
        />

        <div className="popup-create-create-button-container">
          <Button
            className="popup-create-create-button"
            {...createButton}
            onClick={handleAction}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
