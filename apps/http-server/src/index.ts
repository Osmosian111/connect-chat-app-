import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "@repo/db";
import { JWT_SECRET, SALT_ROUND } from "@repo/common/config";
import { middleware } from "./middleware";
import { CustomRequest } from "@repo/common/types";
import { RoomSchema, SignInSchema, SignUpSchema } from "@repo/common/schema";

const PORT = 3000;
const app = express();
app.use(express.json());

app.post("/health", async (req, res) => {
  let dbStatus = false;
  let jwtStatus = false;
  let SaltStatus = false;

  try {
    const user = await prisma.$queryRaw`SELECT 1`;
    dbStatus = true;
  } catch (error) {
    console.error("DB Failed");
  }

  try {
    jwt.sign({ id: "fjsljf" }, JWT_SECRET);
    jwtStatus = true;
  } catch (error) {
    console.error("Jwt failed");
  }

  try {
    if (typeof SALT_ROUND == "number") {
      const salt = await bcrypt.genSalt(SALT_ROUND);
    }
    SaltStatus = true;
  } catch (error) {
    console.error("Salt failed");
  }

  res.json({
    dbStatus: dbStatus ? "Online" : "offline",
    jwtStatus: jwtStatus ? "OK" : "ERROR",
    SaltStatus: SaltStatus ? "OK" : "ERROR",
  });
});

app.post("/signup", async (req, res) => {
  const parsedData = SignUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      msg: parsedData.error,
    });
  }
  const data = parsedData.data;

  try {
    const saltRounds = Number(SALT_ROUND) || 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return res.json({
      msg: "Signed Up",
    });
  } catch (error) {
    console.warn({
      msg: "Failed to Signup",
      error,
    });
    return res.json({
      msg: "Signup failed",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
      msg: parsedData.error.message,
    });
  }
  const data = parsedData.data;

  const user = await prisma.user.findUnique({
    where: {
      email: data.email.toLowerCase().trim(),
    },
  });
  if (!user) {
    return res.json({
      msg: "Signup first",
    });
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    return res.json({
      msg: "Password or Email is wrong.",
    });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({
    msg: "signin",
    token,
  });
});
app.use(middleware);

app.post("/room", async (req: CustomRequest, res) => {
  if (!req.user?.id) {
    return;
  }
  const parsedData = RoomSchema.safeParse(req.body);
  const userId = req.user.id;
  if (!parsedData.success) {
    return res.json({
      msg: parsedData.error.message,
    });
  }
  const data = parsedData.data;

  try {
    const room = await prisma.room.create({
      data: {
        slug: data.name.trim().toLowerCase(),
        adminId: userId,
      },
    });

    return res.json({
      success: true,
      room: { id: room.id, slug: room.slug, adminId: room.adminId },
    });
  } catch (error) {
    console.warn({
      error,
      msg: "Failed to create room",
    });
    return res.json({
      msg: "Failed to create room",
      userId,
    });
  }
});

app.post("/chats/:room", async (req: CustomRequest, res) => {
  const roomId = req.params.room;
  if (!roomId) return;
  if (typeof roomId != "string") return;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        roomId: roomId,
      },
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({
      chats
    })
  } catch (error) {
    console.error(error);
    return res.json({
      msg: "Failed to get chat.Try again later",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at port : ${PORT}`);
});
