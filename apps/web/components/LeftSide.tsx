import React from "react";
import "./index.css";
import Image from "next/image";
import Card from "@repo/ui/card"

const LeftSide = ({ width }: { width: number }) => {
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
      <div className="home-left-horizontal-bar"></div>
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
        <button className="home-left-menu-add-button">+</button>
      </div>
      <div className="home-left-container-rooms">
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
        <Card name="Name" msg_type="typing..."></Card>
      </div>
    </div>
  );
};

export default LeftSide;
