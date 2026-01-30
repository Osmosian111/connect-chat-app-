import "./index.css";

type CardRoom = {
  type: "room";
  name: string;
  image_url?: string;
  msg_type: string;
};

type CardChat = {
  type: "chat";
  name: string;
  image_url?: string;
  msg: string;
  time: string;
};

type CardType = CardRoom | CardChat;

const Card = (data: CardType) => {
  return (
    <>
      {data.type == "room" && (
        <div className="card-room-container">
          <div className="card-image-container">
            <img
              width={50}
              height={50}
              src={data.image_url || "/person.svg"}
              alt="avatar"
            />
          </div>
          <div>
            <p>{data.name}</p>
            <p>{data.msg_type}</p>
          </div>
        </div>
      )}
      {data.type == "chat" && (
        <div className="card-message-container">
            <p className="card-message-name-time">{data.name},23:11</p>
            <div>
              <div className="card-message-box">
                {data.msg}
              </div>
              <div className="card-message-image-container">
                <img width={30} height={30} src={data.image_url || "/person.svg"} alt="" />
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
