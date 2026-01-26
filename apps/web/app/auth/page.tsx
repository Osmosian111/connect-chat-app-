"use client"

import React, { useState } from "react";
import Form from "../../components/Form";

const Auth = () => {
  const [isSignup, setIsSignup] = useState<boolean>(true);
  return (
    <>
      <div>
        <button onClick={() => setIsSignup(true)}>Sign up</button>
        <button onClick={() => setIsSignup(false)}>Sign in</button>
      </div>
      <Form state={isSignup} />
    </>
  );
};

export default Auth;
