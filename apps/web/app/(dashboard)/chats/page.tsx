import React from "react";
import HomeContextProvider from "../../../context/HomeContextProvider";
import Home from "../../../components/Home";

const HomePage = () => {
  return (
    <>
      <HomeContextProvider>
        <Home />
      </HomeContextProvider>
    </>
  );
};

export default HomePage;
