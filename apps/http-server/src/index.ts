import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";

import { prisma } from "@repo/db";
import { JWT_SECRET, SALT_ROUND } from "@repo/common/config";
import { middleware } from "./middleware";
import { CustomRequest } from "@repo/common/types";
import { RoomSchema, SignInSchema, SignUpSchema } from "@repo/common/schema";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.post("/health", async (req, res) => {
  let dbStatus = false;
  let jwtStatus = false;
  let SaltStatus = false;
  let state = 200;

  try {
    const user = await prisma.$queryRaw`SELECT 1`;
    dbStatus = true;
  } catch (error) {
    state = 422;
    console.error("DB Failed");
  }

  try {
    jwt.sign({ id: "fjsljf" }, JWT_SECRET);
    jwtStatus = true;
  } catch (error) {
    state = 422;
    console.error("Jwt failed");
  }

  try {
    if (typeof SALT_ROUND == "number") {
      const salt = await bcrypt.genSalt(SALT_ROUND);
    }
    SaltStatus = true;
  } catch (error) {
    state = 422;
    console.error("Salt failed");
  }

  res.status(state).json({
    dbStatus: dbStatus ? "Online" : "offline",
    jwtStatus: jwtStatus ? "OK" : "ERROR",
    SaltStatus: SaltStatus ? "OK" : "ERROR",
  });
});

app.post("/signup", async (req, res) => {
  const parsedData = SignUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      msg: parsedData.error,
    });
  }
  const data = parsedData.data;

  try {
    const saltRounds = Number(SALT_ROUND) || 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({
      msg: "Signed Up",
    });
  } catch (error) {
    console.warn({
      msg: "Failed to Signup",
      error,
    });
    return res.status(409).json({
      msg: "Signup failed",
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ msg: parsedData.error.message });
    }

    const data = parsedData.data;
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(404).json({ msg: "Signup first" });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Password or Email is wrong." });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
    res.cookie("chat-app-token", token, {
      httpOnly: true,
      secure: false, // TODO: true in production
      sameSite: "lax", // TODO: none in production
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({ msg: "Signed in", token });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

app.use(middleware);

app.post("/user", async (req: CustomRequest, res) => {
  if (!req.user) return;
  const id = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        adminRooms: true,
        memberRooms: true,
      },
      omit: {
        password: true,
        id: true,
        email: true,
      },
    });
    console.log(user);
    res.json({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      msg: "Failed to get user's info",
    });
  }
});

app.post("/room", async (req: CustomRequest, res) => {
  if (!req.user?.id) {
    return;
  }
  const parsedData = RoomSchema.safeParse(req.body);
  const userId = req.user.id;
  if (!parsedData.success) {
    return res.status(400).json({
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

    return res.status(200).json({
      success: true,
      room: { id: room.id, slug: room.slug, adminId: room.adminId },
    });
  } catch (error) {
    console.warn({
      error,
      msg: "Failed to create room",
    });
    return res.status(500).json({
      msg: "Failed to create room",
      userId,
    });
  }
});

app.get("/rooms/:slug", async (req, res) => {
  const slug = req.params.slug;
  console.log(slug);
  if (!slug) {
    return res.status(400).json({ msg: "Slug is required" });
  }

  try {
    const room = await prisma.room.findFirst({
      where: { slug: slug.toLowerCase() },
    });

    if (!room) {
      return res.status(400).json({ msg: "Room not found" });
    }
    console.log(room);

    res.status(200).json({ roomId: room.id });
    return;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Failed to get chat. Try again later" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at port : ${PORT}`);
});
