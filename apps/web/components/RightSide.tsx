import Card from "@repo/ui/card";
import Input from "@repo/ui/input";
import Image from "next/image";
import React from "react";

const RightSide = ({ width }: { width: number }) => {
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
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
          <Card
            name="Neev"
            time="20:00 AM"
            type="chat"
            msg="hello"
            key={Math.random()}
          />
        </div>
        <div className="home-right-message-input-container">
          <Input id="message" type="text" />
          <button className="home-right-message-send-button">
            <Image height={23} width={23} alt="send" src="/send-message.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
