import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h1 style={{ textAlign: "center",marginTop:"10px",marginBottom:"20px" }}>Connect</h1>
      <div>
        {children}
        </div>
    </>
  );
};

export default AuthLayout;
