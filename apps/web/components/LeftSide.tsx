"use client";
import React, { useState } from "react";
import "./index.css";
import Image from "next/image";
import Card from "@repo/ui/card";
import { useHome } from "../context/HomeContext";
import Popup from "./Popup";

const LeftSide = () => {
  const [toggleCreateWindow, setToggleCreateWindow] = useState(false);
  const [toggleJoinWindow, setToggleJoinWindow] = useState(false);
  const { userInfo, setRoomId, setName, roomId } = useHome();

  if (!userInfo) return <></>;

  return (
    <div
      style={{
        height: "100%",
        width: `${35}%`,
        border: "1px solid #090909",
      }}
    >
      <div className="home-left-container-heading">
        <span className="home-left-chat-heading">Chat</span>
      </div>
      <div className="home-left-profile-view">
        <button>
          <Image width={30} height={30} src="/setting-icon.svg" alt="setting" />
        </button>
        <div className="home-left-profile-view-image">
          <Image width={100} height={100} src={"/person.svg"} alt="img" />
        </div>
        <p className="home-left-profile-view-name">{userInfo.name}</p>
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
                setName(room.slug);
              }}
              style={{ backgroundColor: room.id == roomId ? "#d3d3d3" : "white" }}
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
                setName(userInfo.name);
              }}
              style={{ backgroundColor: room.id == roomId ? "#d3d3d3" : "white" }}
            ></Card>
          );
        })}
      </div>
      {toggleCreateWindow && (
        <Popup
          type="create"
          closeButton={{ onClick: () => setToggleCreateWindow(false) }}
        ></Popup>
      )}
      {toggleJoinWindow && (
        <Popup
          type="join"
          closeButton={{ onClick: () => setToggleJoinWindow(false) }}
        ></Popup>
      )}
    </div>
  );
};

export default LeftSide;
