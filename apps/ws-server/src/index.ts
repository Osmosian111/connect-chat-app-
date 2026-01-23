import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";

import { JWT_SECRET } from "@repo/common/config";
import { CustomJwtPayload, CustomWebSocket } from "@repo/common/types";
import { WSDataSchema } from "@repo/common/schema";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws:CustomWebSocket, req) => {
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
    ws.user = {id:verify.id};
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
      console.log("Icorrct incoming message format");
      ws.close();
      return;
    }

    const parsedData = WSDataSchema.safeParse(data);
    if(!parsedData.success){
      console.warn("WS: Incoming message format is wrong");
      ws.close()
    }

    ws.send(JSON.stringify({
      id:ws.user.id
    }));
  });
});
