import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../app/config";

async function handleSubmit(
  obj: { state: boolean; name: string; email: string; password: string },
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    setLoading(true);
    if (obj.state) {
      await axios.post(`${BACKEND_URL}/signup`, {
        name: obj.name,
        email: obj.email,
        password: obj.password,
      }).then((d)=>console.log(d));
    } else {
      await axios
        .post(
          `${BACKEND_URL}/signin`,
          { email: obj.email, password: obj.password },
          { withCredentials: true },
        )
        .then((d) => console.log(d));
    }
    alert("Success!");
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
}

const Form = ({ state }: { state: boolean }) => {
  const value = state ? "Signup" : "Signin";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({ state, ...formData }, setLoading);
  };

  return (
    <form onSubmit={onSubmit}>
      {state && (
        <>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            onChange={handleChange}
            value={formData.name}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            disabled={loading}
          />
          <br />
        </>
      )}
      <label htmlFor="email">Email:</label>
      <br />
      <input
        onChange={handleChange}
        value={formData.email}
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        disabled={loading}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <br />
      <input
        onChange={handleChange}
        value={formData.password}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        disabled={loading}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : value}
      </button>
    </form>
  );
};

export default Form;
