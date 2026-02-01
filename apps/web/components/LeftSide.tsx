"use client";
import React, { useState } from "react";
import "./index.css";
import Image from "next/image";
import Card from "@repo/ui/card";
import { useHome } from "../context/HomeContext";
import Popup from "./Popup";

const LeftSide = ({ width }: { width: number }) => {
  const [toggleCreateWindow, setToggleCreateWindow] = useState(false);
  const [toggleJoinWindow, setToggleJoinWindow] = useState(false);
  const { userInfo, setRoomId } = useHome();
  return (
    <div
      style={{
        height: "100%",
        width: `${width}%`,
        border: "1px solid #090909",
      }}
    >
      <div className="home-left-container-heading">
        <button className="home-left-toggle-chat">&lt;</button>
        <span className="home-left-chat-heading">Chat</span>
      </div>
      <div className="home-left-profile-view">
        <button>
          <Image width={30} height={30} src="/setting-icon.svg" alt="setting" />
        </button>
        <div className="home-left-profile-view-image">
          <Image width={100} height={100} src={"/person.svg"} alt="img" />
        </div>
        <p className="home-left-profile-view-name">Name</p>
        <div className="home-left-profile-view-select">select</div>
      </div>
      <div className="home-left-menu">
        <button
          className="home-left-menu-button"
          onClick={() => setToggleCreateWindow(true)}
        >
          Create
        </button>
        <button
          className="home-left-menu-button"
          onClick={() => setToggleJoinWindow(true)}
        >
          Join
        </button>
      </div>
      <div className="home-left-container-rooms">
        {userInfo?.memberRooms.map((room) => {
          return (
            <Card
              key={room.id}
              type="room"
              name={room.slug}
              msg_type="typing..."
              onClick={() => {
                setRoomId(room.id);
              }}
            ></Card>
          );
        })}
        {userInfo?.adminRooms.map((room) => {
          return (
            <Card
              key={room.id}
              type="room"
              name={room.slug}
              msg_type="typing..."
              onClick={() => {
                setRoomId(room.id);
              }}
            ></Card>
          );
        })}
      </div>
      {toggleCreateWindow && (
        <Popup type="create"
          closeButton={{ onClick: () => setToggleCreateWindow(false) }}
        ></Popup>
      )}
      {toggleJoinWindow && (
        <Popup type="join"
          closeButton={{ onClick: () => setToggleJoinWindow(false) }}
        ></Popup>
      )}
    </div>
  );
};

export default LeftSide;
