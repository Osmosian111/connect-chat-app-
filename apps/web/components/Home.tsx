"use client";
import { useHome } from "../context/HomeContext";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Home = () => {
  const { toggleLeft ,setToggleLeft} = useHome();
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex",position:"relative" }}>
      <button
        className="home-left-toggle-chat"
        onClick={() => setToggleLeft(!toggleLeft)}
      >
        {toggleLeft ? <>&lt;</> : <>&gt;</>}
      </button>
      {toggleLeft && <LeftSide />}
      <RightSide />
    </div>
  );
};

export default Home;
