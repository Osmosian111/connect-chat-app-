import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { SignUpSchema, SignInSchema } from "@repo/common/schema";
import z from "zod"
type Data = {
  name?: string;
  email: string;
  password: string;
};

async function postWithValidation(
  schema: typeof SignUpSchema | typeof SignInSchema,
  url: string,
  data: Data,
) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { status: 400, errors: z.treeifyError(parsed.error) };
  }
  try {
    const response = await axios.post(`${BACKEND_URL}/${url}`, parsed.data, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { status: err.response?.status ?? 500, message: err.message };
    }
    return { status: 500, message: "Unexpected error" };
  }
}

export async function signin(data: Data) {
  return postWithValidation(SignInSchema, "signin", data);
}

export async function signup(data: Data) {
  return postWithValidation(SignUpSchema, "signup", data);
}
