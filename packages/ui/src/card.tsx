import { HTMLAttributes } from "react";
import "./index.css";

type CardRoom = {
  type: "room";
  name: string;
  image_url?: string;
  msg_type: string;
  onClick: () => void;
} & HTMLAttributes<HTMLButtonElement>;

type CardChat = {
  type: "chat";
  name: string;
  image_url?: string;
  msg: string;
  time: string;
  owner: boolean;
};

type CardType = CardRoom | CardChat;

const Card = (data: CardType) => {
  if (data.type === "room") {
    const { type, name, image_url, msg_type, onClick, ...buttonProps } = data;
    return (
      <button
        {...buttonProps}
        onClick={onClick}
        className="card-room-container"
      >
        <div className="card-image-container">
          <img
            width={50}
            height={50}
            src={image_url || "/person.svg"}
            alt="avatar"
          />
        </div>
        <div>
          <p>{name.at(0)?.toUpperCase() + name.slice(1).toLowerCase()}</p>
          <p>{msg_type}</p>
        </div>
      </button>
    );
  }

  if (data.type === "chat") {
    return (
      <div
        className={
          data.owner ? "card-message-container-owner" : "card-message-container"
        }
      >
        <p className="card-message-name-time">
          {data.owner
            ? "You"
            : data.name.at(0)?.toUpperCase() + data.name.slice(1).toLowerCase()}
          ,{data.time}
        </p>
        <div>
          <div
            className={
              data.owner ? "card-message-box-owner" : "card-message-box"
            }
          >
            {data.msg}
          </div>
          <div className="card-message-image-container">
            <img
              width={30}
              height={30}
              src={data.image_url || "/person.svg"}
              alt="person"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;
