import React from "react";
import AuthForm from "../../../components/Form";

const Auth = () => {
  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Connect to our platform
      </h3>
      <AuthForm toggleForm={true} />
    </>
  );
};

export default Auth;
