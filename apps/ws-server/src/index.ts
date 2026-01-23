import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";

import { JWT_SECRET } from "@repo/common/config";
import { CustomJwtPayload, CustomWebSocket, User } from "@repo/common/types";
import { WSDataSchema } from "@repo/common/schema";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const users: User[] = [];

wss.on("connection", (ws: CustomWebSocket, req) => {
  if (!req.url) {
    console.warn("WS:url is missing");
    return;
  }
  const token = new URLSearchParams(req.url).get("/?token");
  if (!token) {
    console.warn("WS:token is missing");
    return;
  }
  try {
    const verify = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    if (!verify || !verify.id) {
      console.warn("Token werified without id");
      return;
    }
    ws.user = { id: verify.id };
  } catch (error) {
    console.warn({
      msg: "Verification failed",
      error,
    });
  }

  ws.on("message", (msg) => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch (error) {
      console.error("Icorrct incoming message format");
      ws.close();
      return;
    }

    const parsedData = WSDataSchema.safeParse(data);
    if (!parsedData.success) {
      console.warn({
        msg: "WS: Incoming message format is wrong",
        error: parsedData.error.message,
      });
      ws.close();
      return;
    }
    data = parsedData.data;

    const user: User = {
      id: ws.user.id,
      rooms: [],
      ws: ws,
    };

    users.push(user);

    if (data.type == "join_room") {
      const user = users.find((u) => u.id == ws.user.id);
      if (!user) {
        console.warn("User not found");
        ws.close();
        return;
      }
      user.rooms.push(data.room);
      ws.send(
        JSON.stringify({
          msg: "Joined the room -> " + data.room,
        }),
      );
    }

    if (data.type == "leave_room") {
      const user = users.find((u) => u.id == ws.user.id);
      if (!user) {
        console.warn("User not found");
        ws.close();
        return;
      }
      user.rooms = user.rooms.filter((room) => room != data.room);
    }

    if (data.type == "chat") {
      const user = users.find((u) => u.id == ws.user.id);
      if (!user) return;
      if (!user.rooms.includes(data.room)) {
        ws.send(
          JSON.stringify({
            msg: "Join room first",
          }),
        );
        return;
      }
      users.map((u) => {
        if (u.rooms.includes(data.room) && u.id != ws.user.id) {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              room: data.room,
              msg: data.message,
            }),
          );
        }
      });
    }
  });
});
