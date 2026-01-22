import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import jwt from "jsonwebtoken"

import { prisma } from "@repo/db";
import { JWT_SECRET } from "@repo/common/config"
import { middleware } from "./middleware";
import { CustomRequest } from "@repo/common/types";

const PORT = 3000;
const app = express();
app.post("/signup", (req, res) => {
  res.json({
    msg: "signup",
  });
});
app.post("/signin", (req, res) => {
  const user = 12345;
  const token = jwt.sign({id:user},JWT_SECRET);
  res.json({
    msg: "signin",
    token
  });
});
app.post("/room", middleware ,(req:CustomRequest, res) => {
  if(!req.user?.id){
    return
  }
  res.json({
    msg: "room",
    id:req.user.id
  });
});

app.post("/db", async (req, res) => {
  const user = await prisma.user.findMany();
  res.json({
    user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening at port : ${PORT}`);
});
