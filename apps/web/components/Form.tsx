"use client";
import "./index.css";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "@repo/ui/button";
import Label from "@repo/ui/label";
import Input from "@repo/ui/input";
import { signin, signup } from "../script/auth";
import { redirect } from "next/navigation";

type FormType = {
  className?: string;
  toggleForm?:boolean
} & React.FormHTMLAttributes<HTMLFormElement>;

const AuthForm = ({ className,toggleForm = false, ...prop }: FormType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

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
            onSubmit={(e) => handleSubmit(e, toggleForm, data, setLoading)}
            {...prop}
          >
            {toggleForm && (
              <>
                <Label htmlFor="name">Name</Label>
                <Input use="form"
                  type="name"
                  id="name"
                  onChange={(e) => handleChange(e)}
                  value={data.name}
                />
              </>
            )}
            <Label htmlFor="email">Email</Label>
            <Input use="form"
              type="email"
              id="email"
              onChange={(e) => handleChange(e)}
              value={data.email}
            />
            <Label htmlFor="password">Password</Label>
            <Input use="form"
              type="password"
              id="password"
              onChange={(e) => handleChange(e)}
              value={data.password}
            />
            <Button type="submit">
              {!loading ? (toggleForm ? "Sign Up" : "Sign In") : "Submiting..."}
            </Button>
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
) {
  e.preventDefault();
  setLoading(true);
  if (toggleForm) {
    await signup(data);
  } else {
    await signin(data).then(()=>redirect("/home"));
  }
  setLoading(false);
}

export default AuthForm;
