import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { SignUpSchema, SignInSchema } from "@repo/common/schema";

export async function signin(data: {
  name?: string;
  email: string;
  password: string;
}) {
  const parsedData = SignInSchema.safeParse(data);
  if (parsedData.success) {
    const response = await axios.post(`${BACKEND_URL}/signin`, data, {
      withCredentials: true,
    });
    console.log(response);
  }
}

export async function signup(data: { email: string; password: string }) {
  const parsedData = SignUpSchema.safeParse(data);
  if (parsedData.success) {
    const response = await axios.post(`${BACKEND_URL}/signup`, data, {
      withCredentials: true,
    });
    console.log(response.data);
  }
}