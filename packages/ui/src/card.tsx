import "./index.css"
type Cardtype = {
  image_url?: string;
  name: string;
  msg_type: string;
};

const Card = ({ image_url, name, msg_type }: Cardtype) => {
  return (
    <>
      <div className="card-container">
        <div className="card-image-container">
            <img width={50} height={50} src={image_url || "/person.svg"} alt="avatar" />
        </div>
        <div>
          <p>{name}</p>
          <p>{msg_type}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
