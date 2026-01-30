import React from "react";
import HomeContextProvider from "../../../context/HomeContextProvider";
import LeftSide from "../../../components/LeftSide";
import RightSide from "../../../components/RightSide";

const Home = () => {
  const widthLeft = 35;
  return (
    <>
      <HomeContextProvider>
        <div style={{ width: "100vw", height: "100vh", display:"flex"}}>
          <LeftSide width={widthLeft}></LeftSide>
          <RightSide width={100 - widthLeft - 0.01}></RightSide>
        </div>
      </HomeContextProvider>
    </>
  );
};

export default Home;
