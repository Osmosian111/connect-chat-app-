"use client";
import "./index.css";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "@repo/ui/button";
import Label from "@repo/ui/label";
import Input from "@repo/ui/input";
import { signin, signup } from "../script/auth";
import { redirect } from "next/navigation";
import { FormType } from "@repo/common/types";

const AuthForm = ({ className, toggleForm = false, ...prop }: FormType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [response, setResponse] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="auth-form-container-upper">
        <div className="auth-form-container-lower">
          <form
            className={`form ${className ?? ""}`}
            onSubmit={(e) =>
              handleSubmit(e, toggleForm, data, setLoading, setResponse)
            }
            {...prop}
          >
            {toggleForm && (
              <>
                <Label htmlFor="name">Name</Label>
                <Input
                  use="form"
                  type="name"
                  id="name"
                  onChange={(e) => handleChange(e)}
                  value={data.name}
                />
              </>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              use="form"
              type="email"
              id="email"
              onChange={(e) => handleChange(e)}
              value={data.email}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              use="form"
              type="password"
              id="password"
              onChange={(e) => handleChange(e)}
              value={data.password}
            />
            <Button type="submit">
              {!loading ? (toggleForm ? "Sign Up" : "Sign In") : "Submiting..."}
            </Button>
            {response && <p className="auth-form-error-message">{response}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  toggleForm: boolean,
  data: { name?: string; email: string; password: string },
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResponse: React.Dispatch<React.SetStateAction<string>>,
) {
  e.preventDefault();
  setLoading(true);
  if (toggleForm) {
    const res = await signup(data);
    if (res?.status == 400) {
      setResponse("Input field are not good");
    } else if (res?.status == 201) {
      redirect("/login")
    } else if (res?.status == 409) {
      setResponse("You are already part of our network");
    } else {
      setResponse("Some thing want wrong try again");
    }
  } else {
    const res = await signin(data);
    if (res?.status == 400) {
      setResponse("Input field are not good");
    } else if (res?.status == 404) {
      setResponse("Join our network first")
    } else if (res?.status == 409) {
      setResponse("You are already part of our network");
    }else if(res?.status == 200){
      redirect("/chats")
    } else {
      setResponse("Some thing want wrong try again");
    }
  }
  setLoading(false);
}

export default AuthForm;
