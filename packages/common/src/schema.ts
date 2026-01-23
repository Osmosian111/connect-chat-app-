import { z } from "zod";

const EmailSchema = z.email().transform((val) => val.toLowerCase().trim());
const PasswordSchema = z.string().min(8).max(50);

export const SignUpSchema = z.object({
  name: z.string().min(3).max(20),
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const RoomSchema = z.object({
  name: z.string().min(3).max(20).trim(),
});

export const WSDataSchema = z.object({
  type: z.enum(["leave_room", "chat", "join_room"]),
  room: z.string().min(3).max(50).trim(),
  message: z.string().min(1).max(1000).trim().optional(),
});